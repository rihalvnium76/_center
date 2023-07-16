// for two-way binding
var ElemRef = (function () {
  function ElemRef() {
    this._value = void 0;
    this._handlers = {};
    this._enabled = true;
    this._writable = true;
  }

  ElemRef.GET_EVENT = 0;
  ElemRef.SET_EVENT = 1;

  ElemRef.prototype = {
    constructor: ElemRef,
    getValue: function () {
      return this._pipe(ElemRef.GET_EVENT, this._value, this._value);
    },
    setValue: function (value) {
      if (this._writable) {
        return this._value = this._pipe(ElemRef.SET_EVENT, {prev: this._value, value: value}, {prev: this._value, value: value}).value;
      }
    },
    addHandler: function (event, handler) {
      typeof handler === "function" && this._getHandlers(event).push(handler);
    },
    removeHandler: function (event, handler) {
      var handlers;
      typeof handler === "function" && (handlers = this._getHandlers(event)).splice(handlers.indexOf(handler), 1);
    },
    isEnabled: function () {
      return this._enabled;
    },
    setEnabled: function (value) {
      this._enabled = !!value;
    },
    isWritable: function () {
      return this._writable;
    },
    setWritable: function (value) {
      this._writable = !!value;
    },
    _getHandlers: function (event) {
      if (!event && event !== 0) return [];
      this._handlers = this._handlers || {};
      return this._handlers[event] = this._handlers[event] || [];
    },
    _pipe: function (event, prev, initial) {
      var ref = this, handlers = this._getHandlers(event), env = {interrupt: false};
      this._enabled && Array.isArray(handlers) && handlers.forEach(function (handler) {
        env.interrupt || (typeof handler === "function" && (prev = handler(prev, initial, ref, env)));
      });
      return prev;
    }
  };

  return ElemRef;
})();
