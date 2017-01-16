angular.module('wtm.directives', [])

.directive('wtmTukDirective', function() {
  return {
    restrict : 'EA',
    scope : { headertxt : '=' },
    template : '{{headertxt}}',
  };
});

