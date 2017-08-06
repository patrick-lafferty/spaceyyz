/*
 * EngineFactory is responsible for reading/writing data about rocket engines from firebase
 * */
import angular from 'angular';

class EngineFactory {
	constructor() {
	}

	getEngines () {

		return firebase.database().ref().child('engines').once('value').then(function(snapshot) {

			var engineObject = snapshot.val();
			var engines = [];

			if (engineObject !== null && engineObject !== undefined) {

				Object.keys(engineObject).forEach(function (key) {
					var object = engineObject[key];
					object.key = key;
					engines.push(object);
				});
			}
			
			return engines;
		});
	}

	addEngine(engine) {
		var key = firebase.database().ref().child('engines').push({
			name: engine.name,
			isp: engine.isp,
			thrust: engine.thrust,
			description: engine.description
		});
	}

	updateEngine(engine)
	{
		firebase.database().ref().child('engines/' + engine.key).set({
			name: engine.name,
			isp: engine.isp,
			thrust: engine.thrust,
			description: engine.description
		});
	}

	deleteEngine(engine)
	{
		firebase.database().ref().child('engines/' + engine.key).remove();
	}
}

const engineFactory = angular
	.module('spaceyyz.researchDevelopment.engineFactory', [])
	.factory('engineFactory', EngineFactory)
	.name;

export default engineFactory;