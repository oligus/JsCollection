JsCollection
============
###Simplify your object array
[![Build Status](https://travis-ci.org/oligus/JsCollection.svg?branch=master)](https://travis-ci.org/oligus/JsCollection)

Js Collection is an object collection class used to simplify using array of objects. This pattern or methodology rather, is commonly used in oo designs. Together with iterator functionality it simplifies traversal and manipulation of objects during the iteration and adds commonality to your arrays.

Usage
-----

**Example**
```javascript
myCollection = new JsCollection(myArrayOfObjects);

while(myCollection.hasNext()) {
    element = testCollection.next();
    element.functionCall();
}

myCollection.orderBy('name');
myElements = myCollection.getElements();


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
| `getPosition()`  | Returns the current iterator position |
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
 - `addElement(element)`: Add an element to the collection
 - `getElements()`: Get all elements currently in the collection
 - `getElement(key|null)`: If key is defined get element by key, else get current element
 - `count()`: Returns number of elements in the collection
 - `getKeys()`: Returns an array of the collection keys
 - `containsKey(key)`: Check if a key exists or not
 - `remove(key|null)`: If key is defined remove element by key, else remove current element
 - `replace(key, element)`: Replace object with key
 - `first()`: Get the first element in the collection
 - `last()`: Get the last element in the collection
 - `getPosition()`: Returns current iterator position
 - `next()`: Returns current object and increases the iterator
 - `hasNext()`: Returns true or false if the collection has more elements
 - `current()`: Returns current element
 - `rewind()`: Resets the iterator
 - `clear()`: Clear the collection, remove all elements
 - `setArray()`: Fill the collection with a array
 - `each(callback(key, value))`: Iterate through all elements
 - `orderBy(property, direction)`: Order elements by element property and direction
 
