describe('ariaHiddenAttr', function(){
  var element;
  beforeEach(module('ngAria'));

  describe('basic', function(){
    beforeEach(inject(function($aria){
      $aria.enable();
    }));
    it('Set visible on ngShow/Hide',inject(function($rootScope, $compile){
      element = $compile("<div ng-init=\"val = true\"><span ng-show=\"val\"></span><span ng-hide=\"!val\"></span></div>")($rootScope);
      $rootScope.$digest();
      var e1 = angular.element(element[0]).find('span').eq(0);
      var e2 = angular.element(element[0]).find('span').eq(1);
      expect(e1.attr('aria-hidden')).toBe('false');
      expect(e2.attr('aria-hidden')).toBe('false');
    }));

    it('Set invisible on ngShow/Hide',inject(function($rootScope, $compile){
      element = $compile("<div ng-init=\"val = false\"><span ng-show=\"val\"></span><span ng-hide=\"!val\"></span></div>")($rootScope);
      $rootScope.$digest();
      var e1 = angular.element(element[0]).find('span').eq(0);
      var e2 = angular.element(element[0]).find('span').eq(1);
      expect(e1.attr('aria-hidden')).toBe('true');
      expect(e2.attr('aria-hidden')).toBe('true');
    }));  
  });
  
  describe('dynamic', function(){
    beforeEach(inject(function($aria){
      $aria.enable();
    }));
    it('Set visible to invisible on ngShow/Hide dynamically', inject(function($rootScope, $compile){
      element = $compile("<div ng-init=\"val = true\"><span ng-show=\"val\"></span><span ng-hide=\"!val\"></span></div>")($rootScope);
      $rootScope.$digest();
      var e1 = angular.element(element[0]).find('span').eq(0);
      var e2 = angular.element(element[0]).find('span').eq(1);
      expect(e1.attr('aria-hidden')).toBe('false');
      expect(e2.attr('aria-hidden')).toBe('false');
      
      $rootScope.val = false;
      $rootScope.$digest();
      expect(e1.attr('aria-hidden')).toBe('true');
      expect(e2.attr('aria-hidden')).toBe('true');
    }));

    it('Set invisible to visible on ngShow/Hide dynamically', inject(function($rootScope, $compile){
      element = $compile("<div ng-init=\"val = false\"><span ng-show=\"val\"></span><span ng-hide=\"!val\"></span></div>")($rootScope);
      $rootScope.$digest();
      var e1 = angular.element(element[0]).find('span').eq(0);
      var e2 = angular.element(element[0]).find('span').eq(1);
      expect(e1.attr('aria-hidden')).toBe('true');
      expect(e2.attr('aria-hidden')).toBe('true');
      
      $rootScope.val = true;
      $rootScope.$digest();
      expect(e1.attr('aria-hidden')).toBe('false');
      expect(e2.attr('aria-hidden')).toBe('false');
    }));
  })
  
  describe('disabled', function(){
    beforeEach(inject(function($aria){
      $aria.setConfig({
        ariaHidden: false
      });
    }));
    it('Set not work with ariaDiabled config is set to false', inject(function($rootScope, $compile){
      element = $compile("<div ng-init=\"val = false\"><span ng-show=\"val\"></span><span ng-hide=\"!val\"></span></div>")($rootScope);
      $rootScope.$digest();
      var e1 = angular.element(element[0]).find('span').eq(0);
      var e2 = angular.element(element[0]).find('span').eq(1);
      expect(e1.attr('aria-hidden')).toBe(undefined);
      expect(e2.attr('aria-hidden')).toBe(undefined);
    }));
  });
});
