describe('ariaRequiredAttr', function(){
  var element;
  beforeEach(module('ngAria'));

  describe('basic', function(){
    beforeEach(inject(function($aria){
      $aria.enable();
    }));

    it('should apply the attribute when requried is set', inject(function($rootScope, $compile){
      var tmpl = "<form>"+
                  "<input required>"+
                  "<textarea required></textarea>"+
                  "<button required></button>"+
                  "<select required></select>"+
                 "</form>";
      element = $compile(tmpl)($rootScope);
      $rootScope.$digest();
      var input = angular.element(element[0]).find('input');
      var textarea = angular.element(element[0]).find('textarea');
      var button = angular.element(element[0]).find('button');
      var select = angular.element(element[0]).find('select');

      expect(input.attr('aria-required')).toBe('true');
      expect(textarea.attr('aria-required')).toBe('true');
      expect(button.attr('aria-required')).toBe('true');
      expect(select.attr('aria-required')).toBe('true');
    }));

    it('should not apply the attribute when requried is not set', inject(function($rootScope, $compile){
      var tmpl = "<form>"+
                  "<input>"+
                  "<textarea></textarea>"+
                  "<button></button>"+
                  "<select></select>"+
                 "</form>";
      element = $compile(tmpl)($rootScope);
      $rootScope.$digest();
      var input = angular.element(element[0]).find('input');
      var textarea = angular.element(element[0]).find('textarea');
      var button = angular.element(element[0]).find('button');
      var select = angular.element(element[0]).find('select');

      expect(input.attr('aria-required')).toBe('false');
      expect(textarea.attr('aria-required')).toBe('false');
      expect(button.attr('aria-required')).toBe('false');
      expect(select.attr('aria-required')).toBe('false');
    }));
  });

  describe('dynamic', function(){
    beforeEach(inject(function($aria){
      $aria.enable();
    }));

    it('should go from true to false when the attribute is removed', inject(function($rootScope, $compile){
      var tmpl = "<form>"+
                  "<input required>"+
                  "<textarea required></textarea>"+
                  "<button required></button>"+
                  "<select required></select>"+
                 "</form>";
      element = $compile(tmpl)($rootScope);
      $rootScope.$digest();
      var input = angular.element(element[0]).find('input');
      var textarea = angular.element(element[0]).find('textarea');
      var button = angular.element(element[0]).find('button');
      var select = angular.element(element[0]).find('select');

      expect(input.attr('aria-required')).toBe('true');
      expect(textarea.attr('aria-required')).toBe('true');
      expect(button.attr('aria-required')).toBe('true');
      expect(select.attr('aria-required')).toBe('true');

      input.removeAttr('required');
      textarea.removeAttr('required');
      button.removeAttr('required');
      select.removeAttr('required');
      $rootScope.$digest();

      expect(input.attr('aria-required')).toBe('false');
      expect(textarea.attr('aria-required')).toBe('false');
      expect(button.attr('aria-required')).toBe('false');
      expect(select.attr('aria-required')).toBe('false');
    }));
    
    it('should go from false to true when the attribute is removed', inject(function($rootScope, $compile){
      var tmpl = "<form>"+
                  "<input>"+
                  "<textarea></textarea>"+
                  "<button></button>"+
                  "<select></select>"+
                 "</form>";
      element = $compile(tmpl)($rootScope);
      $rootScope.$digest();
      var input = angular.element(element[0]).find('input');
      var textarea = angular.element(element[0]).find('textarea');
      var button = angular.element(element[0]).find('button');
      var select = angular.element(element[0]).find('select');

      expect(input.attr('aria-required')).toBe('false');
      expect(textarea.attr('aria-required')).toBe('false');
      expect(button.attr('aria-required')).toBe('false');
      expect(select.attr('aria-required')).toBe('false');

      input.attr('required', 'true');
      textarea.attr('required', 'true');
      button.attr('required', 'true');
      select.attr('required', 'true');
      $rootScope.$digest();

      expect(input.attr('aria-required')).toBe('true');
      expect(textarea.attr('aria-required')).toBe('true');
      expect(button.attr('aria-required')).toBe('true');
      expect(select.attr('aria-required')).toBe('true');
    }));
  });

  describe('disabled', function(){
    beforeEach(inject(function($aria){
      $aria.setConfig({
        ariaRequired: false
      });
    }));

    it('should not set the attributes when it is not enabled in the config', inject(function($rootScope, $compile){
      var tmpl = "<form>"+
                  "<input required>"+
                  "<textarea required></textarea>"+
                  "<button required></button>"+
                  "<select required></select>"+
                 "</form>";
      element = $compile(tmpl)($rootScope);
      $rootScope.$digest();
      var input = angular.element(element[0]).find('input');
      var textarea = angular.element(element[0]).find('textarea');
      var button = angular.element(element[0]).find('button');
      var select = angular.element(element[0]).find('select');

      expect(input.attr('aria-required')).toBe(undefined);
      expect(textarea.attr('aria-required')).toBe(undefined);
      expect(button.attr('aria-required')).toBe(undefined);
      expect(select.attr('aria-required')).toBe(undefined);


    }));
  });
});