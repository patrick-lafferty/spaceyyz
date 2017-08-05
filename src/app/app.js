import angular from 'angular';
import uiRouter from 'angular-ui-router';
import components from './app.components';

angular
    .module('spaceyyz', [
        components,
        uiRouter
    ]);
