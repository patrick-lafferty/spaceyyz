(function() {
	var app = angular.module('spaceyyz', ['ui.bootstrap']);
	
	app.controller('SpaceController', function() {
		this.vehicles = launchers;
	});

	var launchers = [ 
		{
			name: 'SLS',
			price: '$expensive',
			description: "a big rocket",
			canPurchase: false,
			soldOut: false
		},
		{
			name: 'FH',
			price: '$arm_and_leg',
			description: 'a reusable rocket',
			canPurchase: false,
			soldOut: false
		}
	];

})();


