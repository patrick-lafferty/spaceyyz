(function() {
	'use strict';

	angular
		.module('spaceyyz')
		.factory('userFactory', UserFactory);

	function UserFactory() {
		this.email = "";
		this.password = "";


		this.authChangeSubscribers = {};
		this.onAuthChange = function(subscriber, f) {self.authChangeSubscribers[subscriber] = f;}

		var factory = {
			email: this.email,
			user: {
				email: "" 
			},
			getEmail: getEmail,
			login: login,
			logout: logout,
			register: register,
			onAuthChange: this.onAuthChange
		};

		if (firebase.auth().currentUser) {
			//alert("still logged in");
			factory.user.email = firebase.auth().currentUser.email;
		}

		var self = this;
		firebase.auth().onAuthStateChanged(function(user) {
			if (user){
			//alert("auth statechange: " + user.email);

			/*if (user) {
				self.email = user.email;
			} else {
				self.email = "";
			}*/

				factory.user.email = user.email;
			} else {
				//alert("auth state change invalid");
				factory.user.email = "";
			}

			Object.keys(self.authChangeSubscribers).forEach(function(key) {
				self.authChangeSubscribers[key](user);
			});


		});

		//this.getEmail = function() {return this.email;};
		function getEmail() {
			return this.factory.user.email;
		}

		//this.login = function(email, password, then) {
		function login(email, password, theny) {
			//alert("Logging in with: " + email + ", " + password);

			firebase.auth()
				.signInWithEmailAndPassword(email, password).catch(function (error) {
					alert("Error logging in: " + error.code + ", " + error.message);
				})
				.then(theny());
		};

		//this.logout = function() {
		function logout() {
			//alert("logging out");
			firebase.auth().signOut().then(function() {
				//alert("logged out successfully");
				factory.user.email = "";
			}, function(error) {
				alert("error logging out: " + error);});	
		};

		//this.register = function(email, password) {
		function register(email, password) {

			alert("Registering with: " + email + ", " + password);

			firebase.auth()
				.createUserWithEmailAndPassword(email, password).catch(function (error) {
					alert("Error registering: " + error.code + ", " + error.message);
				});
		};


		/*var factory =  {
			email: this.email,
			user: {
				email: self.email
			},
			getEmail: this.getEmail,
			login: this.login,
			logout: this.logout,
			register: this.register,
			onAuthChange: this.onAuthChange
		};*/

		return factory;
	}

})();
