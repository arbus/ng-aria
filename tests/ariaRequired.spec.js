describe('ariaRequiredAttr', function(){
  var validTmpl = "<input required>"+
             "<textarea required></textarea>"+
             "<button required></button>"+
             "<select required></select>";
  var invalidTmpl = "<input>"+
             "<textarea></textarea>"+
             "<button></button>"+
             "<select></select>";
  describe('basic', function(){
    setupModule();
    it('should apply the attribute when requried is set', inject(function($rootScope, $compile){
      element = $compile(validTmpl)($rootScope);
      $rootScope.$digest();
      expectAriaAttr('aria-required', 'true');
    }));

    it('should not apply the attribute when requried is not set', inject(function($rootScope, $compile){
      element = $compile(invalidTmpl)($rootScope);
      $rootScope.$digest();
      expectAriaAttr('aria-required', 'false');
    }));
  });

  describe('dynamic', function(){
    setupModule();
    it('should go from true to false when the attribute is removed', inject(function($rootScope, $compile){
      element = $compile(validTmpl)($rootScope);
      $rootScope.$digest();
      expectAriaAttr('aria-required', 'true');

      element = $compile(invalidTmpl)($rootScope);
      $rootScope.$digest();
      expectAriaAttr('aria-required', 'false');
    }));
    
    it('should go from false to true when the attribute is removed', inject(function($rootScope, $compile){
      element = $compile(invalidTmpl)($rootScope);
      $rootScope.$digest();
      expectAriaAttr('aria-required', 'false');
      
      element = $compile(validTmpl)($rootScope);
      $rootScope.$digest();
      expectAriaAttr('aria-required', 'true');
    }));
  });

  describe('disabled', function(){
    setupModule({
      ariaRequired: false
    });
    it('should not set the attributes when it is not enabled in the config', inject(function($rootScope, $compile){
      element = $compile(validTmpl)($rootScope);
      $rootScope.$digest();
      expectAriaAttr('aria-required', undefined);
    }));
  });
});