/* UserFactory is a wrapper around accessing the user account from firebase
 * */
(function() {
	'use strict';

	angular
		.module('spaceyyz')
		.factory('userFactory', UserFactory);

	function UserFactory($state) {
		var self = this;
		this.email = "";
		this.password = "";

		this.authChangeSubscribers = {};
		this.onAuthChange = function(subscriber, f) {
			self.authChangeSubscribers[subscriber] = f;
		};

		var factory = {
			email: this.email,
			user: {
				email: "" 
			},
			getEmail: getEmail,
			login: login,
			logout: logout,
			register: register,
			onAuthChange: self.onAuthChange
		};

		if (firebase.auth().currentUser) {
			factory.user.email = firebase.auth().currentUser.email;
		}

		firebase.auth().onAuthStateChanged(function (user) {
			if (user) {
				factory.user.email = user.email;
			} else {
				factory.user.email = "";
			}

			Object.keys(self.authChangeSubscribers).forEach(function (key) {
				self.authChangeSubscribers[key](user);
			});

		});

		function getEmail() {
			return this.factory.user.email;
		}

		function login(email, password) {//, theny) {

			return firebase.auth()
				.signInWithEmailAndPassword(email, password).catch(function (error) {
					alert("Error logging in: " + error.code + ", " + error.message);
				});
				//.then(theny());
		};

		function logout() {
			firebase.auth().signOut().then(function() {
				factory.user.email = "";
				$state.go('home', {}, {reload: true});
			}, function(error) {
				alert("error logging out: " + error);});	
		};

		function register(email, password) {

			firebase.auth()
				.createUserWithEmailAndPassword(email, password).catch(function (error) {
					alert("Error registering: " + error.code + ", " + error.message);
				});
		};

		return factory;
	}

})();
