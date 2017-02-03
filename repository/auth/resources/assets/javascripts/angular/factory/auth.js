/**
 * Factory service auth.
 */
angular.module("App").factory('authService',
    ['$http', 'route',
        function ($http, route) {

            return {
                signIn: function (user) {
                    return $http.post(route.namespace('auth/signin'), user);
                },
                signUp: function (user) {
                    return $http.post(route.namespace('auth/signup'), user);
                },
                logout: function () {
                    return $http.post(route.namespace('auth/logout'));
                },
                forgotSendEmail: function (user) {
                    return $http.post(route.namespace('auth/forgot'), user);
                },
                forgotResetPassword: function (token, password) {
                    return $http.post(route.namespace('auth/forgot/' + token), password);
                }
            };
        }]
);
