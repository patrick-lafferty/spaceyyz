(function () {
	'use strict';

	angular
		.module('spaceyyz')
		.factory('spaceportFactory', SpaceportFactory);

	function SpaceportFactory() {

		function getSpaceports() {
			return firebase.database().ref().child('spaceports').once('value')
				.then(function (snapshot) {
					var spaceportObject = snapshot.val();
					var spaceports = [];
					var all = [];

					Object.keys(spaceportObject).forEach(function (key) {
						var continent = [];
						Object.keys(spaceportObject[key]).forEach(function (k) {
							var spaceport = spaceportObject[key][k];
							spaceport.key = k;
							spaceport.continent = key;
							continent.push(spaceport);
							all.push(spaceport);
						});

						spaceports[key] = continent;
					});

					spaceports.all = all;

					return spaceports;
				});
		}

		function addSpaceport(spaceport) {
			var key = firebase.database().ref().child('spaceports/' + spaceport.continent).push(
				{
					name: spaceport.name,
					country: spaceport.country
				}).key;
			spaceport.key = key;
		}

		function updateSpaceport(spaceport) {
			firebase.database().ref().child('spaceports/' + spaceport.continent + '/' + spaceport.key).set({
				name: spaceport.name,
				country: spaceport.country
			});
		}

		function deleteSpaceport(spaceport) {
			firebase.database().ref().child('spaceports/' + spaceport.continent + '/' + spaceport.key).remove();			
		}
		
		return {
			getSpaceports: getSpaceports,
			addSpaceport: addSpaceport,
			updateSpaceport: updateSpaceport,
			deleteSpaceport: deleteSpaceport
		};
	}
})();
