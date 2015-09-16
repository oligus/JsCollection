/*global JsCollection, describe, it, expect*/

"use strict";

var myElements = [
    {
        name: 'Test Test1',
        id: 24,
        type: {
            first: 'A',
            second: 'B'
        }
    },
    {
        name: 'Abba Test2',
        id: 10,
        type: {
            first: 'C',
            second: 'B'
        }
    },
    {
        name: 'Zee Test3',
        id: 55,
        type: {
            first: 'A',
            second: 'C'
        }
    },
    {
        name: 'Bentley Test4',
        id: 1,
        type: {
            first: 'D',
            second: 'D'
        }
    },
    {
        name: 'Moo says the cow',
        id: 77,
        type: {
            first: 'F',
            second: 'A'
        }
    }
];

describe('JsCollection', function() {

    it('should be an instance of JsCollection', function() {
        var testCollection = new JsCollection(myElements);
        expect(testCollection instanceof JsCollection).toBe(true);
    });

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

    it('should set definition', function() {
        var testCollection = new JsCollection();

        // Normal null values
        expect(testCollection.doDefine(null, 'asc', 'integer', false)).toEqual(-1000000);
        expect(testCollection.doDefine(null, 'desc', 'integer', false)).toEqual(1000000);
        expect(testCollection.doDefine(null, 'asc', 'char', false)).toEqual('Z');
        expect(testCollection.doDefine(null, 'desc', 'char', false)).toEqual('@');

        // Normal undefined values
        expect(testCollection.doDefine(undefined, 'asc', 'integer', false)).toEqual(-1000000);
        expect(testCollection.doDefine(undefined, 'desc', 'integer', false)).toEqual(1000000);
        expect(testCollection.doDefine(undefined, 'asc', 'char', false)).toEqual('Z');
        expect(testCollection.doDefine(undefined, 'desc', 'char', false)).toEqual('@');

        // Inversed
        expect(testCollection.doDefine(null, 'asc', 'integer', true)).toEqual(1000000);
        expect(testCollection.doDefine(-10, 'desc', 'integer', true)).toEqual(-1000000);
        expect(testCollection.doDefine(null, 'asc', 'char', true)).toEqual('@');
        expect(testCollection.doDefine('A', 'desc', 'char', true)).toEqual('Z');

    });

    it('could be constructed with array', function() {
        var testCollection = new JsCollection(myElements);
        expect(testCollection.getAll()).toEqual(myElements);
    });

    it('should count', function() {
        var testCollection = new JsCollection(myElements);
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

    it('should add before current', function() {
        var testCollection = new JsCollection(myElements);
        expect(testCollection.next()).toEqual(myElements[0]);
        expect(testCollection.next()).toEqual(myElements[1]);
        expect(testCollection.current()).toEqual(myElements[2]);

        testCollection.addBefore({ name: 'Before', id: 22 });
        expect(testCollection.position()).toEqual(3);
        expect(testCollection.current()).toEqual(myElements[2]);
        expect(testCollection.count()).toEqual(6);
    });

    it('should add after current', function() {
        var testCollection = new JsCollection(myElements);
        expect(testCollection.next()).toEqual(myElements[0]);
        expect(testCollection.next()).toEqual(myElements[1]);
        expect(testCollection.current()).toEqual(myElements[2]);

        testCollection.addAfter({ name: 'After', id: 22 });
        expect(testCollection.position()).toEqual(2);
        expect(testCollection.current()).toEqual(myElements[2]);
        expect(testCollection.count()).toEqual(6);
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
        expect(testCollection.get()).toEqual(myElements[4]);
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
        expect(testCollection.hasNext()).toBeFalsy();
        expect(testCollection.next()).toEqual(myElements[4]);
        expect(testCollection.current()).toEqual(myElements[4]);
        expect(testCollection.position()).toEqual(4);
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
        var testArray = [
            { name: 'Abba Test2',       id: 10, type: { first: 'C', second: 'B' } },
            { name: 'Bentley Test4',    id: 1,  type: { first: 'D', second: 'D' } },
            { name: 'Moo says the cow', id: 77, type: { first: 'F', second: 'A' } },
            { name: 'Test Test1',       id: 24, type: { first: 'A', second: 'B' } },
            { name: 'Zee Test3',        id: 55, type: { first: 'A', second: 'C' } }
        ];
        expect(testCollection.getAll()).toEqual(testArray);

        testCollection.orderBy('name', 'desc');
        testArray = [
            { name: 'Zee Test3',        id: 55, type: { first: 'A', second: 'C' } },
            { name: 'Test Test1',       id: 24, type: { first: 'A', second: 'B' } },
            { name: 'Moo says the cow', id: 77, type: { first: 'F', second: 'A' } },
            { name: 'Bentley Test4',    id: 1,  type: { first: 'D', second: 'D' } },
            { name: 'Abba Test2',       id: 10, type: { first: 'C', second: 'B' } }
        ];
        expect(testCollection.getAll()).toEqual(testArray);

        testCollection.orderBy('id');
        testArray = [
            { name: 'Bentley Test4',    id: 1,  type: { first: 'D', second: 'D' } },
            { name: 'Abba Test2',       id: 10, type: { first: 'C', second: 'B' } },
            { name: 'Test Test1',       id: 24, type: { first: 'A', second: 'B' } },
            { name: 'Zee Test3',        id: 55, type: { first: 'A', second: 'C' } },
            { name: 'Moo says the cow', id: 77, type: { first: 'F', second: 'A' } },
        ];
        expect(testCollection.getAll()).toEqual(testArray);

        testCollection.orderBy('id', 'desc');
        testArray = [
            { name: 'Moo says the cow', id: 77, type: { first: 'F', second: 'A' } },
            { name: 'Zee Test3',        id: 55, type: { first: 'A', second: 'C' } },
            { name: 'Test Test1',       id: 24, type: { first: 'A', second: 'B' } },
            { name: 'Abba Test2',       id: 10, type: { first: 'C', second: 'B' } },
            { name: 'Bentley Test4',    id: 1,  type: { first: 'D', second: 'D' } }
        ];
        expect(testCollection.getAll()).toEqual(testArray);
    });

    it('should order by extended property', function() {
        var testCollection = new JsCollection(myElements);
        testCollection.orderBy(['type','first'], 'asc');
        var testArray = [
            { name: 'Test Test1',       id: 24, type: { first: 'A', second: 'B' } },
            { name: 'Zee Test3',        id: 55, type: { first: 'A', second: 'C' } },
            { name: 'Abba Test2',       id: 10, type: { first: 'C', second: 'B' } },
            { name: 'Bentley Test4',    id: 1,  type: { first: 'D', second: 'D' } },
            { name: 'Moo says the cow', id: 77, type: { first: 'F', second: 'A' } }
        ];
        expect(testCollection.getAll()).toEqual(testArray);

        testCollection.orderBy(['type','second'], 'desc');
        testArray = [
            { name: 'Bentley Test4',    id: 1,  type: { first: 'D', second: 'D' } },
            { name: 'Zee Test3',        id: 55, type: { first: 'A', second: 'C' } },
            { name: 'Test Test1',       id: 24, type: { first: 'A', second: 'B' } },
            { name: 'Abba Test2',       id: 10, type: { first: 'C', second: 'B' } },
            { name: 'Moo says the cow', id: 77, type: { first: 'F', second: 'A' } }
        ];
        expect(testCollection.getAll()).toEqual(testArray);

    });

    it('should order by extended property with null and undefined', function() {
        var testCollection = new JsCollection(myElements);
        myElements[2].type.first  = null;
        testCollection.orderBy(['type','first'], 'asc', 'char');
        var testArray = [
            { name: 'Test Test1',       id: 24, type: { first: 'A', second: 'B' } },
            { name: 'Abba Test2',       id: 10, type: { first: 'C', second: 'B' } },
            { name: 'Bentley Test4',    id: 1,  type: { first: 'D', second: 'D' } },
            { name: 'Moo says the cow', id: 77, type: { first: 'F', second: 'A' } },
            { name: 'Zee Test3',        id: 55, type: { first: null, second: 'C' } }
        ];
        expect(testCollection.getAll()).toEqual(testArray);


        myElements[2].type.first  = 'undefined';
        testCollection.orderBy(['type','first'], 'asc', 'char');
        testArray = [
            { name: 'Test Test1',       id: 24, type: { first: 'A', second: 'B' } },
            { name: 'Abba Test2',       id: 10, type: { first: 'C', second: 'B' } },
            { name: 'Bentley Test4',    id: 1,  type: { first: 'D', second: 'D' } },
            { name: 'Moo says the cow', id: 77, type: { first: 'F', second: 'A' } },
            { name: 'Zee Test3',        id: 55, type: { first: 'undefined', second: 'C' } }
        ];
        expect(testCollection.getAll()).toEqual(testArray);

        myElements[4].type.second  = null;
        testCollection.orderBy(['type','second'], 'desc', 'char');
        testArray = [
            { name: 'Bentley Test4',    id: 1,  type: { first: 'D', second: 'D' } },
            { name: 'Zee Test3',        id: 55, type: { first: 'undefined', second: 'C' } },
            { name: 'Test Test1',       id: 24, type: { first: 'A', second: 'B' } },
            { name: 'Abba Test2',       id: 10, type: { first: 'C', second: 'B' } },
            { name: 'Moo says the cow', id: 77, type: { first: 'F', second: null } },
        ];
        expect(testCollection.getAll()).toEqual(testArray);

        testArray = [
            { name: 'Bentley Test4',    id: 1,  type: { first: 'D', second: 'D' } },
            { name: 'Zee Test3',        id: 55, type: { first: 'undefined', second: 'C' } },
            { name: 'Test Test1',       id: 24, type: { first: 'A', second: 'B' } },
            { name: 'Abba Test2',       id: 10, type: { first: 'C', second: 'B' } },
            { name: 'Moo says the cow', id: 77, type: { first: 'F', second: 'undefined' } },
        ];
        myElements[4].type.second = 'undefined';
        expect(testCollection.getAll()).toEqual(testArray);
    });


});
