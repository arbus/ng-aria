describe('ariaCheckedAttr', function(){
  var element;
  beforeEach(module('ngAria'));

  describe('basic', function(){
    beforeEach(inject(function($aria){
      $aria.enable();
    }));

    it('Should set a checked box to true if checked', inject(function($rootScope, $compile){
      element = $compile("<input type=\"checkbox\" ng-model=\"val\" ng-init=\"val = true\">")($rootScope);
      $rootScope.$digest();
      expect(angular.element(element[0]).attr('aria-checked')).toBe('true');
    }));

    it('Should set a checked box to false if unchecked', inject(function($rootScope, $compile){
      element = $compile("<input type=\"checkbox\" ng-model=\"val\" ng-init=\"val = false\">")($rootScope);
      $rootScope.$digest();
      expect(angular.element(element[0]).attr('aria-checked')).toBe('false');
    }));
  });

  describe('dynamic', function(){
    beforeEach(inject(function($aria){
      $aria.enable();
    }));
    it('Should set checked to unchecked dynamically', inject(function($rootScope, $compile){
      element = $compile("<input type=\"checkbox\" ng-model=\"val\" ng-init=\"val = true\">")($rootScope);
      $rootScope.$digest();
      expect(angular.element(element[0]).attr('aria-checked')).toBe('true');
      $rootScope.val = false;
      $rootScope.$digest();
      expect(angular.element(element[0]).attr('aria-checked')).toBe('false');
    }));

    it('Should set unchecked to checked dynamically', inject(function($rootScope, $compile){
      element = $compile("<input type=\"checkbox\" ng-model=\"val\" ng-init=\"val = false\">")($rootScope);
      $rootScope.$digest();
      expect(angular.element(element[0]).attr('aria-checked')).toBe('false');
      $rootScope.val = true;
      $rootScope.$digest();
      expect(angular.element(element[0]).attr('aria-checked')).toBe('true');
    }));
  });

  describe('disabled', function(){
    beforeEach(inject(function($aria){
      $aria.setConfig({
        ariaChecked: false
      });
    }));

    it('Should not set the aria attribute when the setting is disabled', inject(function($rootScope, $compile){
      element = $compile("<input type=\"checkbox\" ng-model=\"val\" ng-init=\"val = true\">")($rootScope);
      $rootScope.$digest();
      expect(angular.element(element[0]).attr('aria-checked')).toBe(undefined);
    }));
  });

});