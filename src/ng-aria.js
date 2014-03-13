angular.module('ngAria', []).factory('$aria', [function(){
  var defaultConfig = {
    ngShowHide : true
  };
  var currentConfig = {
    ngShowHide : false
  };
  var currentWatchers = [];
  return{
    enable: function(config){
      if(angular.isDefined(config)){
        this.setConfig(config);
      }else{
        currentConfig = defaultConfig;
      }
    },
    disable: function(){
      for(var i = 0; i < currentWatchers.length; i++){
        currentWatchers[i]();
      }
    },
    setConfig: function(config){
      currentConfig = angular.extend(defaultConfig, config);
    },
    getConfig : function(){
      return currentConfig;
    },
    addWatchExpr: function(expr){
      currentWatchers.push(expr);
    }
  };
}]).factory('$ariaFns', ['$aria', function($aria){
  return {
    ariaHidden: function(scope, elem, attr){
      $aria.addWatchExpr(scope.$watch(function(){
        return elem.attr('class');
      }, function(){
        if(elem.hasClass('ng-hide')){
          elem.attr('aria-hidden', 'true');
        }else{
          elem.attr('aria-hidden', 'false');
        }  
      }));
    }
  };
}]).directive('ngShow', ['$ariaFns', function($ariaFns){
  return $ariaFns.ariaHidden;
}]).directive('ngHide', ['$ariaFns', function($ariaFns){
  return $ariaFns.ariaHidden;
}]);