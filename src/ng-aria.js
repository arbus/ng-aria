angular.module('ngAria', []).factory('$aria', [function(){
  var defaultConfig = {
    ariaHidden : true,
    ariaChecked: true
  };
  var currentConfig = {
    ariaHidden : false,
    ariaChecked: false
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
    }
  }
}]);