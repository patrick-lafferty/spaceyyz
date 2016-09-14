(function() {
	'use strict';

	angular
		.module('spaceyyz')
		.component('spaceports', {
			templateUrl: 'spaceports/spaceports.html',
			controller: Spaceports,
			bindings: {location: '<'}
		})
		/*.run(function ($rootScope, $state, $stateParams) {
			$rootScope.$state = $state;
			$rootScope.$stateParams = $stateParams;
		});*/
	;

	function Spaceports() {
		//this.location = $state.current.data.location;
		//this.location = location;
		//alert($rootScope.$state.data.location)
		/*$rootScope.$on('$stateChangeSuccess', 
				function(event, toState, toParams, fromState, fromParams) {
				   	//event.preventDefault();
					alert("test");
					console.log(toState.data.location);
			   		this.location = $state.current.data.location;
				}
				);*/		
	}

	//Spaceports.$inject = ['$rootScope'];
})();
