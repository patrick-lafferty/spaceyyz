import angular from 'angular';
import flightService from '../flight/flight-service';
import schedule from '../flight/schedule';
import progress from '../flight/progress';
import details from '../flight/details';

const flight = angular
    .module('spaceyyz.flight', [
        flightService,
        schedule,
        progress,
        details
    ])
    .name;

export default flight;