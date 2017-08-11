import angular from 'angular';

class ScheduleFlight {

    static get $inject() {
        return ['vehicleInventoryService', 'spaceportService',
            '$timeout', '$scope', 'groupByFilter', 'solarSystemService', 'flightService'
        ];
    }

    notifyChanges() {
        this.$timeout(() => this.$scope.$apply());
    }

    constructor(vehicleInventoryService, spaceportService,
        $timeout, $scope, groupByFilter, solarSystemService, flightService) {

        Object.assign(this, {
            vehicleInventoryService,
            spaceportService,
            $timeout,
            $scope,
            groupByFilter,
            solarSystemService,
            flightService
        });
        this.payload = 0;
        this.solarSystem = solarSystemService;
        this.vehicles = {
            all: []
        };
        this.selectedVehicle = {};
        this.datePicker = {
            isOpen: false
        };

        this.filter = vehicle => vehicle.variants.some(
            variant => variant.capacity >= Number(this.payload));

        this.variantFilter = variant => variant.capacity >= Number(this.payload);
        this.flight = {
            mission: {
                id: '',
                payload: 0,
                destination: {
                    primary: this.solarSystem.planets[2],
                    secondary: 'None'
                },
                type: 'orbit',
                vehicle: {invalid: true}
            },
            launch: {
                date: new Date(),
                site: {}
            }
        };

        this.datePickerOptions = {
            minDate: new Date()
        };

        this.spaceports = {};
        this.continent = 'northAmerica';
        this.spaceport = {};
        this.selectedValidSpaceport = false;
        this.filtername = '';
        this.isopen = false;

        this.spaceportFilter = spaceport => spaceport.name.toLowerCase().includes(this.filtername.toLowerCase());

        this.spaceportSelected = spaceport => {
            this.spaceport = spaceport;
            this.selectedValidSpaceport = true;
            this.filtername = spaceport.name;
        };

        this.filterChanged = () => {
            this.isopen = true;
            this.spaceport = this.ungroupedSpaceports[this.continent].find(s => s.name === this.filtername);
            this.selectedValidSpaceport = this.spaceport !== undefined;
        };

        this.schedule = () => {

            if (this.flight.mission.vehicle.invalid) {
                return;
            }

            this.flight.mission.name = 'sts-31';
            flightService.scheduleFlight(this.flight);
        };

        this.continentChanged = () => {
            this.filterChanged();
            this.notifyChanges();
        };


        this.selected = function() {
            this.flight.mission.vehicle = this.selectedVehicle;

            if (this.selectedVehicle.inventory === 0) {
                this.datePickerOptions.minDate.setFullYear(new Date().getFullYear() + 1);

                if (this.flight.launchDate < this.datePickerOptions.minDate) {
                    this.flight.launchDate = this.datePickerOptions.minDate;
                }
            }
        };

        vehicleInventoryService.getVehicles().then(vehicles => {
            this.vehicles.all = vehicles.allVehicles;

            this.vehicles.all.forEach(vehicle => vehicle.selected = false);

            this.notifyChanges();
        });

        spaceportService.getSpaceports().then(spaceports => {
            this.ungroupedSpaceports = spaceports;
            this.spaceports.northAmerica = groupByFilter(spaceports.northAmerica, 'country');

            this.notifyChanges();
        });
    }
}

const scheduleFlight = angular
    .module('spaceyyz.flight.schedule', [])
    .component('scheduleFlight', {
        templateUrl: 'src/flight/schedule.html',
        controller: ScheduleFlight
    })
    .name;

export default scheduleFlight;