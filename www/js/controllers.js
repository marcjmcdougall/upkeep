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

.controller('ContactsCtrl', function($scope, $cordovaSms, contacts) {
  
  $scope.contacts = contacts.list;
  $scope.listCanSwipe = true;

  $scope.sendSMS = function(id, number, message){

    // Check to ensure that the device is ready...
    document.addEventListener("deviceready", function () {
      
      console.log(message);

      var options = {

        // Use the native Android SMS app.
        android: { intent: 'INTENT' }      
      };

      $cordovaSms.send(number, message, options).then(function() {

        // Success! Update rapport.
        $scope.contacts[id].rapport++;

      }, function(error) {

        // Handle the error.  Currently, we just log it.
        console.log(error);
      });

    });
  }

  $scope.removeContact = function(id){

    console.log('Removing contact: ' + id + ' now.');
    contacts.remove(id);
  }

  $scope.notify = function(message){

    console.log(message);
  }

  $scope.addFiveNewUsers = function(){

    contacts.add('James', 'james@gmail.com', '4073467303', 'James is a cool guy.');
    contacts.add('Paul', 'paul@gmail.com', '4073333333', 'Paul is a cool guy.');
    contacts.add('Rupert', 'rupert@gmail.com', '4074444444', 'Rupert is a cool guy.');
    contacts.add('Sammy', 'sammy@gmail.com', '4076666666', 'Sammy is a cool girl.');
    contacts.add('Lexi', 'lexi@gmail.com', '4075555555', 'Lexi is a cool girl.');

  }

})

.controller('PlaylistCtrl', function($scope, $stateParams) {


})

.controller('NewCtrl', function($scope, $state, $ionicHistory, contacts){

  $scope.contactName = '';
  $scope.contactEmail = '';
  $scope.contactPhone = '';
  $scope.contactNote = '';

  $scope.tryAddNewContact = function(name, email, phone, note){

    contacts.add(name, email, phone, note);

    $ionicHistory.nextViewOptions({

      disableBack: true
    });

    $state.go('app.contacts');
  }

 })

 .factory('contacts', function(){

  var contacts = {};

  if(window.localStorage['contacts']){

    contacts = angular.fromJson(window.localStorage['contacts']);
  }
  else{

    contacts.list = [];
  }

  contacts.add = function(name, email, phone, note){

    // Generates the new contact.  Note that the id consists of a mashup between
    // simply the users phone number and a random number between 1 and 1,000,000.
    contacts.list.push({id: phone + '-' + Math.floor((Math.random() * 1000000) + 1), name: name, email: email, phone: phone, note: note, rapport: 0});

    contacts.save();
  };

  contacts.get = function(id){

    return contacts.list[id];
  }

  contacts.update = function(id, name, email, phone, note){

    contacts[id].name = name;
    contacts[id].email = email;
    contacts[id].phone = phone;
    contacts[id].note = note;  

    contacts.save();  
  }

  contacts.remove = function(id){

    for(var i = 0; i < contacts.list.length; i++){

      // console.log('Comparing ' + id + ' to ' + contacts.get(i).id + '\n================');

      if(contacts.get(i).id === id){

        contacts.list.splice(i, 1);
        break;
      }
    }

    contacts.save();
  }

  contacts.save = function(){

    window.localStorage['contacts'] = angular.toJson(contacts);
  }

  return contacts;
 });
