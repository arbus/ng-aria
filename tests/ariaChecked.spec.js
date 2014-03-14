describe('ariaCheckedAttr', function(){
  describe('basic', function(){
    setupModule();
    it('Should set a checked box to true if checked', inject(function($rootScope, $compile){
      element = $compile("<input type=\"checkbox\" ng-model=\"val\" ng-init=\"val = true\">")($rootScope);
      $rootScope.$digest();
      expectAriaAttr('aria-checked', 'true');
    }));

    it('Should set a checked box to false if unchecked', inject(function($rootScope, $compile){
      element = $compile("<input type=\"checkbox\" ng-model=\"val\" ng-init=\"val = false\">")($rootScope);
      $rootScope.$digest();
      expectAriaAttr('aria-checked', 'false');
    }));
  });

  describe('dynamic', function(){
    setupModule();
    it('Should set checked to unchecked dynamically', inject(function($rootScope, $compile){
      element = $compile("<input type=\"checkbox\" ng-model=\"val\" ng-init=\"val = true\">")($rootScope);
      $rootScope.$digest();
      expectAriaAttr('aria-checked', 'true');
      $rootScope.val = false;
      $rootScope.$digest();
      expectAriaAttr('aria-checked', 'false');
    }));

    it('Should set unchecked to checked dynamically', inject(function($rootScope, $compile){
      element = $compile("<input type=\"checkbox\" ng-model=\"val\" ng-init=\"val = false\">")($rootScope);
      $rootScope.$digest();
      expectAriaAttr('aria-checked', 'false');
      $rootScope.val = true;
      $rootScope.$digest();
      expectAriaAttr('aria-checked', 'true');
    }));
  });

  describe('disabled', function(){
    setupModule({
      ariaChecked: false
    });
    it('Should not set the aria attribute when the setting is disabled', inject(function($rootScope, $compile){
      element = $compile("<input type=\"checkbox\" ng-model=\"val\" ng-init=\"val = true\">")($rootScope);
      $rootScope.$digest();
      expectAriaAttr('aria-checked', undefined);
    }));
  });
});