import angular from 'angular';

const about = angular
		.module('spaceyyz.about', [])
		.component('about', {
			templateUrl: 'src/about.html',
			controller: About
		})
		.name;

export default about;

function About() {
}
