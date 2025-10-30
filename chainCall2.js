// Optional chaining polyfill and enhancement
var chainCall2 = (function () {
  "use strict";
  var fieldsCache = {};
  function popBuffer(buffer, fields, allowEmpty, getters) {
    if (buffer.length || allowEmpty) {
      var field = buffer.join("");
      if (getters) {
        field = getters[field] || field;
      }
      fields.push(field);
      buffer.length = 0;
    }
  }
  function parsePath(path, getters) {
    var state = 0, stateArgs = [];
    var fields = [], buffer = [];
    for (var i = 0; i < path.length; ++i) {
      var c = path.charAt(i);
      if (state === 0) {
        if (c == "\\") {
          state = 1;
          stateArgs.push(0);
        } else if (c === ".") {
          popBuffer(buffer, fields, false);
        } else if (c === "[") {
          state = 2;
          stateArgs.push("]");
          popBuffer(buffer, fields, false);
        } else if (c === "(") {
          state = 2;
          stateArgs.push(")");
          popBuffer(buffer, fields, false);
        } else {
          buffer.push(c);
        }
      } else if (state === 1) {
        state = stateArgs.pop();
        buffer.push(c);
      } else if (state === 2) {
        if (c === "\\") {
          state = 1;
          stateArgs.push(2);
        } else if (c === stateArgs[stateArgs.length - 1]) {
          state = 0;
          stateArgs.pop();
          if (c === ")") {
            popBuffer(buffer, fields, true, getters);
          } else {
            popBuffer(buffer, fields, true);
          }
        } else {
          buffer.push(c);
        }
      }
    }
    if (buffer.length) {
      if (stateArgs[stateArgs.length - 1] === ")") {
        popBuffer(buffer, fields, false, getters);
      } else {
        popBuffer(buffer, fields, false);
      }
    }
    return fields;
  }
  function getDefaultValue(defaultValue) {
    if (typeof defaultValue === "function") {
      return defaultValue();
    }
    return defaultValue;
  }
  return function (obj, path, defaultValue, getters) {
    if (obj == null) {
      return getDefaultValue(defaultValue);
    }
    if (path == null) {
      return obj;
    }
    var fields = path;
    if (typeof path === "string") {
      fields = fieldsCache[path];
      if (!fields) {
        fieldsCache[path] = fields = parsePath(path, getters);
      }
    }
    if (!Array.isArray(fields)) {
      return obj;
    }
    var v1, v2, v3 = obj;
    for (var i = 0; i < fields.length; ++i) {
      v1 = v2, v2 = v3, v3 = fields[i];
      if (typeof v3 === "function") {
        v3 = v3(v1, v2, i);
      } else {
        v3 = v2[v3];
      }
      if (v3 == null) {
        return getDefaultValue(defaultValue);
      }
    }
    return v3;
  };
})()
