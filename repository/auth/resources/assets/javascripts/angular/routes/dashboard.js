angular.module('App').config(['$stateProvider', function ($stateProvider) {

    $stateProvider.state('dashboard', {
        url: '/dashboard',
        templateNamespace: 'dashboard',
        data: {
            title: 'Dashboard',
            description: 'Welcome - MEANStack.io'
        },
        controller: 'dashboardController',
        resolve: {
            deps: ['$ocLazyLoad', 'path', function ($ocLazyLoad, path) {
                return $ocLazyLoad.load({
                        insertBefore: '#load_js_before',
                        files: [
                            path.controller('dashboardController')
                        ]
                    }
                );
            }]
        },
        access: {
            auth: true,
            paramOfRedirect: false
        }
    });
}]);
