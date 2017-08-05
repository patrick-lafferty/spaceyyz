import angular from 'angular';
import home from '../user/home';
import login from '../user/login';
import account from '../user/account';
import factory from '../user/user.factory';

const user = angular
    .module('spaceyyz.components.user', [
        home,
        login,
        account,
        factory
    ])
    .name;

export default user;