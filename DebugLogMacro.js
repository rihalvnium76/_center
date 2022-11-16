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

function LogFactoryV4(tag, parent, id = String(Math.random()).slice(2), output = console.log, head = n => `[${tag} ${id}]${n && parent ? parent.h(--n) : ""}`, generator = n => (...v) => output(head(n), ...v)) {
  /** Log */
  const Log = generator(0)
  Log.h = head
  /** Log with parent*/
  Log.t = generator(1)
  /** Log with stack */
  Log.s = generator(-1)
  return Log
}

function LogFactoryV4(o,t,n=String(Math.random()).slice(2),r=console.log,c=r=>`[${o} ${n}]${r&&t?t.h(--r):""}`,e=o=>(...t)=>r(c(o),...t)){let l=e(0);return l.h=c,l.t=e(1),l.s=e(-1),l}

let a=LogFactoryV4('A'),b=LogFactoryV4('B',a),c=LogFactoryV4('C',b)
c(1)
c.t(1)
c.s(1)
