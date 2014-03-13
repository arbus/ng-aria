describe('ariaDisabledAttr', function(){
  var element;
  beforeEach(module('ngAria'));

  describe('basic', function(){
    beforeEach(inject(function($aria){
      $aria.enable();
    }));

    it('should set disabled on ngDisabled', inject(function($rootScope, $compile){
      var tmpl = "<div ng-init='val = true'>"+
                  "<input ng-disabled='val'>"+
                  "<textarea ng-disabled='val'></textarea>"+
                  "<button ng-disabled='val'></button>"+
                  "<select ng-disabled='val'></select>"+
                "</div>";
      element = $compile(tmpl)($rootScope);
      $rootScope.$digest();
      var input = angular.element(element[0]).find('input');
      var textarea = angular.element(element[0]).find('textarea');
      var button = angular.element(element[0]).find('button');
      var select = angular.element(element[0]).find('select');
      
      expect(input.attr('aria-disabled')).toBe('true');
      expect(textarea.attr('aria-disabled')).toBe('true');
      expect(button.attr('aria-disabled')).toBe('true');
      expect(select.attr('aria-disabled')).toBe('true');
    }));

    it('should not set disabled when not disabled', inject(function($rootScope, $compile){
      var tmpl = "<div ng-init='val = false'>"+
                  "<input ng-disabled='val'>"+
                  "<textarea ng-disabled='val'></textarea>"+
                  "<button ng-disabled='val'></button>"+
                  "<select ng-disabled='val'></select>"+
                "</div>";
      element = $compile(tmpl)($rootScope);
      $rootScope.$digest();
      var input = angular.element(element[0]).find('input');
      var textarea = angular.element(element[0]).find('textarea');
      var button = angular.element(element[0]).find('button');
      var select = angular.element(element[0]).find('select');
      
      expect(input.attr('aria-disabled')).toBe('false');
      expect(textarea.attr('aria-disabled')).toBe('false');
      expect(button.attr('aria-disabled')).toBe('false');
      expect(select.attr('aria-disabled')).toBe('false');
    }));
  });

  describe('dynamic', function(){
    beforeEach(inject(function($aria){
      $aria.enable();
    }));

    it('should go from disbled to enabled', inject(function($rootScope, $compile){
      var tmpl = "<div ng-init='val = true'>"+
                  "<input ng-disabled='val'>"+
                  "<textarea ng-disabled='val'></textarea>"+
                  "<button ng-disabled='val'></button>"+
                  "<select ng-disabled='val'></select>"+
                "</div>";
      element = $compile(tmpl)($rootScope);
      $rootScope.$digest();
      var input = angular.element(element[0]).find('input');
      var textarea = angular.element(element[0]).find('textarea');
      var button = angular.element(element[0]).find('button');
      var select = angular.element(element[0]).find('select');
      
      expect(input.attr('aria-disabled')).toBe('true');
      expect(textarea.attr('aria-disabled')).toBe('true');
      expect(button.attr('aria-disabled')).toBe('true');
      expect(select.attr('aria-disabled')).toBe('true');

      $rootScope.val = false;
      $rootScope.$digest();
      expect(input.attr('aria-disabled')).toBe('false');
      expect(textarea.attr('aria-disabled')).toBe('false');
      expect(button.attr('aria-disabled')).toBe('false');
      expect(select.attr('aria-disabled')).toBe('false');
    }));
  
    it('should go from enabled to disabled', inject(function($rootScope, $compile){
      var tmpl = "<div ng-init='val = false'>"+
                  "<input ng-disabled='val'>"+
                  "<textarea ng-disabled='val'></textarea>"+
                  "<button ng-disabled='val'></button>"+
                  "<select ng-disabled='val'></select>"+
                "</div>";
      element = $compile(tmpl)($rootScope);
      $rootScope.$digest();
      var input = angular.element(element[0]).find('input');
      var textarea = angular.element(element[0]).find('textarea');
      var button = angular.element(element[0]).find('button');
      var select = angular.element(element[0]).find('select');
      
      expect(input.attr('aria-disabled')).toBe('false');
      expect(textarea.attr('aria-disabled')).toBe('false');
      expect(button.attr('aria-disabled')).toBe('false');
      expect(select.attr('aria-disabled')).toBe('false');

      $rootScope.val = true;
      $rootScope.$digest();

      expect(input.attr('aria-disabled')).toBe('true');
      expect(textarea.attr('aria-disabled')).toBe('true');
      expect(button.attr('aria-disabled')).toBe('true');
      expect(select.attr('aria-disabled')).toBe('true');
    }));
  });

  describe('disabled', function(){
    beforeEach(inject(function($aria){
      $aria.setConfig({
        ariaDisabled: false
      });
    }));

    it('should not set ariaDisabled with configured not to', inject(function($rootScope, $compile){
      var tmpl = "<div ng-init='val = false'>"+
                  "<input ng-disabled='val'>"+
                  "<textarea ng-disabled='val'></textarea>"+
                  "<button ng-disabled='val'></button>"+
                  "<select ng-disabled='val'></select>"+
                "</div>";
      element = $compile(tmpl)($rootScope);
      $rootScope.$digest();
      var input = angular.element(element[0]).find('input');
      var textarea = angular.element(element[0]).find('textarea');
      var button = angular.element(element[0]).find('button');
      var select = angular.element(element[0]).find('select');

      expect(input.attr('aria-disabled')).toBe(undefined);
      expect(textarea.attr('aria-disabled')).toBe(undefined);
      expect(button.attr('aria-disabled')).toBe(undefined);
      expect(select.attr('aria-disabled')).toBe(undefined);
    }));

  });

});