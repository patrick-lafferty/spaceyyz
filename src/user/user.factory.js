/* UserFactory is a wrapper around accessing the user account from firebase
 * */
import angular from 'angular';

const factory = angular
	.module('spaceyyz.user.factory', [])
	.factory('userFactory', UserFactory)
	.name;

export default factory;

	UserFactory.$inject = ['$state'];
	function UserFactory($state) {
		var self = this;
		var factory = {
			email: this.email,
			user: {
				email: ''
			},
			getEmail: getEmail,
			login: login,
			logout: logout,
			register: register,
			onAuthChange: onAuthChange
		};

		this.email = '';
		this.password = '';

		this.authChangeSubscribers = {};

		if (firebase.auth().currentUser) {
			factory.user.email = firebase.auth().currentUser.email;
		}

		firebase.auth().onAuthStateChanged(function (user) {
			if (user) {
				factory.user.email = user.email;
			} else {
				factory.user.email = '';
			}

			Object.keys(self.authChangeSubscribers).forEach(function (key) {
				self.authChangeSubscribers[key](user);
			});

		});

		function onAuthChange(subscriber, f) {
			self.authChangeSubscribers[subscriber] = f;
		}

		function getEmail() {
			return self.factory.user.email;
		}

		function login(email, password) {

			return firebase.auth()
				.signInWithEmailAndPassword(email, password).catch(function (error) {
					alert('Error logging in: ' + error.code + ', ' + error.message);
				});
		}

		function logout() {
			firebase.auth().signOut().then(function() {
				factory.user.email = '';
				$state.go('login', {}, {reload: true});
			}, function(error) {
				alert('error logging out: ' + error);});	
		}

		function register(email, password) {

			return firebase.auth().createUserWithEmailAndPassword(email, password);
		}

		return factory;
	}
