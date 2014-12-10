
var Collection = function() {

    var elements    = [],
        index       = 0,
        self        = this;

    /**
     * Private: check if integer
     *
     * @param n
     * @returns {boolean}
     */
    var isInt = function (n) {
        return Number(n) === n && n % 1 === 0;
    };

    /**
     * Private: check if array
     *
     * @param o
     * @returns {boolean}
     */
    var isArray = function (o) {
        return Object.prototype.toString.call(o) === '[object Array]';
    };

    /**
     * Add element object to the collection
     *
     * @param element
     */
    this.addElement  = function(element) {
        if(typeof element === 'object' && element !== null) {
            elements.push(element);
        }
    };

    this.getElements = function() {
        return elements;
    };

    /**
     * Count number of elements in the collection
     *
     * @returns {Number}
     */
    this.count = function() {
        return elements.length;
    };

    /**
     * Return array keys as integers
     *
     * @returns {Array}
     */
    this.getKeys = function() {
        var keys = [];

        self.each(function(key) {
            if (key !== 'length' || elements.hasOwnProperty(key)) {
                keys.push(parseInt(key, 10));
            }
        });

        return keys;
    };

    /**
     * Elements contain key
     *
     * @param key
     * @returns {boolean}
     */
    this.containsKey = function(key) {
        return (undefined !== elements[key]);
    };

    /**
     * Return element by key id
     *
     * @param key
     * @returns {*}
     */
    this.getByKey = function(key) {
        if(self.containsKey(key)) {
            return elements[key];
        }
    };

    /**
     * Removes element by key, returns the removed object if in fact it was deleted.
     *
     * @param key
     * @returns {*}
     */
    this.removeByKey = function(key) {
        if(self.containsKey(key)) {
            var removed = self.getByKey(key);
            elements.splice(key, 1);
            return removed;
        }
    };

    /**
     * Set element by key
     *
     * @param key
     * @param element
     */
    this.set = function(key, element) {
        if(isInt(key) && self.containsKey(key) && typeof element === 'object' && element !== null && element !== undefined) {
            elements[key] = element;
        }
    };

    /**
     * Get first element
     *
     * @returns {*}
     */
    this.first = function() {
        if(self.containsKey(0)) {
            return elements[0];
        }
    };

    /**
     * Get last element
     *
     * @returns {*}
     */
    this.last = function() {
        var last = self.count() - 1;
        if(self.containsKey(last)) {
            return elements[last];
        }
    };

    /**
     * Returns current iterator position
     *
     * @returns {number}
     */
    this.key = function() {
        return index;
    };

    /**
     * Increment the index and return next element
     *
     * @returns {*}
     */
    this.next = function() {
        if(self.hasNext()) {
            var element = elements[index];
            index++;
            return element;
        }
    };

    /**
     * Do we have next
     *
     * @returns {boolean}
     */
    this.hasNext = function() {
        return index < self.count() - 1;
    };

    /**
     * Return current element by index
     *
     * @returns {*}
     */
    this.current = function() {
        return elements[index];
    };

    /**
     * Rewind the index and return the first element
     *
     * @returns {*}
     */
    this.rewind = function() {
        index = 0;
        return elements[index];
    };

    /**
     * Clear the elements and resets index
     */
    this.clear = function() {
        elements = [];
        index = 0;
    };

    /**
     * Sets array
     *
     * @param newArray
     */
    this.setArray = function(newArray) {
        if(isArray(newArray) && newArray.length) {
            elements = newArray;
        }
    };

    /**
     * Iterate via each
     *
     * @param callback
     */
    this.each = function(callback) {
        for(var i = 0; i < self.count(); i++) {
            callback(i, self.getByKey(i));
        }
    };

    /**
     * Order elements by property and direction
     *
     * @param property
     * @param direction
     */
    this.orderBy = function (property, direction) {
        direction = direction || 'asc';

        elements.sort(function (a, b) {

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
};

