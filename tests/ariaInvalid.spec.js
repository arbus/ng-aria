describe('ariaInvalidAttr', function(){
  beforeEach(module('ngAria'));

  describe('basic', function(){
    beforeEach(inject(function($aria){
      $aria.enable();
    }));

    it('should set invalid when the element is invalid', inject(function($rootScope, $compile){
      var tmpl = "<form name='form' novalidate>"+
                  "<input ng-model='input' ng-minlength='10'>"+
                  "<textarea ng-model='input' ng-minlength='10'></textarea>"+
                 "</form>";
      element = $compile(tmpl)($rootScope);
      $rootScope.input = 'abcd';
      $rootScope.$digest();
      var input = angular.element(element[0]).find('input');
      var textarea = angular.element(element[0]).find('textarea');

      expect(input.attr('aria-invalid')).toBe('true');
      expect(textarea.attr('aria-invalid')).toBe('true');
    }));

    it('should set valid when the element is valid', inject(function($rootScope, $compile){
      var tmpl = "<form name='form' novalidate>"+
                  "<input ng-model='input' ng-minlength='3'>"+
                  "<textarea ng-model='input' ng-minlength='3'></textarea>"+
                 "</form>";
      element = $compile(tmpl)($rootScope);
      $rootScope.input = 'abcd';
      $rootScope.$digest();
      var input = angular.element(element[0]).find('input');
      var textarea = angular.element(element[0]).find('textarea');

      expect(input.attr('aria-invalid')).toBe('false');
      expect(textarea.attr('aria-invalid')).toBe('false');
    }));
  });

  describe('dynamic', function(){
    beforeEach(inject(function($aria){
      $aria.enable();
    }));

    it('should set an element from invalid to valid', inject(function($rootScope, $compile){
      var tmpl = "<form name='form' novalidate>"+
                  "<input ng-model='input' ng-minlength='10'>"+
                  "<textarea ng-model='input' ng-minlength='10'></textarea>"+
                 "</form>";
      element = $compile(tmpl)($rootScope);
      $rootScope.input = 'abcd';
      $rootScope.$digest();
      var input = angular.element(element[0]).find('input');
      var textarea = angular.element(element[0]).find('textarea');

      expect(input.attr('aria-invalid')).toBe('true');
      expect(textarea.attr('aria-invalid')).toBe('true');

      $rootScope.input = 'bcdefghijkl';
      $rootScope.$digest();
      
      expect(input.attr('aria-invalid')).toBe('false');
      expect(textarea.attr('aria-invalid')).toBe('false');
    }));

    it('should set an element from valid to invalid', inject(function($rootScope, $compile){
      var tmpl = "<form name='form' novalidate>"+
                  "<input ng-model='input' ng-minlength='10'>"+
                  "<textarea ng-model='input' ng-minlength='10'></textarea>"+
                 "</form>";
      element = $compile(tmpl)($rootScope);
      $rootScope.input = 'bcdefghijkl';
      $rootScope.$digest();
      var input = angular.element(element[0]).find('input');
      var textarea = angular.element(element[0]).find('textarea');

      expect(input.attr('aria-invalid')).toBe('false');
      expect(textarea.attr('aria-invalid')).toBe('false');

      $rootScope.input = 'abcd';
      $rootScope.$digest();
      
      expect(input.attr('aria-invalid')).toBe('true');
      expect(textarea.attr('aria-invalid')).toBe('true');
    }));
  });

  describe('disabled', function(){
    beforeEach(inject(function($aria){
      $aria.setConfig({
        ariaInvalid: false
      });
    }));

    it('should not set the arrtibute when disabled via config', inject(function($rootScope, $compile){
      var tmpl = "<form name='form' novalidate>"+
                  "<input ng-model='input' ng-minlength='10'>"+
                  "<textarea ng-model='input' ng-minlength='10'></textarea>"+
                 "</form>";
      element = $compile(tmpl)($rootScope);
      $rootScope.input = 'abcd';
      $rootScope.$digest();
      var input = angular.element(element[0]).find('input');
      var textarea = angular.element(element[0]).find('textarea');

      expect(input.attr('aria-invalid')).toBe(undefined);
      expect(textarea.attr('aria-invalid')).toBe(undefined);
    }));
  });

});