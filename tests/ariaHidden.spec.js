describe('ariaHiddenAttr', function(){
  var tmpl = "<span ng-show=\"val\"></span><span ng-hide=\"!val\"></span>";
  describe('basic', function(){
    setupModule();
    it('Set visible on ngShow/Hide',inject(function($rootScope, $compile){
      $rootScope.val = true;
      element = $compile(tmpl)($rootScope);
      $rootScope.$digest();
      expectAriaAttr('aria-hidden', 'false');
    }));

    it('Set invisible on ngShow/Hide',inject(function($rootScope, $compile){
      $rootScope.val = false;
      element = $compile(tmpl)($rootScope);
      $rootScope.$digest();
      expectAriaAttr('aria-hidden', 'true');
    }));  
  });
  
  describe('dynamic', function(){
    setupModule();
    it('Set visible to invisible on ngShow/Hide dynamically', inject(function($rootScope, $compile){
      $rootScope.val = false;
      element = $compile(tmpl)($rootScope);
      $rootScope.$digest();
      expectAriaAttr('aria-hidden', 'true');
      
      $rootScope.val = true;
      $rootScope.$digest();
      expectAriaAttr('aria-hidden', 'false');
    }));

    it('Set invisible to visible on ngShow/Hide dynamically', inject(function($rootScope, $compile){
      $rootScope.val = true;
      element = $compile(tmpl)($rootScope);
      $rootScope.$digest();
      expectAriaAttr('aria-hidden', 'false');
      
      $rootScope.val = false;
      $rootScope.$digest();
      expectAriaAttr('aria-hidden', 'true');
    }));
  })
  
  describe('disabled', function(){
    setupModule({
      ariaHidden: false
    });
    it('Set not work with ariaDiabled config is set to false', inject(function($rootScope, $compile){
      $rootScope.val = false;
      element = $compile(tmpl)($rootScope);
      $rootScope.$digest();
      expectAriaAttr('aria-hidden', undefined);
    }));
  });
});
