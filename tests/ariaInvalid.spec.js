describe('ariaInvalidAttr', function(){
  var tmpl = "<input ng-model='input' ng-minlength='10'>"+
              "<textarea ng-model='input' ng-minlength='10'></textarea>";
  describe('basic', function(){
    setupModule();
    it('should set invalid when the element is invalid', inject(function($rootScope, $compile){
      element = $compile(tmpl)($rootScope);
      $rootScope.input = 'abcd';
      $rootScope.$digest();
      expectAriaAttr('aria-invalid', 'true');
    }));

    it('should set valid when the element is valid', inject(function($rootScope, $compile){
      element = $compile(tmpl)($rootScope);
      $rootScope.input = 'abcdefghij';
      $rootScope.$digest();
      expectAriaAttr('aria-invalid', 'false');
    }));
  });

  describe('dynamic', function(){
    setupModule();
    it('should set an element from invalid to valid', inject(function($rootScope, $compile){
      element = $compile(tmpl)($rootScope);
      $rootScope.input = 'abcd';
      $rootScope.$digest();
      expectAriaAttr('aria-invalid', 'true');

      $rootScope.input = 'abcdefghij';
      $rootScope.$digest();
      expectAriaAttr('aria-invalid', 'false');
    }));

    it('should set an element from valid to invalid', inject(function($rootScope, $compile){
      element = $compile(tmpl)($rootScope);
      $rootScope.input = 'abcdefghij';
      $rootScope.$digest();
      expectAriaAttr('aria-invalid', 'false');

      $rootScope.input = 'abcd';
      $rootScope.$digest();
      expectAriaAttr('aria-invalid', 'true');
    }));
  });

  describe('disabled', function(){
    setupModule({
      ariaInvalid: false
    });
    it('should not set the arrtibute when disabled via config', inject(function($rootScope, $compile){
      element = $compile(tmpl)($rootScope);
      $rootScope.input = 'abcdefghij';
      $rootScope.$digest();
      expectAriaAttr('aria-invalid', undefined);
    }));
  });

});