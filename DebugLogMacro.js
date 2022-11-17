// https://www.toptal.com/developers/javascript-minifier

function LiteLogFactoryV3(tag, parent = {}, id = String(Math.random()).slice(2)) {
  function Log(...v) {
    console.log(tag, id, ...v);
  }
  Log.tag = tag;
  Log.id = id;
  Log.t = (...v) => Log('<-', parent.tag, parent.id, ...v);
  return Log;
}

function LiteLogFactoryV3(b,d={},c=String(Math.random()).slice(2)){function a(...a){console.log(b,c,...a)}return a.tag=b,a.id=c,a.t=(...b)=>a("<-",d.tag,d.id,...b),a}

function LogFactoryV4(tag, parent, id = String(Math.random()).slice(2), head = n => `[${tag} ${id}]${n && parent ? parent.h(--n) : ""}`, generator = n => (...v) => console.log(head(n), ...v)) {
  /** Log */
  const Log = generator(0)
  Log.h = head
  /** Log with parent*/
  Log.t = generator(1)
  /** Log with stack */
  Log.s = generator(-1)
  return Log
}

function LogFactoryV4(o,t,n=String(Math.random()).slice(2),r=r=>`[${o} ${n}]${r&&t?t.h(--r):""}`,c=o=>(...t)=>console.log(r(o),...t)){let e=c(0);return e.h=r,e.t=c(1),e.s=c(-1),e}

/// function LogFactoryV4(o:string,t:any,n=String(Math.random()).slice(2),r=(r:any)=>`[${o} ${n}]${r&&t?t.h(--r):""}`,c=(o:any)=>(...t:any)=>console.log(r(o),...t)){let e:any=c(0);return e.h=r,e.t=c(1),e.s=c(-1),e}
/// interface Log{(...v:any):void;h(n:number):string;t(...v:any):void;s(...v:any):void};function LogFactoryV4(o:string,t?:Log):Log;function LogFactoryV4(o:string,t?:Log,n=String(Math.random()).slice(2),r=(r:number)=>`[${o} ${n}]${r&&t?t.h(--r):""}`,c=(o:number)=>(...t:any)=>console.log(r(o),...t)):Log{let e:any=c(0);return e.h=r,e.t=c(1),e.s=c(-1),e}

let a=LogFactoryV4('A'),b=LogFactoryV4('B',a),c=LogFactoryV4('C',b)
c(1)
c.t(2)
c.s(4)
