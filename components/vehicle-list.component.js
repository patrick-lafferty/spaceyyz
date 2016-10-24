(function() {
	'use strict';
	
	angular
		.module('spaceyyz')
		.component('vehicleList', {
			templateUrl: 'components/vehicle-list.component.html',
			controller: Vehicles 
		});	

	function Vehicles() {
		this.vehicles = ["SLS", "Falcon"];
	}
})();
