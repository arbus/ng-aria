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
  }

  var ariaFactory = function(){
    return {
      ariaHidden: function(scope, elem, attr){
        if(currentConfig.ariaHidden){
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
        if(currentConfig.ariaChecked){
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
        if(currentConfig.ariaDisabled){
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
        if(currentConfig.ariaRequired){
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
        if(currentConfig.ariaInvalid){
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
  }

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
  }

  
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