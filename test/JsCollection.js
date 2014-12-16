/*global JsCollection*/

"use strict";

var myElements = [
    {
        name: 'Test Test1',
        id: 24
    },
    {
        name: 'Abba Test2',
        id: 10
    },
    {
        name: 'Zee Test3',
        id: 55
    },
    {
        name: 'Bentley Test4',
        id: 1
    },
    {
        name: 'Moo says the cow',
        id: 77
    }
];

describe('JsCollection', function() {

    it('should check if integer', function() {
        var testCollection = new JsCollection();
        expect(testCollection.isInt(4)).toBeTruthy();
        expect(testCollection.isInt('4')).toBeFalsy();
        expect(testCollection.isInt('Text')).toBeFalsy();
        expect(testCollection.isInt([2])).toBeFalsy();
        expect(testCollection.isInt(3.4)).toBeFalsy();
        expect(testCollection.isInt({5:4})).toBeFalsy();
        expect(testCollection.isInt(99999999999999999)).toBeTruthy();
    });

    it('should check if array', function() {
        var testCollection = new JsCollection();
        expect(testCollection.isArray([4])).toBeTruthy();
        expect(testCollection.isArray(['23', {'a':'b'}])).toBeTruthy();
        expect(testCollection.isArray('4')).toBeFalsy();
        expect(testCollection.isInt({5:[4]})).toBeFalsy();
    });

    it('could be constructed with array', function() {
        var testCollection = new JsCollection(myElements);
        expect(testCollection instanceof JsCollection).toBe(true);
        expect(testCollection.count()).toBe(5);
    });

    it('should add elements to the collection', function() {
        var testCollection = new JsCollection(),
            testCollection2 = new JsCollection();
        testCollection.add(myElements[0]);
        testCollection2.add(myElements[0]);
        testCollection2.add(myElements[1]);
        expect(testCollection.count()).toBe(1);
        testCollection.add(myElements[1]);
        expect(testCollection.count()).toBe(2);
        testCollection.add(myElements[2]);
        expect(testCollection.count()).toBe(3);
        testCollection.add(myElements[3]);
        expect(testCollection.count()).toBe(4);
        testCollection.add(myElements[4]);
        expect(testCollection.count()).toBe(5);
        testCollection.add('Not an object');
        expect(testCollection.count()).toBe(5);
        testCollection.add(function() {});
        expect(testCollection.count()).toBe(5);
        testCollection.add(null);
        expect(testCollection.count()).toBe(5);
        expect(testCollection2.count()).toBe(2);
    });

    it('should return keys', function() {
        var testCollection = new JsCollection(myElements);
        var keys = testCollection.getKeys(),
            compArray = [0, 1, 2, 3, 4];
        expect(keys).toEqual(compArray);
    });

    it('should contain keys', function() {
        var testCollection = new JsCollection(myElements);
        expect(testCollection.containsKey(0)).toBeTruthy();
        expect(testCollection.containsKey(2)).toBeTruthy();
        expect(testCollection.containsKey(5)).toBeFalsy();
        expect(testCollection.containsKey(99)).toBeFalsy();
    });

    it('should return element by key', function() {
        var testCollection = new JsCollection(myElements);
        expect(testCollection.get(0)).toEqual(myElements[0]);
        expect(testCollection.get(1)).toEqual(myElements[1]);
        expect(testCollection.get(2)).toEqual(myElements[2]);
        expect(testCollection.get(3)).toEqual(myElements[3]);
    });

    it('should return element by position', function() {
        var testCollection = new JsCollection(myElements);
        testCollection.next();
        expect(testCollection.get()).toEqual(myElements[1]);
        testCollection.next();
        testCollection.next();
        expect(testCollection.get()).toEqual(myElements[3]);
        testCollection.next();
        testCollection.next();
        expect(testCollection.get()).toEqual(undefined);
    });

    it('should return all elements', function() {
        var testCollection = new JsCollection(myElements);
        expect(testCollection.getAll()).toEqual(myElements);
    });

    it('should remove element by key', function() {
        var testCollection = new JsCollection(myElements);
        expect(testCollection.remove(0)).toEqual(myElements[0]);
        expect(testCollection.count()).toBe(4);
        expect(testCollection.remove(2)).toEqual(myElements[3]);
        expect(testCollection.count()).toBe(3);
        expect(testCollection.remove(99)).toEqual(undefined);
    });

    it('should remove element by position', function() {
        var testCollection = new JsCollection(myElements);
        testCollection.next();
        expect(testCollection.remove(0)).toEqual(myElements[1]);
        testCollection.next();
        testCollection.next();
        expect(testCollection.remove(0)).toEqual(myElements[4]);
    });

    it('should set replace with key if key exists', function() {
        var testCollection = new JsCollection(myElements);
        testCollection.replace('f', myElements[0]);
        expect(testCollection.count()).toBe(5);
        testCollection.replace(3, myElements[0]);
        expect(testCollection.get(3)).toEqual(myElements[0]);
        testCollection.replace(20, myElements[1]);
        expect(testCollection.get(20)).toEqual(undefined);
    });

    it('should have first', function() {
        var testCollection = new JsCollection(myElements);
        expect(testCollection.first()).toEqual(myElements[0]);
    });

    it('should have last', function() {
        var testCollection = new JsCollection(myElements);
        expect(testCollection.last()).toEqual(myElements[4]);
    });

    it('should return iterator position', function() {
        var testCollection = new JsCollection(myElements);
        expect(testCollection.position()).toEqual(0);
        testCollection.next();
        testCollection.next();
        expect(testCollection.position()).toEqual(2);
    });

    it('should clear elements', function() {
        var testCollection = new JsCollection(myElements);
        testCollection.clear();
        expect(testCollection.getAll()).toEqual([]);
    });

    it('should be able to set array', function() {
        var testCollection = new JsCollection();
        testCollection.setArray(myElements);
        expect(testCollection.count()).toEqual(5);
    });

    it('should have next, hasNext and current functionality', function() {
        var testCollection = new JsCollection(myElements);
        expect(testCollection.current()).toEqual(myElements[0]);
        expect(testCollection.hasNext()).toBeTruthy();
        expect(testCollection.next()).toEqual(myElements[0]);
        expect(testCollection.current()).toEqual(myElements[1]);
        expect(testCollection.hasNext()).toBeTruthy();
        expect(testCollection.position()).toEqual(1);
        expect(testCollection.next()).toEqual(myElements[1]);
        expect(testCollection.current()).toEqual(myElements[2]);
        expect(testCollection.hasNext()).toBeTruthy();
        expect(testCollection.position()).toEqual(2);
        expect(testCollection.next()).toEqual(myElements[2]);
        expect(testCollection.current()).toEqual(myElements[3]);
        expect(testCollection.hasNext()).toBeTruthy();
        expect(testCollection.position()).toEqual(3);
        expect(testCollection.next()).toEqual(myElements[3]);
        expect(testCollection.current()).toEqual(myElements[4]);
        expect(testCollection.hasNext()).toBeTruthy();
        expect(testCollection.position()).toEqual(4);
        expect(testCollection.next()).toEqual(myElements[4]);
        expect(testCollection.current()).toEqual(myElements[5]);
        expect(testCollection.hasNext()).toBeFalsy();
        expect(testCollection.position()).toEqual(5);
    });

    it('should rewind', function() {
        var testCollection = new JsCollection(myElements);
        testCollection.next();
        testCollection.next();
        expect(testCollection.rewind()).toEqual(myElements[0]);
    });

    it('should iterate', function() {
        var testCollection = new JsCollection(myElements);
        var i = 0;
        while(testCollection.hasNext()) {
            expect(testCollection.next()).toEqual(myElements[i++]);
        }
    });

    it('should insert before current', function() {
        var testCollection = new JsCollection(myElements);
        expect(testCollection.next()).toEqual(myElements[0]);
        expect(testCollection.next()).toEqual(myElements[1]);
        expect(testCollection.current()).toEqual(myElements[2]);

        testCollection.insertBefore({ name: 'Before', id: 22 });
        expect(testCollection.position()).toEqual(3);
        expect(testCollection.current()).toEqual(myElements[2]);
        expect(testCollection.count()).toEqual(6);
    });

    it('should insert after current', function() {
        var testCollection = new JsCollection(myElements);
        expect(testCollection.next()).toEqual(myElements[0]);
        expect(testCollection.next()).toEqual(myElements[1]);
        expect(testCollection.current()).toEqual(myElements[2]);

        testCollection.insertAfter({ name: 'After', id: 22 });
        expect(testCollection.position()).toEqual(2);
        expect(testCollection.current()).toEqual(myElements[2]);
        expect(testCollection.count()).toEqual(6);
    });

    it('should iterate with each', function() {
        var testCollection = new JsCollection(myElements);
        expect(testCollection.count()).toEqual(5);
        testCollection.each(function (key, value) {
            expect(value).toEqual(myElements[key]);
        });
    });

    it('should order by property', function() {
        var testCollection = new JsCollection(myElements);
        testCollection.orderBy('name', 'asc');
        var testArray = [ { name: 'Abba Test2', id: 10 }, { name: 'Bentley Test4', id: 1 }, { name: 'Moo says the cow', id: 77 }, { name: 'Test Test1', id: 24 }, { name: 'Zee Test3', id: 55 } ];
        expect(testCollection.getAll()).toEqual(testArray);

        testCollection.orderBy('name', 'desc');
        testArray = [{name: 'Zee Test3', id: 55}, {name: 'Test Test1', id: 24}, {name: 'Moo says the cow', id: 77}, {name: 'Bentley Test4', id: 1}, {name: 'Abba Test2', id: 10}];
        expect(testCollection.getAll()).toEqual(testArray);

        testCollection.orderBy('id');
        testArray = [ { name: 'Bentley Test4', id: 1 }, { name: 'Abba Test2', id: 10 }, { name: 'Test Test1', id: 24 }, { name: 'Zee Test3', id: 55 }, { name: 'Moo says the cow', id: 77 } ];
        expect(testCollection.getAll()).toEqual(testArray);

        testCollection.orderBy('id', 'desc');
        testArray = [ { name: 'Moo says the cow', id: 77 }, { name: 'Zee Test3', id: 55 }, { name: 'Test Test1', id: 24 }, { name: 'Abba Test2', id: 10 }, { name: 'Bentley Test4', id: 1 } ];
        expect(testCollection.getAll()).toEqual(testArray);
    });

});
