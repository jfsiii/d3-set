(function() {
    !function() {
        var d3 = {
            version: "3.4.4"
        };
        function d3_class(ctor, properties) {
            try {
                for (var key in properties) {
                    Object.defineProperty(ctor.prototype, key, {
                        value: properties[key],
                        enumerable: false
                    });
                }
            } catch (e) {
                ctor.prototype = properties;
            }
        }
        d3.map = function(object) {
            var map = new d3_Map();
            if (object instanceof d3_Map) object.forEach(function(key, value) {
                map.set(key, value);
            }); else for (var key in object) map.set(key, object[key]);
            return map;
        };
        function d3_Map() {}
        d3_class(d3_Map, {
            has: d3_map_has,
            get: function(key) {
                return this[d3_map_prefix + key];
            },
            set: function(key, value) {
                return this[d3_map_prefix + key] = value;
            },
            remove: d3_map_remove,
            keys: d3_map_keys,
            values: function() {
                var values = [];
                this.forEach(function(key, value) {
                    values.push(value);
                });
                return values;
            },
            entries: function() {
                var entries = [];
                this.forEach(function(key, value) {
                    entries.push({
                        key: key,
                        value: value
                    });
                });
                return entries;
            },
            size: d3_map_size,
            empty: d3_map_empty,
            forEach: function(f) {
                for (var key in this) if (key.charCodeAt(0) === d3_map_prefixCode) f.call(this, key.substring(1), this[key]);
            }
        });
        var d3_map_prefix = "\x00", d3_map_prefixCode = d3_map_prefix.charCodeAt(0);
        function d3_map_has(key) {
            return d3_map_prefix + key in this;
        }
        function d3_map_remove(key) {
            key = d3_map_prefix + key;
            return key in this && delete this[key];
        }
        function d3_map_keys() {
            var keys = [];
            this.forEach(function(key) {
                keys.push(key);
            });
            return keys;
        }
        function d3_map_size() {
            var size = 0;
            for (var key in this) if (key.charCodeAt(0) === d3_map_prefixCode) ++size;
            return size;
        }
        function d3_map_empty() {
            for (var key in this) if (key.charCodeAt(0) === d3_map_prefixCode) return false;
            return true;
        }
        d3.set = function(array) {
            var set = new d3_Set();
            if (array) for (var i = 0, n = array.length; i < n; ++i) set.add(array[i]);
            return set;
        };
        function d3_Set() {}
        d3_class(d3_Set, {
            has: d3_map_has,
            add: function(value) {
                this[d3_map_prefix + value] = true;
                return value;
            },
            remove: function(value) {
                value = d3_map_prefix + value;
                return value in this && delete this[value];
            },
            values: d3_map_keys,
            size: d3_map_size,
            empty: d3_map_empty,
            forEach: function(f) {
                for (var value in this) if (value.charCodeAt(0) === d3_map_prefixCode) f.call(this, value.substring(1));
            }
        });
        if (typeof define === "function" && define.amd) {
            define(d3);
        } else if (typeof module === "object" && module.exports) {
            module.exports = d3;
        } else {
            this.d3 = d3;
        }
    }();
})();