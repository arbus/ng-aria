var setupModule = function(config){
  beforeEach(function(){
    angular.module('test', ['angularAria']).config(['ariaProvider', function(ariaProvider){
      ariaProvider.enable(config);
    }]);
  });
  beforeEach(module('test'));
}

expectAriaAttr = function(ariaAttr, expected){
  angular.forEach(element, function(val){
    expect(angular.element(val).attr(ariaAttr)).toBe(expected);
  });
}
