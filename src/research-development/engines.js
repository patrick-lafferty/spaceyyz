(function () {
	'use strict';

	angular
		.module('spaceyyz')
		.component('researchEngine', {
			templateUrl: 'src/research-development/engines.html',
			controller: Engines
		});

	function Engine() {

		this.name = '';
		this.isp = {
			seaLevel: 0,
			vacuum: 0
		};

		this.thrust = {
			seaLevel: 0,
			vacuum: 0
		};

		this.description = '';

	}

	Engines.$inject = ['engineFactory', '$scope', '$timeout', '$uibModal'];
	function Engines(engineFactory, $scope, $timeout, $uibModal) {
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

		this.editEngine = function (engine) {
			engine.beingEdited = true;
		};

		this.cancelEditEngine = function (engine) {
			engine.beingEdited = false;
		};

		this.saveEngine = function (engine) {
			if (!engine.beingEdited) {
				return;
			}

			engine.beingEdited = false;

			engineFactory.updateEngine(engine);

			var index = self.engines.all.findIndex(function (e) { return e.name === engine.name;});

			self.engines.all[index] = engine;
		};

		self.modalInstance = {};
		this.deleteEngine = function (engine) {
			self.modalInstance = $uibModal.open({
				ariaLabelledBy: 'modal-title',
				ariaDescribedBy: 'modal-body',
				component: 'confirmEngineDeleteModal',
				backdrop: 'static',
				resolve: {
					engine: function () {
						return engine;
					}
				}
			});

			self.modalInstance.result.then(function (engine) {
				engineFactory.deleteEngine(engine);
				self.engines.all.splice(self.engines.all.indexOf(engine), 1);
			});
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
