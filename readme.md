ngAria [![Build Status](https://travis-ci.org/arbus/ng-aria.png?branch=master)](https://travis-ci.org/arbus/ng-aria)
======

This module is aims to help you implement [aria](http://www.w3.org/WAI/PF/aria/states_and_properties) attributes to your angular app.

Currently implemented aria attributes:
+ aria-hidden
+ aria-checked
+ aria-disabled
+ aria-required
+ aria-invalid

## Usage

```js
var app = angular.module('myAwesomeApp', ['angularAria']).config(['ariaProvider', function(ariaProvider){
    // This will just enable ariaBindings to their default setting
    ariaProvider.enable();
  
    // You can use this to disable specific attributes from being enabled.
    ariaProvider.setConfig({
      ariaHidden: false
    });

}]);
```
