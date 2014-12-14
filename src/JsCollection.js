/*global window */

/**
 * JsCollection
 *
 * Simplify your array of objects
 */

'use strict';

( function( window, undefined ) {

    function JsCollection(elementsArray) {
        this.elements   = [];
        this.position   = 0;

        if(this.isArray(elementsArray) && elementsArray.length) {
            this.setArray(elementsArray);
        }
    }

    JsCollection.prototype.isInt = function (n) {
        return Number(n) === n && n % 1 === 0;
    };

    JsCollection.prototype.isArray = function (a) {
        return Object.prototype.toString.call(a) === '[object Array]';
    };

    JsCollection.prototype.getPosition = function() {
        return this.position;
    };

    JsCollection.prototype.addElement = function (element) {
        if(typeof element === 'object' && element !== null) {
            this.elements.push(element);
        }
    };

    JsCollection.prototype.getElements = function() {
        return this.elements;
    };

    JsCollection.prototype.getElement = function(key) {
        key = key || this.position;
        if(this.containsKey(key)) {
            return this.elements[key];
        }
    };

    JsCollection.prototype.count = function () {
        return this.elements.length;
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
        key = key || this.position;
        if(this.containsKey(key)) {
            var removed = this.getElement(key);
            this.elements.splice(key, 1);
            return removed;
        }
    };

    JsCollection.prototype.next = function() {
        if(this.hasNext()) {
            return this.elements[this.position++];
        }
    };

    JsCollection.prototype.hasNext = function() {
        return this.position < this.count();
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
        this.position = 0;
    };

    JsCollection.prototype.setArray = function (elementsArray) {
        if(this.isArray(elementsArray) && elementsArray.length) {
            this.elements = elementsArray.slice(0);
        }
    };

    JsCollection.prototype.current = function () {
        return this.elements[this.position];
    };

    JsCollection.prototype.rewind = function () {
        this.position = 0;
        return this.elements[this.position];
    };

    JsCollection.prototype.insertBefore = function (element) {
        this.elements.splice(this.position++, 0, element);
    };

    JsCollection.prototype.insertAfter = function (element) {
        this.elements.splice(this.position + 1, 0, element);
    };

    JsCollection.prototype.each = function (callback) {
        for(var i = 0, count = this.count(); i < count; i++) {
            callback(i, this.getElement(i));
        }
    };

    JsCollection.prototype.orderBy = function (property, direction) {
        direction = direction || 'asc';

        this.elements.sort(function (a, b) {

            if(!a.hasOwnProperty(property)) {
                return false;
            }

            if (a[property] > b[property]) {
                if(direction === 'desc') {
                    return -1;
                }
                return 1;
            }
            if (a[property] < b[property]) {
                if(direction === 'desc') {
                    return 1;
                }
                return -1;
            }

            return 0;
        });
    };

    window.JsCollection = JsCollection;

} )( window );

