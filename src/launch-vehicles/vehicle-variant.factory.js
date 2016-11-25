(function() {
	'use strict';

	angular
		.module('spaceyyz')
		.factory('variantFactory', VehicleVariantFactory);

	function VehicleVariantFactory() {

		var self = this;

		var configuration = {
			//need stages, engines
			//perhaps inventoryfactory should hold rocket families, which store
			//all of the possible stages and engines
			//a configuration is then one complete set of stages
		};

		function getFamilies() {
			return firebase.database().ref().child("variants").once('value').then(function (snapshot) {
				var familyObject = snapshot.val();
				var families = [];

				if (familyObject !== null) {
					Object.keys(familyObject).forEach(function (key) {
						var family = familyObject[key];
						var variants = [];

						Object.keys(family).forEach(function (variantKey) {
							var variant = family[variantKey];
							variant.key = variantKey;
							variants.push(variant);
						});

						family.variants = variants;
						family.key = key;

						families.push(family);
					});
				}

				return families;
			});
		}
		/*function getVariants(family) {

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
		}*/

		/*function getVehicle(name, then) {
			getVehicles().then(function(vehicles) {
				then(vehicles.vehicles.filter(function(vehicle) {
					return vehicle.nameWithoutSpaces == name;
				})[0]);
			});
		}*/

		function addVariant(variant, familyKey) {
			var stages = variant.stages.map(function (stage) {
				return {
					name: stage.name,
					engines: stage.engines.map(function (engine) {
						return engine.key;
					})
				}
			});

			firebase.database().ref().child("variants/" + familyKey).push({
				name: variant.name,
				capacity: variant.capacity,
				cost: variant.cost,
				description: variant.description,
				stages: stages
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

		function replaceVariants(familyKey, variants) {
			firebase.database().ref().child("variants/" + familyKey).remove();

			variants.forEach(function (variant) {
				addVariant(variant, familyKey);
			});
		}

		return {
			getFamilies: getFamilies,
			addVariant: addVariant,
			replaceVariants: replaceVariants
		};
	}
})();
