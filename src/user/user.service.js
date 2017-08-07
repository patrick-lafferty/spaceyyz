/* UserService is a wrapper around accessing the user account from firebase
 * */
import angular from 'angular';
class UserService {

	constructor($state) {
		this.$state = $state;
		this.email = '';
		this.password = '';
		this.authChangeSubscribers = {};

		if (firebase.auth().currentUser) {
			this.email = firebase.auth().currentUser.email;
		}

		firebase.auth().onAuthStateChanged((user) => {
			if (user) {
				this.email = user.email;
			} else {
				this.email = '';
			}

			Object.keys(this.authChangeSubscribers).forEach((key) => {
				this.authChangeSubscribers[key](user);
			});

		});
	}

	static get $inject() {
		return ['$state'];
	}

	onAuthChange(subscriber, f) {
		this.authChangeSubscribers[subscriber] = f;
	}

	getEmail() {
		return this.email;
	}

	login(email, password) {

		return firebase.auth()
			.signInWithEmailAndPassword(email, password).catch(function (error) {
				alert('Error logging in: ' + error.code + ', ' + error.message);
			});
	}

	logout() {
		firebase.auth().signOut().then(() => {
			this.email = '';
			this.$state.go('login', {}, {reload: true});
		}, function(error) {
			alert('error logging out: ' + error);
		});	
	}

	register(email, password) {

		return firebase.auth().createUserWithEmailAndPassword(email, password);
	}

}

const service = angular
	.module('spaceyyz.user.service', [])
	.service('userService', UserService)
	.name;

export default service;
