ngAria [![Build Status](https://travis-ci.org/arbus/ng-aria.png?branch=master)](https://travis-ci.org/arbus/ng-aria)
======

This module is aims to implement [aria](http://www.w3.org/WAI/PF/aria/states_and_properties) attributes to your angular app with as little effort from the you as possible. 

Currently implemented aria attributes:
+ aria-hidden
+ aria-checked
+ aria-disabled
+ aria-required
+ aria-invalid

## Usage

```js
var app = angular.module('myAwesomeApp', ['ngAria']);
app.run(['$aria', function($aria){
  // This will enable all the aria arrtibutes
  $aria.enable();
  // Instead of enable(), you can selectively disable certain tags from running
  $aria.setConfig({
    // This will diable aria-hidden attributes from being displayed
    ariaHidden: false
  });
}]);
```
