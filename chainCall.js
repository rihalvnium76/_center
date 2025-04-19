// Optional chaining polyfill
var chainCall = (function (fieldCache) {
  return function (obj, path, nullValue, computed, separator, bound) {
    if (obj == null) {
      if (typeof nullValue === "function" && computed) {
        return nullValue();
      }
      return nullValue;
    }
    var fields = path;
    if (!Array.isArray(path)) {
      if (path == null) {
        return obj;
      }
      path = String(path);
      separator = separator || ".";
      var key = String(separator.length) + separator + path;
      fields = fieldCache[key];
      if (!fields) {
        fields = fieldCache[key] = path.split(separator);
      }
    }
    var v1, v2, v3 = obj;
    for (var i = 0; i < fields.length; ++i) {
      v1 = v2;
      v2 = v3;
      v3 = fields[i];
      if (Array.isArray(v3)) {
        if (typeof v2 === "function") {
          v3 = v2.apply(v1, v3);
        } else {
          v3 = null;
        }
      } else {
        v3 = v2[v3];
      }
      if (v3 == null) {
        if (typeof nullValue === "function" && computed) {
          return nullValue();
        }
        return nullValue;
      }
    }
    if (typeof v3 === "function" && bound) {
      return v3.bind(v2);
    }
    return v3;
  };
})({});
