angular.module('angularAria', []).provider('aria', function(){
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

  var watchAttr = function(watchAttr, ariaAttrName, watchValue){
    return function(scope, elem, attr){
      if(currentConfig[ariaAttrName]){
        var destroyWatcher = scope.$watch(function(){
          return elem.attr(watchAttr);
        }, function(newVal, oldVal){
          if(watchValue){
            return elem.attr(convertCase(ariaAttrName), newVal);
          }
          elem.attr(convertCase(ariaAttrName), !angular.isUndefined(newVal));
        });
        scope.$on('$destroy', function(){
          destroyWatcher();
        });
      }
    }
  }

  var watchClass = function(className, ariaAttrName){
    return function(scope, elem, attr){
      if(currentConfig[ariaAttrName]){
        var destroyWatcher = scope.$watch(function(){
          return elem.attr('class');
        }, function(newVal, oldVal){
          elem.attr(convertCase(ariaAttrName), elem.hasClass(className));
        });
      }
    }
  }

  var ariaFactory = function(){
    return {
      ariaHidden: watchClass('ng-hide', 'ariaHidden'),
      ariaChecked: watchAttr('checked', 'ariaChecked', false),
      ariaDisabled: watchAttr('disabled', 'ariaDisabled', false),
      ariaRequired: watchAttr('required', 'ariaRequired', false),
      ariaInvalid: watchClass('ng-invalid', 'ariaInvalid')
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

  
}).directive('ngShow', ['aria', function(aria){
  return aria.ariaHidden;
}]).directive('ngHide', ['aria', function(aria){
  return aria.ariaHidden;
}]).directive('input', ['aria', function(aria){
  return{
    restrict: 'E',
    link: function(scope, elem, attr){
      if(attr.type === 'checkbox'){
        aria.ariaChecked(scope, elem, attr);
      }
      aria.ariaDisabled(scope, elem, attr);
      aria.ariaRequired(scope, elem, attr);
      aria.ariaInvalid(scope, elem, attr);
    }
  };
}]).directive('textarea', ['aria', function(aria){
  return{
    restrict: 'E',
    link: function(scope, elem, attr){
      aria.ariaDisabled(scope, elem, attr);
      aria.ariaRequired(scope, elem, attr);
      aria.ariaInvalid(scope, elem, attr);
    }
  };
}]).directive('button', ['aria', function(aria){
  return{
    restrict: 'E',
    link: function(scope, elem, attr){
      aria.ariaDisabled(scope, elem, attr);
      aria.ariaRequired(scope, elem, attr);
    }
  };
}]).directive('select', ['aria', function(aria){
  return{
    restrict: 'E',
    link: function(scope, elem, attr){
      aria.ariaDisabled(scope, elem, attr);
      aria.ariaRequired(scope, elem, attr);
      aria.ariaInvalid(scope, elem, attr);
    }
  };
}]);
