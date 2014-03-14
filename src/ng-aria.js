angular.module('ngAria', []).provider('$aria', function(){
  var defaultConfig = {
    ariaHidden : true,
    ariaChecked: true,
    ariaDisabled: true,
    ariaRequired: true,
    ariaInvalid: true
  };
  var currentConfig = {
    ariaHidden : false,
    ariaChecked: false,
    ariaDisabled: false,
    ariaRequired: false,
    ariaInvalid: false
  };

  var convertCase = function(input){
    return input.replace(/[A-Z]/g, function(letter, pos){
      return (pos ? '-' : '') + letter.toLowerCase();
    });
  };

  var genFn = function(watchAttr, attrName, trigger){
    return function(scope, elem, attr){
      if(currentConfig[attrName]){
        var destroyWatcher = scope.$watch(function(){
          return elem.attr(watchAttr);
        }, function(newVal, oldVal){
          var result;
          if(watchAttr === 'class'){
            result = elem.hasClass(trigger);
          }else{
            result = !angular.isUndefined(elem.attr(watchAttr));
          }
          elem.attr(convertCase(attrName), result);
        });
        scope.$on('$destroy', function(){
          destroyWatcher();
        });
      }
    };
  };

  var ariaFactory = function(){
    return {
      ariaHidden: genFn('class', 'ariaHidden', 'ng-hide'),
      ariaChecked: genFn('checked', 'ariaChecked'),
      ariaDisabled: genFn('disabled', 'ariaDisabled'),
      ariaRequired: genFn('required', 'ariaRequired'),
      ariaInvalid: genFn('class', 'ariaInvalid', 'ng-invalid')
    };
  };

  return{
    enable: function(config){
      if(angular.isUndefined(config)){
        currentConfig = defaultConfig;
      }else{
        this.setConfig(config);
      }
    },
    setConfig: function(config){
      currentConfig = angular.extend(defaultConfig, config);
    },
    $get: ariaFactory
  };

  
}).directive('ngShow', ['$aria', function($aria){
  return $aria.ariaHidden;
}]).directive('ngHide', ['$aria', function($aria){
  return $aria.ariaHidden;
}]).directive('input', ['$aria', function($aria){
  return{
    restrict: 'E',
    link: function(scope, elem, attr){
      if(attr.type === 'checkbox'){
        $aria.ariaChecked(scope, elem, attr);
      }
      $aria.ariaDisabled(scope, elem, attr);
      $aria.ariaRequired(scope, elem, attr);
      $aria.ariaInvalid(scope, elem, attr);
    }
  };
}]).directive('textarea', ['$aria', function($aria){
  return{
    restrict: 'E',
    link: function(scope, elem, attr){
      $aria.ariaDisabled(scope, elem, attr);
      $aria.ariaRequired(scope, elem, attr);
      $aria.ariaInvalid(scope, elem, attr);
    }
  };
}]).directive('button', ['$aria', function($aria){
  return{
    restrict: 'E',
    link: function(scope, elem, attr){
      $aria.ariaDisabled(scope, elem, attr);
      $aria.ariaRequired(scope, elem, attr);
    }
  };
}]).directive('select', ['$aria', function($aria){
  return{
    restrict: 'E',
    link: function(scope, elem, attr){
      $aria.ariaDisabled(scope, elem, attr);
      $aria.ariaRequired(scope, elem, attr);
      $aria.ariaInvalid(scope, elem, attr);
    }
  };
}]);