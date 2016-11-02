angular.module('App')
    .config(['config', 'authProvider', function (config, authProvider) {

        /**
         * Config auth module
         */
        authProvider.config(config.auth);
    }]);
