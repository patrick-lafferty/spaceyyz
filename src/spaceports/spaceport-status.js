import angular from 'angular';

class Spaceports {

    static get $inject() {
        return ['spaceportFactory', '$timeout', '$scope'];
    }

    constructor(spaceportFactory, $timeout, $scope) {
        this.spaceports = {};

        spaceportFactory.getSpaceports().then(spaceports => {
            this.spaceports = spaceports;

            $timeout(() => $scope.$apply());
        });
    }
}

const spaceport = angular
		  .module('spaceyyz.spaceports.spaceport', [])
		  .component('spaceportStatus', {
			    templateUrl: 'src/spaceports/spaceport-status.html',
			    controller: Spaceports,
		  })
      .name;

export default spaceport;
