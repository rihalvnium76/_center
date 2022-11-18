// https://www.toptal.com/developers/javascript-minifier

/** @deprecated */
function LiteLogFactoryV3(tag, parent = {}, id = String(Math.random()).slice(2)) {
  function Log(...v) {
    console.log(tag, id, ...v);
  }
  Log.tag = tag;
  Log.id = id;
  Log.t = (...v) => Log('<-', parent.tag, parent.id, ...v);
  return Log;
}
/** @deprecated */
function LiteLogFactoryV3(b,d={},c=String(Math.random()).slice(2)){function a(...a){console.log(b,c,...a)}return a.tag=b,a.id=c,a.t=(...b)=>a("<-",d.tag,d.id,...b),a}

// V4.3
function LogFactoryV4(tag, parent, head = n => `[${tag} ${String(Math.random()).slice(2)}]${n && parent ? parent.h(--n) : ""}`, generator = n => (...v) => console.log(head(n), ...v), Log = generator(0)) {
  Log.h = head
  /** Log with parent*/
  Log.t = generator(1)
  /** Log with stack */
  Log.s = generator(-1)
  return Log
}

function LogFactoryV4(o,n,r=r=>`[${o} ${String(Math.random()).slice(2)}]${r&&n?n.h(--r):""}`,t=o=>(...n)=>console.log(r(o),...n),c=t(0)){return c.h=r,c.t=t(1),c.s=t(-1),c}

/// with comments
function LogFactoryV4(/** string tag */ o, /** parent Log */ n, /** @immutable log head (tag + id) */ r=r=>`[${o} ${String(Math.random()).slice(2)}]${r&&n?n.h(--r):""}`, /** @immutable log function generator */ t=o=>(...n)=>console.log(r(o),...n), /** @immutable Logger (usage: log(...)) */ c=t(0)){return c.h=r, /** log with parent head (usage: log.t(...)) */ c.t=t(1), /** log with stack (usage: log.s(...)) */ c.s=t(-1), c}

/// v4.2 TS
// interface Log {(...v: any): void; h(n: number): string; t(...v: any): void; s(...v: any): void}
// function LogFactoryV4T(tag: string, parentLog?: Log): Log;
// function LogFactoryV4T(o:string,n:any,r=(r:any)=>`[${o} ${String(Math.random()).slice(2)}]${r&&n?n.h(--r):""}`,t=(o:any)=>(...n:any)=>console.log(r(o),...n),c:any=t(0)){return c.h=r,c.t=t(1),c.s=t(-1),c}

let a=LogFactoryV4('A'),b=LogFactoryV4('B',a),c=LogFactoryV4('C',b)
c(1)
c.t(2)
c.s(4)
