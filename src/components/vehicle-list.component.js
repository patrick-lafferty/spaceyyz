(function() {
	'use strict';
	
	angular
		.module('spaceyyz')
		.component('vehicleList', {
			templateUrl: 'src/components/vehicle-list.component.html',
			controller: Vehicles 
		});	

	function Vehicles() {
		this.vehicles = ['SLS', 'Falcon'];
	}
})();
