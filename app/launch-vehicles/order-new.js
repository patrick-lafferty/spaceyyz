(function() {
	'use strict';

	angular
		.module('spaceyyz')
		.component('orderLaunchVehicle', {
			templateUrl: 'launch-vehicles/order-new.html',
			controller: OrderLaunchVehicle 
		});	

	function OrderLaunchVehicle() {
		this.primaries = [
			{name: "Earth", satellites: ["None", "Moon"], selectedSatellite: "None"},
			{name: "Mars", satellites: ["None", "Phobos", "Deimos"], selectedSatellite: "None"}
		];

		this.selectedPrimary = this.primaries[0];
	}
})();
