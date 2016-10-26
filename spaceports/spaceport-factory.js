(function () {
	'use strict';

	angular
		.module('spaceyyz')
		.factory('spaceportFactory', SpaceportFactory);

	function SpaceportFactory() {

		function getSpaceports() {
			return firebase.database().ref().child("spaceports").once('value')
				.then(function (snapshot) {
					var spaceportObject = snapshot.val();
					var spaceports = [];

					Object.keys(spaceportObject).forEach(function (key) {
						var continent = [];
						Object.keys(spaceportObject[key]).forEach(function (k) {
							var spaceport = spaceportObject[key][k];
							spaceport.key = k;
							spaceport.continent = key;
							continent.push(spaceport);
						});

						spaceports[key] = continent;
					});

					return spaceports;
				});
		}

		function addSpaceport(continent, spaceport) {
			var key = firebase.database().ref().child("spaceports/" + continent).push(
					{
						name: spaceport.name
					}).key;
			spaceport.key = key;
		}
		
		return {
			getSpaceports: getSpaceports,
			addSpaceport: addSpaceport
		};
	}
})();
