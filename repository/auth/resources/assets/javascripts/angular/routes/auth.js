angular.module('App').config(['$stateProvider', function ($stateProvider) {

    $stateProvider
        .state('signin', {
            url: '/signin?r?p',
            templateNamespace: 'auth/signin',
            data: {
                title: 'Sign In',
                description: 'Sign In - MEANStack.io'
            },
            controller: 'signInController',
            resolve: {
                deps: ['$ocLazyLoad', 'path', function ($ocLazyLoad, path) {
                    return $ocLazyLoad.load({
                            insertBefore: '#load_js_before',
                            files: [
                                path.controller('auth/signInController')
                            ]
                        }
                    );
                }]
            },
            access: {
                auth: false
            }
        })

        .state('signup', {
            url: '/signup',
            templateNamespace: 'auth/signup',
            data: {
                title: 'Sign Up',
                description: 'Sign Up - MEANStack.io'
            },
            controller: 'signUpController',
            resolve: {
                deps: ['$ocLazyLoad', 'path', function ($ocLazyLoad, path) {
                    return $ocLazyLoad.load({
                            insertBefore: '#load_js_before',
                            files: [
                                path.controller('auth/signUpController')
                            ]
                        }
                    );
                }]
            },
            access: {
                auth: false
            }
        })

        .state('forgot', {
            url: '/forgot',
            templateNamespace: 'auth/forgot',
            data: {
                title: 'Forgot password',
                description: 'Forgot password - MEANStack.io'
            },
            controller: 'forgotController',
            resolve: {
                deps: ['$ocLazyLoad', 'path', function ($ocLazyLoad, path) {
                    return $ocLazyLoad.load({
                            insertBefore: '#load_js_before',
                            files: [
                                path.controller('auth/forgotController')
                            ]
                        }
                    );
                }]
            },
            access: {
                auth: false
            }
        })

        .state('forgot/token', {
            url: '/forgot/:token',
            templateNamespace: function (params) {
                return 'auth/forgot/' + params.token;
            },
            data: {
                title: 'Reset password',
                description: 'Reset password - MEANStack.io'
            },
            controller: 'forgotController',
            resolve: {
                deps: ['$ocLazyLoad', 'path', function ($ocLazyLoad, path) {
                    return $ocLazyLoad.load({
                            insertBefore: '#load_js_before',
                            files: [
                                path.controller('auth/forgotController')
                            ]
                        }
                    );
                }]
            },
            access: {
                auth: false
            }
        });
}]);
