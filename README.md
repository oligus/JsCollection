JsCollection
============

Js Collection is a simple object collection class used to simplify using array of objects.

Usage
-----

**Construct**
```javascript
myCollection = new JsCollection();
```

####Add elements to your collection
#####Within a loop
Adds a single object at the end of the array collection

```javascript
myCollection.addElement(myObject);
```
#####Complete array
You can set an array of objects directly
```javascript
myCollection.setArray(myArrayOfObjects);
```
####Iteration
You can iterate the collection in multiple ways:

**each**
```javascript
myCollection.each(function(key, element) {}):
```

**while**
```javascript
while(myCollection.hasNext()) {
    element = testCollection.next();
}
```
**for**
```javascript
for(var i = 0; i < testCollection.count(); i++) {
    element = testCollection.getByKey(i);
}
```
**Iterator functions**


| Function | Description |
| :------- | :---------- |
| `count()`  | Returns number of objects in the collection |
| `position()`  | Returns the current iterator position |
| `first()`  | Returns the first element in the collection |
| `last()`  | Returns the last element in the collection |
| `current()`  | Returns current element according to the iterator position |
| `next()`  | Returns current element then increases the iterator position by one |
| `hasNext()`  | Returns true or false if the collection has more elements |
| `rewind()`| Resets the iterator position and returns the first element in the collection |

####Ordering
```javascript
myCollection.orderBy('name', 'desc');
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
 
