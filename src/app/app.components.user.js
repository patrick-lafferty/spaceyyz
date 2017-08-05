import angular from 'angular';
import login from '../user/login';
import account from '../user/account';
import factory from '../user/user.factory';

const user = angular
    .module('spaceyyz.components.user', [
        login,
        account,
        factory
    ])
    .name;

export default user;