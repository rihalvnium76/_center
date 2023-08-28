var IdSet = (function () {
    function IdSet() {
        this._items = {};
        this._size = 0;
    }

    IdSet.from = function (o) {
        if (o instanceof IdSet) {
            return o.clone();
        }
        var ret = new IdSet();
        if (Array.isArray(o)) {
            ret.addAll(o);
        } else {
            ret.add(o);
        }
        return ret;
    };

    IdSet.prototype = {
        constructor:  IdSet,

        add: function (e) {
            var k = this._keyOf(e);
            if (this._accept(k) && !this._has(k)) {
                this._store(k, e);
                ++this._size;
                return true;
            }
            return false;
        },
        remove: function (e) {
            var k = this._keyOf(e);
            if (this._accept(k) && his._has(k)) {
                this._drop(k);
                --this._size;
                return true;
            }
            return false;
        },
        contains: function (e) {
            var k = this._keyOf(e);
            return this._accept(k) && this._has(k);
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
        toArray: function () {
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
        addAll: function (c) {
            (c instanceof IdSet || Array.isArray(c)) && c.forEach(function (e) {
                this.add(e);
            }, this);
        },
        clone: function () {
            var ret = new IdSet();
            for (var k in this._items) {
                this._has(k) && ret._store(k, this._load(k));
            }
            ret._size = this._size;
            return ret;
        },
        intersect: function (c) {
            var ret = new IdSet();
            if (!(c instanceof IdSet || Array.isArray(c))) {
                c = [c];
            }
            c.forEach(function (e) {
                if (this.contains(e)) {
                    ret.add(e);
                }
            }, this);
            return ret;
        },
        allIn: function (c) {
            return this.intersect(c).size() === this._size;
        },
        allNotIn: function (c) {
            return this.intersect(c).size() === 0;
        },
        filter: function (fn, thisArg) {
            var ret = new IdSet();
            this.forEach(function (e) {
                fn.call(thisArg || this, e) && ret.add(e);
            });
            return ret;
        },
        map: function (fn, thisArg) {
            var ret = new IdSet();
            this.forEach(function (e) {
                ret.add(fn.call(thisArg || this, e));
            });
            return ret;
        },
        every: function (fn, thisArg) {
            for (var k in this._items) {
                if (this._has(k) && !fn.call(thisArg || this, this._load(k))) {
                    return false;
                }
            }
            return true;
        },
        some: function (fn, thisArg) {
            for (var k in this._items) {
                if (this._has(k) && fn.call(thisArg || this, this._load(k))) {
                    return true;
                }
            }
            return false;
        },
        reduce: function (fn, initialValue) {
            return this.toArray().reduce(fn, initialValue);
        },
        equals: function (o) {
            if (!(o instanceof IdSet && this._size === o.size())) {
                return false;
            }
            for (var e in o._items) {
                if (!this.contains(e)) {
                    return false;
                }
            }
            return true;
        },

        // overridable low-level R/W interfaces
        // keyOf-> accept -> has -> store / drop / load
        _keyOf: function (e) {
            switch (typeof e) {
                case "string": return "S".concat(e);
                case "number": return "N".concat(e);
                default: return null;
            }
        },
        _accept: function (k) {
            return !!k;
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
            return this._items[k] !== void 0;
        }
    };

    return IdSet;
})();
