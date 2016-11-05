(function() {
	'use strict';

	angular
		.module('spaceyyz')
		.factory('vehicleVariantFactory', VehicleVariantFactory);

	function VehicleVariantFactory() {

		var self = this;

		var configuration = {
			//need stages, engines
			//perhaps inventoryfactory should hold rocket families, which store
			//all of the possible stages and engines
			//a configuration is then one complete set of stages
		};

		var configurations = {
			"Atlas V" : [atlas402, atlas501, atlas541, atlas552]
		}

		function getVariants(family) {

			return firebase.database().ref().child("variants").orderByChild('family').equalTo(family).once('value').then(function(snapshot) {
				var variantObject = snapshot.val();
				var variants = [];

				Object.keys(variantObject).forEach(function (key) {
					var object = variantObject[key];
					object.key = key;
					variants.push(object);
				});

				return variants;
			});
		}

		/*function getVehicle(name, then) {
			getVehicles().then(function(vehicles) {
				then(vehicles.vehicles.filter(function(vehicle) {
					return vehicle.nameWithoutSpaces == name;
				})[0]);
			});
		}*/

		function addVariant(variant, familyKey) {
			firebase.database().ref().child("variants/" + familyKey).push({
				name: variant.name,
				stages: variant.stages
			});
		}

		function updateVariant(variant, familyKey)
		{
			firebase.database().ref().child("variants/" + familyKey + "/" + variant.key).set({
				name: variant.name,
				stages: variant.stages
			});
		}

		function deleteVariant(variant, familyKey)
		{
			firebase.database().ref().child("variants/" + familyKey + "/" + variant.key).remove();
		}

		return self;

	}
})();
