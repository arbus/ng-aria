angular.module('ngAria', []).factory('$aria', [function(){
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
    ariaInvalid: true
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
    getConfig : function(){
      return currentConfig;
    }
  };
}]).factory('$ariaFns', ['$aria', function($aria){
  return {
    ariaHidden: function(scope, elem, attr){
      if($aria.getConfig().ariaHidden){
        var destroyWatcher = scope.$watch(function(){
          return elem.attr('class');
        }, function(){
          if(elem.hasClass('ng-hide')){
            elem.attr('aria-hidden', 'true');
          }else{
            elem.attr('aria-hidden', 'false');
          }  
        });
        scope.$on('$destroy', function(){
          destroyWatcher();
        });
      }
    },
    ariaChecked: function(scope, elem, attr){
      if($aria.getConfig().ariaChecked){
        var destroyWatcher = scope.$watch(function(){
          return elem.attr('checked');
        }, function(){
          if(angular.isUndefined(elem.attr('checked'))){
            elem.attr('aria-checked', 'false');
          }else{
            elem.attr('aria-checked', 'true');
          }
        });
        scope.$on('$destroy', function(){
          destroyWatcher();
        });
      }
    },
    ariaDisabled: function(scope, elem, attr){
      if($aria.getConfig().ariaDisabled){
        var destroyWatcher = scope.$watch(function(){
          return elem.attr('disabled');
        }, function(){
          if(angular.isUndefined(elem.attr('disabled'))){
            elem.attr('aria-disabled', 'false');
          }else{
            elem.attr('aria-disabled', 'true');
          }
        });
        scope.$on('$destroy', function(){
          destroyWatcher();
        });
      }
    },
    ariaRequired: function(scope, elem, attr){
      if($aria.getConfig().ariaRequired){
        var destroyWatcher = scope.$watch(function(){
          return elem.attr('required');
        }, function(){
          if(angular.isUndefined(elem.attr('required'))){
            elem.attr('aria-required', 'false');
          }else{
            elem.attr('aria-required', 'true');
          }
        });
        scope.$on('$destroy', function(){
          destroyWatcher();
        });
      }
    },
    ariaInvalid: function(scope, elem, attr){
      if($aria.getConfig().ariaInvalid){
        var destroyWatcher = scope.$watch(function(){
          return elem.attr('class');
        }, function(){
          if(elem.hasClass('ng-invalid')){
            elem.attr('aria-invalid', 'true');
          }else{
            elem.attr('aria-invalid', 'false');
          }
        });
        scope.$on('$destroy', function(){
          destroyWatcher();
        });
      }
    }
  };
}]).directive('ngShow', ['$ariaFns', function($ariaFns){
  return $ariaFns.ariaHidden;
}]).directive('ngHide', ['$ariaFns', function($ariaFns){
  return $ariaFns.ariaHidden;
}]).directive('input', ['$ariaFns', function($ariaFns){
  return{
    restrict: 'E',
    link: function(scope, elem, attr){
      if(attr.type === 'checkbox'){
        $ariaFns.ariaChecked(scope, elem, attr);
      }
      $ariaFns.ariaDisabled(scope, elem, attr);
      $ariaFns.ariaRequired(scope, elem, attr);
      $ariaFns.ariaInvalid(scope, elem, attr);
    }
  };
}]).directive('textarea', ['$ariaFns', function($ariaFns){
  return{
    restrict: 'E',
    link: function(scope, elem, attr){
      $ariaFns.ariaDisabled(scope, elem, attr);
      $ariaFns.ariaRequired(scope, elem, attr);
      $ariaFns.ariaInvalid(scope, elem, attr);
    }
  };
}]).directive('button', ['$ariaFns', function($ariaFns){
  return{
    restrict: 'E',
    link: function(scope, elem, attr){
      $ariaFns.ariaDisabled(scope, elem, attr);
      $ariaFns.ariaRequired(scope, elem, attr);
    }
  };
}]).directive('select', ['$ariaFns', function($ariaFns){
  return{
    restrict: 'E',
    link: function(scope, elem, attr){
      $ariaFns.ariaDisabled(scope, elem, attr);
      $ariaFns.ariaRequired(scope, elem, attr);
      $ariaFns.ariaInvalid(scope, elem, attr);
    }
  };
}]);