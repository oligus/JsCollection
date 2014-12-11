JsCollection
============

Js Collection is a simple object collection class, that is an array of objects.

Usage
-----

**Construct**
```javascript
myCollection = new Collection();
```

**Ordering**
```javascript
myCollection = new Collection();
myCollection.setArray(myArrayOfObjects);

myCollection.orderBy('name', 'desc');

myCollection.each(function(key, value) {
    ...
});
```

### Functions
 - `addElement({Object})`: Add an object to the object collection
 - `getElements()`: Get all objects currently in the collection
 - `count()`: Returns number of objects in the collection
 - `getKeys()`: Returns an array of the collection keys
 - `containsKey(key)`: Check if a key exists or not
 - `getByKey(key)`: Get a object by key
 - `remove(key)`: Remove a object by key
 - `replace(key, {Object})`: Replace object with key
 - `first()`: Get the first object in the collection
 - `last()`: Get the last object in the collection
 - `position()`: Returns current iterator position
 - `next()`: Returns current object and increases the iterator
 - `hasNext()`: Returns true or false if the collection has more objects
 - `current()`: Returns current object
 - `rewind()`: Resets the iterator
 - `clear()`: Clear the collection, remove all items
 - `setArray()`: Fill the collection with a array
 - `each(callback(key, value))`: Iterate through all elements
 - `orderBy(property, direction)`: Order elements by object property and direction
 