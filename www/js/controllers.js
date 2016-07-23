angular.module('starter.controllers', ['ngCordova'])

.controller('AppCtrl', function($scope, $ionicModal, $timeout) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  // Form data for the login modal
  $scope.loginData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };
})

.controller('PlaylistsCtrl', function($scope, $cordovaSms) {
  $scope.contacts = [
    { name: 'John Sawyer', id: 1 , picture: './img/face.png', rapport: 5, phone: '4073467303'},
    { name: 'Mary Atkins', id: 2, picture: './img/face.png', rapport: 2, phone: '4073467303'},
    { name: 'Susan Thomas', id: 3, picture: './img/face.png', rapport: 9, phone: '4073467303'},
    { name: 'John Summers', id: 4, picture: './img/face.png', rapport: 8, phone: '4073467303'},
    { name: 'Wayne Forrest', id: 5, picture: './img/face.png', rapport: 2, phone: '4073467303'},
    { name: 'Allie Murphy', id: 6, picture: './img/face.png', rapport: 1, phone: '4073467303'},
    { name: 'John Sawyer', id: 1 , picture: './img/face.png', rapport: 5, phone: '4073467303'},
    { name: 'Mary Atkins', id: 2, picture: './img/face.png', rapport: 2, phone: '4073467303'},
    { name: 'Susan Thomas', id: 3, picture: './img/face.png', rapport: 9, phone: '4073467303'},
    { name: 'John Summers', id: 4, picture: './img/face.png', rapport: 8, phone: '4073467303'},
    { name: 'Wayne Forrest', id: 5, picture: './img/face.png', rapport: 2, phone: '4073467303'},
    { name: 'Allie Murphy', id: 6, picture: './img/face.png', rapport: 1, phone: '4073467303'}
  ];

  $scope.sendSMS = function(number, message){

    // Check to ensure that the device is ready...
    document.addEventListener("deviceready", function () {
      
      var options = {

        // Use the native Android SMS app.
        android: { intent: 'INTENT' }      
      };

      $cordovaSms.send(number, message, options).then(function() {

        // Success! Update rapport.

      }, function(error) {

        // Handle the error.  Currently, we just log it.
        console.log(error);
      });

    });
    
  }

})

.controller('PlaylistCtrl', function($scope, $stateParams) {

});
