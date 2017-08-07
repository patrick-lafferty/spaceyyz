import angular from 'angular';
import flightFactory from '../flight/flight-factory';
import schedule from '../flight/schedule';
import progress from '../flight/progress';
import details from '../flight/details';

const flight = angular
      .module('spaceyyz.flight', [
          flightFactory,
          schedule,
          progress,
          details
      ])
      .name;

export default flight;
