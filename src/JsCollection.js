/*global window */

/**
 * JsCollection
 *
 * Simplify your array of objects
 */

"use strict";

( function() {

    function JsCollection(elementsArray) {
        this.elements           = [];
        this.iteratorPosition   = 0;
        this.sortDirection      = '';
        this.sortProperty       = '';
        this.setArray(elementsArray);
    }

    JsCollection.prototype.isInt = function (n) {
        return Number(n) === n && n % 1 === 0;
    };

    JsCollection.prototype.isArray = function (a) {
        return Object.prototype.toString.call(a) === '[object Array]';
    };

    /**
     * Set a minimum definition if value is null or undefined, used by orderBy
     *
     * @param value
     * @param direction
     * @param type
     * @param inversed
     * @returns {*}
     */
    JsCollection.prototype.doDefine = function (value, type, direction, inversed) {
        direction   = direction     || 'asc';
        type        = type          || 'integer';
        inversed    = inversed      || false;

        if(value === null || value === undefined) {
            switch(type) {
                case 'integer':
                    value = (direction === 'asc') ? -1e6 : 1e6;
                    break;

                case 'char':
                    value = (direction === 'asc') ? 'Z' : '@'; // @ is smaller than A
                    break;

                default:
                    break;
            }
        }

        switch(type) {
            case 'integer':
                if(value <= 0 && inversed) {
                    value = (direction === 'asc') ? 1e6 : -1e6;
                }
                break;

            case 'char':
                if(value <= 'a' && inversed) {
                    value = (direction === 'asc') ? '@' : 'Z';
                }
                break;

            default:
                break;
        }

        return value;
    };

    JsCollection.prototype.position = function() {
        return this.iteratorPosition;
    };

    JsCollection.prototype.count = function () {
        return this.elements.length;
    };

    JsCollection.prototype.setArray = function (elementsArray) {
        if(this.isArray(elementsArray) && elementsArray.length) {
            this.elements = elementsArray.slice(0);
        }
    };

    JsCollection.prototype.add = function (element) {
        if(typeof element === 'object' && element !== null) {
            this.elements.push(element);
        }
    };

    JsCollection.prototype.addBefore = function (element) {
        this.elements.splice(this.iteratorPosition++, 0, element);
    };

    JsCollection.prototype.addAfter = function (element) {
        this.elements.splice(this.iteratorPosition + 1, 0, element);
    };

    JsCollection.prototype.get = function(key) {
        key = key || this.iteratorPosition;
        if(this.containsKey(key)) {
            return this.elements[key];
        }
    };

    JsCollection.prototype.getAll = function() {
        return this.elements;
    };

    // XXX Needs to be revised
    JsCollection.prototype.getKeys = function() {
        var keys = [];
        for (var key in this.elements) {
            if (key === 'length' || this.elements.hasOwnProperty(key)) {
                keys.push(parseInt(key, 10));
            }
        }
        return keys;
    };

    JsCollection.prototype.containsKey = function (key) {
        return (undefined !== this.elements[key]);
    };

    JsCollection.prototype.remove = function (key) {
        key = key || this.iteratorPosition;
        if(this.containsKey(key)) {
            var removed = this.get(key);
            this.elements.splice(key, 1);
            return removed;
        }
    };

    JsCollection.prototype.next = function() {
        var element = this.elements[this.iteratorPosition];
        if(this.hasNext()) {
            this.iteratorPosition++;
        }
        return element;
    };

    JsCollection.prototype.hasNext = function() {
        return this.iteratorPosition < this.count() - 1;
    };

    JsCollection.prototype.replace = function(key, element) {
        if(this.isInt(key) &&  this.containsKey(key) && typeof element === 'object' && element !== null && element !== undefined) {
            this.elements[key] = element;
        }
    };

    JsCollection.prototype.first = function() {
        if(this.containsKey(0)) {
            return this.elements[0];
        }
    };

    JsCollection.prototype.last = function() {
        var last = this.count() - 1;
        if(this.containsKey(last)) {
            return this.elements[last];
        }
    };

    JsCollection.prototype.clear = function() {
        this.elements = [];
        this.iteratorPosition = 0;
    };

    JsCollection.prototype.current = function () {
        return this.elements[this.iteratorPosition];
    };

    JsCollection.prototype.rewind = function () {
        this.iteratorPosition = 0;
        return this.elements[this.iteratorPosition];
    };

    JsCollection.prototype.each = function (callback) {
        for(var i = 0, count = this.count(); i < count; i++) {
            callback(i, this.get(i));
        }
    };

    /**
     * Order collection by property
     *
     * @param property
     * @param direction
     * @param type
     * @param inversed
     */
    JsCollection.prototype.orderBy = function (property, type, direction, inversed) {
        this.sortDirection = (this.sortDirection === 'asc') ? 'desc' : 'asc';
        this.sortProperty = property;

        direction   = direction     || this.sortDirection;
        type        = type          || 'integer';
        inversed    = inversed      || false;

        var _properties = this.isArray(this.sortProperty) ? this.sortProperty : [this.sortProperty],
            that = this;

        this.elements.sort(function (a, b) {

            for (var i = 0; i < _properties.length; i++) {
                var prop = _properties[i];

                if (!a.hasOwnProperty(prop) || !b.hasOwnProperty(prop)) {
                    return false;
                }

                a = a[prop];
                b = b[prop];

                a = that.doDefine(a, type, direction, inversed);
                b = that.doDefine(b, type, direction, inversed);
            }

            var dir = direction === 'desc' ? -1 : 1;

            return dir * (a > b ? 1 : a < b ? -1 : 0);
        });
    };

    if (typeof module !== 'undefined' && module.exports) {
        module.exports = JsCollection;
    } else if (typeof define === 'function') {
        define(function() { return JsCollection; });
    } else {
        window.JsCollection = JsCollection;
    }

})();

