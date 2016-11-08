(function() {
	'use strict';

	angular
		.module('spaceyyz')
		.factory('engineFactory', EngineFactory);

	function EngineFactory() {
		var self = this;

		function getEngines() {

			return firebase.database().ref().child("engines").once('value').then(function(snapshot) {

				var engineObject = snapshot.val();
				var engines = [];

				Object.keys(engineObject).forEach(function (key) {
					var object = engineObject[key];
					object.key = key;
					engines.push(object);
				});
				
				return engines;

			});
		}

		function addEngine(engine) {
			var key = firebase.database().ref().child("engines").push({
				name: engine.name,
				isp: engine.isp,
				thrust: engine.thrust,
				description: engine.description
			});
		}

		function updateEngine(engine)
		{
			firebase.database().ref().child("engines/" + engine.key).set({
				name: engine.name,
				isp: engine.isp,
				thrust: engine.thrust,
				description: engine.description
			});
		}

		function deleteEngine(engine)
		{
			firebase.database().ref().child("engines/" + engine.key).remove();
		}

		return self;

	}
})();
