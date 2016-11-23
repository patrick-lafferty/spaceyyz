var assert = require('chai').assert;
var fb = require('../mocks/firebase');
var firebase = window.firebase = fb.firebase;
var Promise = fb.Promise;

describe('ResearchEngine component for Research&Development menu', function () {

	var engineFactory = {
		getEngines: function () { return new Promise([]);},
		addEngine: function (engine) {},
		updateEngine: function (engine) {},
		deleteEngine: function (engine) {}
		
	};

	var $uibModal = {
		open: function (modal) { 
			return {
				result: new Promise(modal.resolve.engine)
			}
		}
	};

	var engine = {
		name: 'test',
		isp: {
			seaLevel: 262,
			vacuum: 380
		},
		thrust: {
			seaLevel: 4000,
			vacuum: 7000
		},
		description: 'testy test'
	};

	beforeEach(function () {
		angular.mock.module('spaceyyz')
		angular.mock.module(function ($provide) {
			$provide.value('engineFactory', engineFactory);
			$provide.value('$uibModal', $uibModal);
		});
	});

	var $componentController;

	beforeEach(inject(function(_$componentController_) {
		$componentController = _$componentController_;
	}));

	describe('addEngine(engine)', function () {
		var researchEngine;
		beforeEach(function () {
			researchEngine = $componentController('researchEngine');
		});

		it('should exist', function () {
			assert.isDefined(researchEngine.addEngine);
			assert.isFunction(researchEngine.addEngine);
		});

		it('should add engine to collection', function () {
			researchEngine.addEngine(engine);

			assert.lengthOf(researchEngine.engines.all, 1);
			assert.include(researchEngine.engines.all, engine);
		});

	});

	describe('saveEngine(engine)', function () {
		var researchEngine;
		beforeEach(function () {
			researchEngine = $componentController('researchEngine');
		});

		it('should exist', function () {
			assert.isDefined(researchEngine.editEngine);
			assert.isFunction(researchEngine.editEngine);
		});

		it('should save the new values', function () {
			researchEngine.addEngine(engine);
			
			var copy = JSON.parse(JSON.stringify(engine));
			copy.description = "changed";
			
			researchEngine.editEngine(copy);
			researchEngine.saveEngine(copy);

			assert.lengthOf(researchEngine.engines.all, 1);
			assert.include(researchEngine.engines.all, copy);
			assert.notInclude(researchEngine.engines.all, engine);
		});

		it('shouldnt save if engine isnt being edited', function () {
			researchEngine.addEngine(engine);
			
			var copy = JSON.parse(JSON.stringify(engine));
			copy.description = "changed";
			
			researchEngine.saveEngine(copy);

			assert.lengthOf(researchEngine.engines.all, 1);
			assert.notInclude(researchEngine.engines.all, copy);
		});
	});

	describe('deleteEngine(engine)', function () {
		var researchEngine;

		beforeEach(function () {
			researchEngine = $componentController('researchEngine');
		});

		it('should exist', function () {
			assert.isDefined(researchEngine.deleteEngine);
			assert.isFunction(researchEngine.deleteEngine);
		});

		it('should remove the engine from the list', function () {
			researchEngine.addEngine(engine);

			assert.lengthOf(researchEngine.engines.all, 1);

			researchEngine.deleteEngine(engine);

			assert.lengthOf(researchEngine.engines.all, 0);
		});
	});
});
