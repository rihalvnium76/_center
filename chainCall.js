// Optional chaining polyfill
var chainCall = (function (fieldCache) {
  return function (obj, path, nullValue, separator) {
    if (obj == null) {
      return nullValue;
    }
    var fields = path;
    if (!Array.isArray(path)) {
      path = String(path || "");
      if (!path) {
        return obj;
      }
      separator = separator || ".";
      var key = String(separator.length) + separator + path;
      fields = fieldCache[key];
      if (!fields) {
        fields = fieldCache[key] = path.split(separator);
      }
    }
    for (var i = 0; i < fields.length; ++i) {
      var last = obj;
      var field = fields[i];
      if (Array.isArray(field)) {
        obj = null;
        if (typeof last === "function") {
          // actually this is the last of `last`
          obj = last.apply(null, field);
        }
      } else {
        obj = obj[field];
      }
      if (obj == null) {
        return nullValue;
      }
      if (typeof obj === "function") {
        obj = obj.bind(last);
      }
    }
    return obj;
  };
})({});
