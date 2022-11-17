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

// V4.2
function LogFactoryV4(tag, parent, head = n => `[${tag} ${String(Math.random()).slice(2)}]${n && parent ? parent.h(--n) : ""}`, generator = n => (...v) => console.log(head(n), ...v)) {
  /** Log */
  const Log = generator(0)
  Log.h = head
  /** Log with parent*/
  Log.t = generator(1)
  /** Log with stack */
  Log.s = generator(-1)
  return Log
}

function LogFactoryV4(o,t,n=n=>`[${o} ${String(Math.random()).slice(2)}]${n&&t?t.h(--n):""}`,r=o=>(...t)=>console.log(n(o),...t)){let c=r(0);return c.h=n,c.t=r(1),c.s=r(-1),c}

/// with comments
function LogFactoryV4(/** string tag */ o, /** parent Log */ t, /** @private log head (tag + id) */ n=n=>`[${o} ${String(Math.random()).slice(2)}]${n&&t?t.h(--n):""}`, /** @private log function generator */ r=o=>(...t)=>console.log(n(o),...t)){let c=r(0);return c.h=n, /** log with parent head (usage: log.t(...)) */ c.t=r(1), /** log with stack (usage: log.s(...)) */ c.s=r(-1), /** log (usage: log(...)) */ c}

/// v4.2 TS
// interface Log {(...v: any): void; h(n: number): string; t(...v: any): void; s(...v: any): void}
// function LogFactoryV4T(tag: string, parentLog?: Log): Log;
// function LogFactoryV4T(o:string,t?:Log,n=(n:number)=>`[${o} ${String(Math.random()).slice(2)}]${n&&t?t.h(--n):""}`,r=(o:number)=>(...t:any)=>console.log(n(o),...t)){let c:any=r(0);return c.h=n,c.t=r(1),c.s=r(-1),c}

let a=LogFactoryV4('A'),b=LogFactoryV4('B',a),c=LogFactoryV4('C',b)
c(1)
c.t(2)
c.s(4)
