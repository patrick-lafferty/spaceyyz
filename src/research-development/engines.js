(function () {
	'use strict';

	angular
		.module('spaceyyz')
		.component('researchEngine', {
			templateUrl: 'src/research-development/engines.html',
			controller: Engines
		});

	function Engine() {

		this.name = "";
		this.isp = {
			seaLevel: 0,
			vacuum: 0
		};

		this.thrust = {
			seaLevel: 0,
			vacuum: 0
		};

		this.description = "";

	}

	Engines.$inject = ['engineFactory', '$scope', '$timeout'];
	function Engines(engineFactory, $scope, $timeout) {
		var self = this;
		this.engines = {all: []};
		this.newEngine = new Engine();

		this.addEngine = function (newEngine) {
			if (!newEngine.name
				|| newEngine.isp.seaLevel <= 0
				|| newEngine.isp.vacuum <= 0
				|| newEngine.thrust.seaLevel <= 0
				|| newEngine.thrust.vacuum <= 0
				|| !newEngine.description) {
					return;
			}

			engineFactory.addEngine(newEngine);
			this.engines.all.push(newEngine);
			this.newEngine = new Engine();
		};

		engineFactory.getEngines().then(function (engines) {
			self.engines.all = engines;

			$timeout(function() {
				$scope.$apply();
			});
		});

		return this;
	}
})();
