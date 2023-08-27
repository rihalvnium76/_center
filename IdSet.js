var IdSet = (function () {
    function IdSet() {
        this._items = {};
        this._size = 0;
    }
    IdSet.prototype = {
        constructor:  IdSet,

        add: function (e) {
            var k = this._keyOf(e);
            if (!this._has(k)) {
                this._store(k, e);
                ++this._size;
                return true;
            }
            return false;
        },
        remove: function (e) {
            var k = this._keyOf(e);
            if (this._has(k)) {
                this._drop(k);
                --this._size;
                return true;
            }
            return false;
        },
        contains: function (e) {
            return this._has(this._keyOf(e));
        },
        clear: function () {
            this._items = {};
            this._size = 0;
        },
        size: function () {
            return this._size;
        },
        isEmpty: function () {
            return !this._size;
        },
        toList: function () {
            var ret = [];
            for (var k in this._items) {
                if (this._has(k)) {
                    ret.push(this._load(k));
                }
            }
            return ret;
        },
        forEach: function (fn, thisArg) {
            for (var k in this._items) {
                if (this._has(k)) {
                    fn.call(thisArg || this, this._load(k));
                }
            }
        },
        
        clone: function () {
            var ret = new IdSet();
            for (var k in this._items) {
                this._has(k) && ret._store(k, this._load(k));
            }
            ret._size = this._size;
            return ret;
        },
        allIn: function (e) {
            if (!Array.isArray(e)) {
                return this._size === 1 && this.contains(e);
            }
            switch (e.length) {
                case 1: return this._size === 1 && this.contains(e[0]);
                case 0: return this.isEmpty();
                default:
                    var t = this.clone();
                    e.forEach(function (e) {
                        t.remove(e);
                    });
                    return t.isEmpty();
            }
        },
        allNotIn: function (e) {
            if (!Array.isArray(e)) {
                return !this.contains(e);
            }
            for (var i = 0; i < e.length; ++i) {
                if (this.contains(e[i])) {
                    return false;
                }
            }
            return true;
        },
        addAll: function (c) {
            (c instanceof IdSet || Array.isArray(c)) && c.forEach(function (e) {
                this.add(e);
            }, this);
        },
        filter: function (fn) {
            var ret = new IdSet();
            this.forEach(function (e) {
                fn.call(this, e) && ret.add(e);
            });
            return ret;
        },
        map: function (fn) {
            var ret = new IdSet();
            this.forEach(function (e) {
                ret.add(fn.call(this, e));
            });
            return ret;
        },
        every: function (fn) {
            for (var k in this._items) {
                if (this._has(k) && !fn.call(this, this._load(k))) {
                    return false;
                }
            }
            return true;
        },
        some: function (fn) {
            for (var k in this._items) {
                if (this._has(k) && fn.call(this, this._load(k))) {
                    return true;
                }
            }
            return false;
        },
        reduce: function (fn, initialValue) {
            var ret = initialValue, direct = arguments.length === 1;
            this.forEach(function (e) {
                if (direct) {
                    ret = e;
                    direct = false;
                } else {
                    ret = fn.call(this, ret, e);
                }
            });
            return ret;
        },

        // overridable low-level R/W interfaces
        // keyOf -> accept -> has -> store / drop / load
        _keyOf: function (e) {
            switch (typeof e) {
                case "string": return "S" + e;
                case "number": return "N" + e;
                default: return null;
            }
        },
        _store: function (k, e) {
            this._items[k] = {value: e};
        },
        _load: function (k) {
            return this._items[k].value;
        },
        _drop: function (k) {
            this._items[k] = void 0;
        },
        _has: function (k) {
            return k && this._items.hasOwnProperty(k) && this._items[k] !== void 0;
        }
    };
    return IdSet;
})();