// https://www.toptal.com/developers/javascript-minifier

// function LogFactory(tag) {
//   const id = String(Math.random()).slice(2);
//   const _c = console;
//   return {
//     tag,
//     id,
//     n(...v) {
//       _c.log(tag, id, ...v);
//     },
//     g(...subtag) {
//       return (...v) => {
//         _c.group(tag, id, ...subtag);
//         _c.log(...v);
//         _c.groupEnd();
//       };
//     }
//   };
// }

// function LiteLogFactory(tag) {
//   const id = String(Math.random()).slice(2);
//   function Log(...v) {
//     console.log(tag, id, ...v);
//   }
//   Log.id = id;
//   Log.tag = tag;
//   return Log;
// }

// function LiteLogFactoryV2(tag, parent) {
//   function Log(...v) {
//     console.log(Log.tag, Log.id, ...v);
//   }
//   Log.id = String(Math.random()).slice(2);
//   Log.tag = tag;
//   Log.plog = parent ? parent : {};
//   Log.t = (...v) => Log('<-', Log.plog.tag, Log.plog.id, ...v);
//   return Log;
// }

function LiteLogFactoryV3(tag, parent = {}, id = String(Math.random()).slice(2)) {
  function Log(...v) {
    console.log(tag, id, ...v);
  }
  Log.tag = tag;
  Log.id = id;
  Log.t = (...v) => Log('<-', parent.tag, parent.id, ...v);
  return Log;
}

// function LogFactory(a){let b=String(Math.random()).slice(2);return{tag:a,id:b,n(...c){console.log(a,b,...c)},g:(...c)=>(...d)=>{console.group(a,b,...c),console.log(...d),console.groupEnd()}}}
// function LogFactory(a){let b=String(Math.random()).slice(2),c=console.log;return{tag:a,id:b,n(...d){c(a,b,...d)},g:(...d)=>(...e)=>{console.group(a,b,...d),c(...e),console.groupEnd()}}}
// function LogFactory(a){let b=String(Math.random()).slice(2),c=console;return{tag:a,id:b,n(...d){c.log(a,b,...d)},g:(...d)=>(...e)=>{c.group(a,b,...d),c.log(...e),c.groupEnd()}}}

// function LiteLogFactory(b){let c=String(Math.random()).slice(2);function a(...a){console.log(b,c,...a)}return a.id=c,a.tag=b,a}

// function LiteLogFactoryV2(b,d){let c=String(Math.random()).slice(2);function a(...a){console.log(b,c,...a)}return a.id=c,a.tag=b,a.p=(...b)=>{d&&a("<-",d.tag,d.id,...b)},a}
function LiteLogFactoryV3(b,d={},c=String(Math.random()).slice(2)){function a(...a){console.log(b,c,...a)}return a.tag=b,a.id=c,a.t=(...b)=>a("<-",d.tag,d.id,...b),a}

// const log = LogFactory("");
// log.n();debugger;

// const log2 = (a=>{let b=String(Math.random()).slice(2);return{tag:a,id:b,n(...c){console.log(a,b,...c)},g:(...c)=>(...d)=>{console.group(a,b,...c),console.log(...d),console.groupEnd()}}})("");
// log.n();debugger;
