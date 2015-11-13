

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

var app = angular.module('myApp', []);
app.controller('myCtrl', function($scope) {
    $scope.testCollection = new JsCollection(myElements);

    $scope.collectionString = JSON.stringify($scope.testCollection, null, 2);
});
