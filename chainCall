// Optional chaining polyfill
var chainCall = (function (fieldCache) {
  return function (obj, path, nullValue, separator) {
    if (obj == null) {
      return nullValue;
    }
    var fields;
    if (Array.isArray(path)) {
      fields = path;
    } else {
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
      obj = obj[fields[i]];
      if (obj == null) {
        return nullValue;
      }
    }
    return obj;
  };
})({});
