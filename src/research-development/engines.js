import angular from 'angular';

class Engine {
	constructor() {

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
}

class Engines {
	static get $inject() {
		return ['engineService', '$scope', '$timeout', '$uibModal'];
	}

	constructor(engineService, $scope, $timeout, $uibModal) {
		this.engines = {all: []};
		this.newEngine = new Engine();
		this.$uibModal = $uibModal;
		this.modalInstance = {};
		
		engineService.getEngines().then(engines => {
			this.engines.all = engines;

			$timeout(() => $scope.$apply());
		});
	}

	addEngine(newEngine) {
		if (!newEngine.name
			|| newEngine.isp.seaLevel <= 0
			|| newEngine.isp.vacuum <= 0
			|| newEngine.thrust.seaLevel <= 0
			|| newEngine.thrust.vacuum <= 0
			|| !newEngine.description) {
			return;
		}

		this.engineService.addEngine(newEngine);
		this.engines.all.push(newEngine);
		this.newEngine = new Engine();
	}

	editEngine(engine) {
		engine.beingEdited = true;
	}

	cancelEditEngine(engine) {
		engine.beingEdited = false;
	}

	saveEngine(engine) {
		if (!engine.beingEdited) {
			return;
		}

		engine.beingEdited = false;

		this.engineService.updateEngine(engine);

		let index = this.engines.all.findIndex(e => e.name === engine.name);

		this.engines.all[index] = engine;
	}

	deleteEngine(engine) {
		this.modalInstance = this.$uibModal.open({
			ariaLabelledBy: 'modal-title',
			ariaDescribedBy: 'modal-body',
			component: 'confirmEngineDeleteModal',
			backdrop: 'static',
			resolve: {
				engine: () => engine
			}
		});

		this.modalInstance.result.then(engine => {
			this.engineService.deleteEngine(engine);
			this.engines.all.splice(this.engines.all.indexOf(engine), 1);
		});
	}
}

const engines = angular
	.module('spaceyyz.researchDevelopment.engine', [])
	.component('researchEngine', {
		templateUrl: 'src/research-development/engines.html',
		controller: Engines
	})
	.name;

export default engines;