// Vocabulario
// A simple AngularJS / jQuery based vocabulary trainer

// TODO
// * Reverse languages
// * Better messages
// * Better styling

// Change interpolation characters to ensure Jekyll compatability
var vocabularioApp = angular.module('vocabularioApp', [], function($interpolateProvider) {
  $interpolateProvider.startSymbol('[[');
  $interpolateProvider.endSymbol(']]');
});

// Main controller
vocabularioApp.controller('VocabularioFormCtrl', function ($scope) {
  $scope.answer = "";
  $scope.languages = [];
  $scope.vocabularies = [];
  $scope.currentVocabulary = "";
  $scope.completed = "";
  $scope.message = "Done learning? Take a test!";
  $scope.counter = 0;
  $scope.total = 0;
  $scope.errors = 0;
  
  $scope.startTest = function() {
    var vocabulary = "";
    var translations = [];
    
    // Parse vocabularies from table
    $('tbody tr').each(function(i) {
      if (i == 0) {
        $(this).children('th').each(function() {
          $scope.languages.push($(this).text());
        });
      }
      else {
        $(this).children('td').each(function(j) {
          if (j == 0) {
            vocabulary = $(this).text();
            translations = [];
          }
          else {
            translations.push($(this).text());
          }
        });
        $scope.vocabularies[vocabulary] = translations;
      }
      $scope.total = i;
    });
    $scope.remaining = $scope.total;
    $scope.pickNextVocabulary();
  };
  
  // Select random vocabulary for current test
  $scope.pickNextVocabulary = function() {
    $scope.answer = "";
    if ($scope.counter < $scope.total) {
      $scope.counter++;
      var pick = Math.floor((Math.random() * ($scope.total - $scope.counter)));
      var keys = Object.keys($scope.vocabularies);
      $scope.currentVocabulary = keys[pick];
    }
    else {
      $scope.quit();
    }
  };
  
  // Handle answer
  $scope.answerQuestion = function() {
    if ($scope.answer) {
      var translations = $scope.vocabularies[$scope.currentVocabulary];
      if (indexOf.call(translations, $scope.answer) >= 0) {
        $scope.message = "Correct!";
      }
      else {
        $scope.message = "Wrong! Valid answers are: " + translations.join(", ");
        $scope.errors++;
      }
      delete $scope.vocabularies[$scope.currentVocabulary];
      $scope.pickNextVocabulary();
    }
  };
  
  // Cancel test and show results
  $scope.quit = function() {
    var counted = $scope.counter;
    if (counted != $scope.total) { counted--; };
    var correct = counted - $scope.errors;
    $scope.completed = "...and done! " + correct + " / " + counted + " answers correct (" + Math.floor((correct / counted) * 100) + "%).";
  };
  
  // Hide vocabulary list upon starting a new test
  $scope.hideList = function() {
    $('tbody').fadeOut();
  };
  
  // Reload page to reset app
  $scope.reset = function() {
    location.reload();
  };
  
  // Reset test every time page is reloaded
  $scope.$on('$viewContentLoaded', $scope.startTest());
  
});

// Helper functions
var indexOf = function(needle) {
  if (typeof Array.prototype.indexOf === 'function') {
    indexOf = Array.prototype.indexOf;
  }
  else {
    indexOf = function(needle) {
      var i = -1, index = -1;
      for(i = 0; i < this.length; i++) {
        if (this[i] === needle) {
          index = i;
          break;
        }
      }
      return index;
    };
  }
  return indexOf.call(this, needle);
};
