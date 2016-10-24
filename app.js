(function() {
	
	app.controller('SpaceController', function() {
		this.vehicles = launchers;
	});

	app.controller('PanelController', function() {
		this.tab = 1;
		this.selectTab = function(setTab) {
			this.tab = setTab;
		};
		this.isSelected = function(checkTab) {
			return this.tab === checkTab;
		};
	});

})();


