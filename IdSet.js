var IdSet = (function () {
    function IdSet() {
        this._items = {};
        this._size = 0;
    }
    IdSet.prototype = {
        constructor: IdSet,
        add: function (e) {
            var k = this._getKeyName(e);
            if (this._isAcceptedType(e) && this._items[k] === void 0) {
                this._items[k] = e;
                this._size += 1;
            };
        },
        remove: function (e) {
            if (this.contains(e)) {
                this._items[this._getKeyName(e)] = void 0;
                this._size -= 1;
            };
        },
        contains: function (e) {
            return this._isAcceptedType(e) && this._items[this._getKeyName(e)] !== void 0;
        },
        clear: function () {
            this.constructor();
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
                ret.push(this._items[k]);
            }
            return ret;
        },
        forEach: function (handle) {
            if (typeof handle === "function") {
                for (var k in this._items) {
                    handle(this._items[k], this);
                }
            }
        },
        clone: function () {
            var ret = new IdSet();
            for (var k in this._items) {
                ret._items[k] = this._items[k];
            }
            ret._size = this._size;
            return ret;
        },
        allIn: function (e) {
            if (Array.isArray(e)) {
                if (e.length === 1) {
                    return this._size === 1 && this.contains(e[0]);
                } else if (e.length !== 0) {
                    var t = this.clone();
                    e.forEach(function (e) {
                        t.remove(e);
                    });
                    return t.isEmpty();
                }
            }
            return this._size === 1 && this.contains(e);
        },
        allNotIn: function (e) {
            var _this = this, ret = true;
            Array.isArray(e) && e.forEach(function (e) {
                _this.contains(e) && (ret = false);
            });
            return ret;
        },
        addAll: function (collection) {
            var _this = this;
            if (collection instanceof IdSet || Array.isArray(collection)) {
                collection.forEach(function (e) {
                    _this.add(e);
                });
            }
        },
        filter: function (handle) {
            var _this = this, ret = new IdSet();
            typeof handle === "function" && this.forEach(function (e) {
                if (handle(e, _this)) {
                    ret.add(e);
                }
            });
            return ret;
        },
        map: function (handle) {
            var _this = this, ret = new IdSet();
            typeof handle === "function" && this.forEach(function (e) {
                ret.add(handle(e, _this));
            });
            return ret;
        },
        every: function (handle) {
            var _this = this, ret = false;
            typeof handle === "function" && (ret = true) && this.forEach(function (e) {
                ret = ret && handle(e, _this);
            });
            return ret;
        },
        some: function (handle) {
            var _this = this, ret = false;
            typeof handle === "function" && this.forEach(function (e) {
                ret = ret || handle(e, _this);
            });
            return ret;
        },
        reduce: function (handle, initialValue) {
            var _this = this;
            var ret = initialValue, direct = initialValue === void 0;
            typeof handle === "function" && this.forEach(function (e) {
                if (direct) {
                    ret = e;
                    direct = false;
                } else  {
                    ret = handle(ret, e, _this);
                }
                
            });
            return ret;
        },
        _isAcceptedType: function (e) {
            return typeof e === "number" || typeof e === "string";
        },
        _getKeyName: function (e) {
            switch (typeof e) {
                case "string": return "S" + e;
                case "number": return "N" + e;
                default: return "?" + e;
            }
        }
    };
    return IdSet;
})();