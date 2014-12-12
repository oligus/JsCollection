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

    var testCollection = new JsCollection();

    it('should be instance of Collection', function () {
        expect(testCollection instanceof JsCollection).toBe(true);
    });

    it('should add elements to collection and count', function() {
        testCollection.addElement(myElements[0]);
        expect(testCollection.count()).toBe(1);
        testCollection.addElement(myElements[1]);
        expect(testCollection.count()).toBe(2);
        testCollection.addElement(myElements[2]);
        expect(testCollection.count()).toBe(3);
        testCollection.addElement(myElements[3]);
        expect(testCollection.count()).toBe(4);
        testCollection.addElement(myElements[4]);
        expect(testCollection.count()).toBe(5);
        testCollection.addElement('Not an object');
        expect(testCollection.count()).toBe(5);
        testCollection.addElement(function() {});
        expect(testCollection.count()).toBe(5);
        testCollection.addElement(null);
        expect(testCollection.count()).toBe(5);
    });

    it('should return keys', function() {
        var keys = testCollection.getKeys(),
            compArray = [0, 1, 2, 3, 4];
        expect(keys).toEqual(compArray);
    });

    it('should contain keys', function() {
        expect(testCollection.containsKey(0)).toBeTruthy();
        expect(testCollection.containsKey(2)).toBeTruthy();
        expect(testCollection.containsKey(5)).toBeFalsy();
        expect(testCollection.containsKey(99)).toBeFalsy();
    });

    it('should return object by key', function() {
        expect(testCollection.getByKey(0)).toEqual(myElements[0]);
        expect(testCollection.getByKey(1)).toEqual(myElements[1]);
        expect(testCollection.getByKey(2)).toEqual(myElements[2]);
        expect(testCollection.getByKey(3)).toEqual(myElements[3]);
    });

    it('should remove object by key', function() {
        expect(testCollection.remove(0)).toEqual(myElements[0]);
        expect(testCollection.count()).toBe(4);
        expect(testCollection.remove(2)).toEqual(myElements[3]);
        expect(testCollection.count()).toBe(3);
        expect(testCollection.remove(99)).toEqual(undefined);
    });

    it('should return element objects', function() {
        var elements = testCollection.getElements();
        expect(elements[0]).toEqual(myElements[1]);
        expect(elements[1]).toEqual(myElements[2]);
        expect(elements[2]).toEqual(myElements[4]);
    });

    it('should set object with key if key exists', function() {
        testCollection.replace('f', myElements[0]);
        expect(testCollection.count()).toBe(3);
        testCollection.replace(0, myElements[0]);
        expect(testCollection.getByKey(0)).toEqual(myElements[0]);
        testCollection.replace(20, myElements[1]);
        expect(testCollection.getByKey(20)).toEqual(undefined);
    });

    it('should have first', function() {
        expect(testCollection.first()).toEqual(myElements[0]);
    });

    it('should have last', function() {
        expect(testCollection.last()).toEqual(myElements[4]);
    });

    it('should be able to reset and set array', function() {
        testCollection.clear();
        expect(testCollection.getElements()).toEqual([]);
        testCollection.setArray(myElements);
        expect(testCollection.count()).toEqual(5);
    });

    it('should have next, hasNext and current functionality', function() {
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

    it('should iterate', function() {
        expect(testCollection.rewind()).toEqual(myElements[0]);
        var i = 0;
        while(testCollection.hasNext()) {
            expect(testCollection.next()).toEqual(myElements[i++]);
        }
    });

    it('should iterate with each', function() {
        expect(testCollection.count()).toEqual(5);
        testCollection.each(function (key, value) {
            expect(value).toEqual(myElements[key]);
        });
    });

    it('should order by property', function() {
        testCollection.orderBy('name', 'asc');
        var testArray = [ { name: 'Abba Test2', id: 10 }, { name: 'Bentley Test4', id: 1 }, { name: 'Moo says the cow', id: 77 }, { name: 'Test Test1', id: 24 }, { name: 'Zee Test3', id: 55 } ];
        expect(testCollection.getElements()).toEqual(testArray);

        testCollection.orderBy('name', 'desc');
        testArray = [{name: 'Zee Test3', id: 55}, {name: 'Test Test1', id: 24}, {name: 'Moo says the cow', id: 77}, {name: 'Bentley Test4', id: 1}, {name: 'Abba Test2', id: 10}];
        expect(testCollection.getElements()).toEqual(testArray);

        testCollection.orderBy('id');
        testArray = [ { name: 'Bentley Test4', id: 1 }, { name: 'Abba Test2', id: 10 }, { name: 'Test Test1', id: 24 }, { name: 'Zee Test3', id: 55 }, { name: 'Moo says the cow', id: 77 } ];
        expect(testCollection.getElements()).toEqual(testArray);

        testCollection.orderBy('id', 'desc');
        testArray = [ { name: 'Moo says the cow', id: 77 }, { name: 'Zee Test3', id: 55 }, { name: 'Test Test1', id: 24 }, { name: 'Abba Test2', id: 10 }, { name: 'Bentley Test4', id: 1 } ];
        expect(testCollection.getElements()).toEqual(testArray);
    });

    it('should insert before and after current', function() {
        testCollection.clear();
        testCollection.setArray(myElements);
        expect(testCollection.next()).toEqual(myElements[0]);
        expect(testCollection.next()).toEqual(myElements[1]);
        expect(testCollection.current()).toEqual(myElements[2]);

        testCollection.insertBefore({ name: 'Before', id: 22 });
        expect(testCollection.position()).toEqual(3);
        expect(testCollection.current()).toEqual(myElements[3]);
        expect(testCollection.count()).toEqual(6);

        testCollection.insertAfter({ name: 'After', id: 22 });
        expect(testCollection.position()).toEqual(3);
        expect(testCollection.current()).toEqual(myElements[3]);
        expect(testCollection.count()).toEqual(7);
    });

    /**
     * Pager functions
     */
    it('should paginate', function() {
        console.log(testCollection.getPager());
    });
});
