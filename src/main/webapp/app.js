'use strict';

var app = angular.module('myApp', []);

app.controller("MyController", ["$scope", "editString", function ($scope, factory) {
        $scope.personObject = [{firstName: 'mathias', lastName: 'jacobsen'}, {firstName: 'philip', lastName: 'west'}];
        $scope.title = factory.titleCase("waddup my friend"); // gør første bogstav i ord cap
        $scope.camel = factory.camelCase("waddup my friend"); // gør første bogstav i ord cap, ingen mellemrum mellem ord
        $scope.dash = factory.dashCase("waddup my friend"); // småt første bogstav, sætter ord sammen med "-"
    }]);

app.filter("name", function () {
    return function (person) {
        var fn = person[1].firstName;
        var ln = person[1].lastName;
        return ln + ", " + fn;
    };
});

app.directive("loginform", function () { // adder directive
    return {
        templateUrl: "login-form.html"
    };
});

app.factory("editString", function () {
    var factory = {};

    factory.titleCase = function (str) {
        var array = str.split(' '); // splitter ved mellemrum, vi får array med 3, ["waddup", "my", "friend"]
        var splitWord;

        for (var i = 0; i < array.length; i++) {
            splitWord = array[i].toLowerCase().split(''); // splitter pr, tegn ["w", "a", "d", "d", "u", "p"]
            splitWord[0] = splitWord[0].toUpperCase(); // Tager første ord i waddup og gør til upperCase ]"W", "a", "d", "d", "u", "p"]
            array[i] = splitWord.join(''); // ["Waddup"]
        }
        str = array.join(' '); // sætter alle ord sammen med mellemrum mellem, lægger det til en String
        return str;
    }

    factory.camelCase = function (str) { // oræcist det samme som titleCase, joiner bare uden mellemrum
        var array = str.split(' ');
        var splitWord;

        for (var i = 0; i < array.length; i++) {
            splitWord = array[i].toLowerCase().split('');
            splitWord[0] = splitWord[0].toUpperCase();
            array[i] = splitWord.join('');
        }
        str = array.join('');
        return str;

    }

    factory.dashCase = function (str) {
        var array = str.split(' ');
//        var splitWord;
//        for (var i = 0; i < array.length; i++) {
//            splitWord = array[i].toLowerCase().split('');
//            array[i] = splitWord.join('');
//        }
        str = array.join('-');
        return str;
    }

    return factory;
});


