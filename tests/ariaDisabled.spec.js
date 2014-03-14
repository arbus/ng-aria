describe('ariaDisabledAttr', function(){
  var tmpl = "<input ng-disabled='val'>"+
            "<textarea ng-disabled='val'></textarea>"+
            "<button ng-disabled='val'></button>"+
            "<select ng-disabled='val'></select>";
  describe('basic', function(){
    setupModule();
    it('should set disabled on ngDisabled', inject(function($rootScope, $compile){
      $rootScope.val = true;
      element = $compile(tmpl)($rootScope);
      $rootScope.$digest();
      expectAriaAttr('aria-disabled', 'true');
    }));

    it('should not set disabled attribute when not disabled', inject(function($rootScope, $compile){
      $rootScope.val = false;
      element = $compile(tmpl)($rootScope);
      $rootScope.$digest();
      expectAriaAttr('aria-disabled', 'false');
    }));
  });

  describe('dynamic', function(){
    setupModule();
    it('should go from disbled to enabled', inject(function($rootScope, $compile){
      $rootScope.val = true;
      element = $compile(tmpl)($rootScope);
      $rootScope.$digest();
      expectAriaAttr('aria-disabled', 'true');
      $rootScope.val = false;
      $rootScope.$digest();
      expectAriaAttr('aria-disabled', 'false');
    }));
  
    it('should go from enabled to disabled', inject(function($rootScope, $compile){
      $rootScope.val = false;
      element = $compile(tmpl)($rootScope);
      $rootScope.$digest();
      expectAriaAttr('aria-disabled', 'false');
      $rootScope.val = true;
      $rootScope.$digest();
      expectAriaAttr('aria-disabled', 'true');
    }));
  });

  describe('disabled', function(){
    setupModule({
      ariaDisabled: false
    });
    it('should not set ariaDisabled with configured not to', inject(function($rootScope, $compile){
      $rootScope.val = false;
      element = $compile(tmpl)($rootScope);
      $rootScope.$digest();
      expectAriaAttr('aria-disabled', undefined);
    }));
  });
});