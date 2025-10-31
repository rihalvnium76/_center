// Optional chaining polyfill and enhancement
var chainCall2 = (function () {
  "use strict";
  const fieldsCache = {};
  const TEXT_TYPE = 0, GETTER_TYPE = 1;
  function popBuffer(context, type, allowEmpty) {
    if (!(context.buffer.length || allowEmpty)) {
      return;
    }
    context.tokens.push(context.buffer.join(""));
    context.types.push(type);
    context.buffer.length = 0;
    if (type !== TEXT_TYPE) {
      context.computed = false;
    }
  }
  function parseIntermediatePath(path) {
    var state = 0;
    const stack = [];
    const context = {
      tokens: [],
      types: [],
      buffer: [],
      computed: true,
    };
    for (var i = 0; i < path.length; ++i) {
      const c = path.charAt(i);
      if (state === 0) {
        if (c == "\\") {
          state = 1;
          stack.push(0);
        } else if (c === ".") {
          popBuffer(context, TEXT_TYPE, false);
        } else if (c === "[") {
          state = 2;
          stack.push("]");
          popBuffer(context, TEXT_TYPE, false);
        } else if (c === "(") {
          state = 2;
          stack.push(")");
          popBuffer(context, TEXT_TYPE, false);
        } else {
          context.buffer.push(c);
        }
      } else if (state === 1) {
        state = stack.pop();
        context.buffer.push(c);
      } else if (state === 2) {
        if (c === "\\") {
          state = 1;
          stack.push(2);
        } else if (c === stack[stack.length - 1]) {
          state = 0;
          stack.pop();
          popBuffer(context, (c === ")" ? GETTER_TYPE : TEXT_TYPE), true);
        } else {
          context.buffer.push(c);
        }
      }
    }
    popBuffer(context, (stack[stack.length - 1] === ")" ? GETTER_TYPE : TEXT_TYPE), false);
    // exporting buffer can cause a memory leak
    if (context.computed) {
      return {tokens: context.tokens};
    }
    return {tokens: context.tokens, types: context.types};
  }
  function parsePath(intermediate, getters) {
    if (!intermediate.types) {
      return intermediate.tokens;
    }
    return intermediate.types.map(function (type, i) {
      const token = intermediate.tokens[i];
      if (type === GETTER_TYPE && getters[token] != null) {
        return getters[token];
      }
      return token;
    });
  }
  return function (obj, path, defaultValue, getters) {
    if (obj == null) {
      return typeof defaultValue === "function" ? defaultValue() : defaultValue;
    }
    var fields = path;
    if (typeof path === "string") {
      fields = fieldsCache[path];
      if (!fields) {
        fieldsCache[path] = fields = parseIntermediatePath(path);
      }
      // non-cachable
      fields = parsePath(fields, getters);
    }
    if (!Array.isArray(fields)) {
      return obj;
    }
    var v1, v2, v3 = obj;
    for (var i = 0; i < fields.length; ++i) {
      v1 = v2, v2 = v3, v3 = fields[i];
      if (typeof v3 === "function") {
        v3 = v3(v1, v2, i, v3);
      } else {
        v3 = v2[v3];
      }
      if (v3 == null) {
        return typeof defaultValue === "function" ? defaultValue() : defaultValue;
      }
    }
    return v3;
  };
})()
