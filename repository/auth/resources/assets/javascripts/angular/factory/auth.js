/**
 * Factory service auth.
 */
angular.module("App").factory('authService',
    ['$http', 'route', '$templateCache', '$rootScope', '$state', '$stateParams', 'toaster', 'auth',
        function ($http, route, $templateCache, $rootScope, $state, $stateParams, toaster, auth) {
            var sign = function (url, user) {
                // Clear message.
                toaster.clear();

                return $http.post(route.namespace('auth/sign' + url), user)
                    .success(function (response) {
                        // Clear cache templates.
                        $templateCache.removeAll();

                        // Alter username navbar.
                        $rootScope.$emit('username', response.data.username);

                        // Get parameters for redirect
                        var paramsRedirectionLogin = auth.paramsRedirectionLogin();

                        // Go to page redirect.
                        return $state.go(paramsRedirectionLogin.redirect, paramsRedirectionLogin.params);
                    })
                    .error(function (response) {
                        return toaster.error("Error", response.msg.join('<br>'));
                    });
            };

            return {
                signIn: function (user) {
                    return sign('in', user);
                },
                signUp: function (user) {
                    return sign('up', user);
                },
                logout: function () {
                    return $http.post(route.namespace('auth/logout'))
                        .success(function () {
                            // Clear cache templates.
                            $templateCache.removeAll();

                            return $state.go('home');
                        })
                        .error(function () {
                            toaster.error("Error in logout");
                        });
                },
                forgotSendEmail: function (user) {
                    return $http.post(route.namespace('auth/forgot'), user)
                        .success(function (response) {
                            toaster.success("Success", response.msg.join('<br>'));
                            return $state.go('home');
                        })
                        .error(function (response) {
                            return toaster.error("Error", response.msg.join('<br>'));
                        });
                },
                forgotResetPassword: function (token, password) {
                    return $http.post(route.namespace('auth/forgot/' + token), password)
                        .success(function (response) {
                            toaster.success("Success", response.msg.join('<br>'));
                            return $state.go('signin');
                        })
                        .error(function (response) {
                            return toaster.error("Error", response.msg.join('<br>'));
                        });
                }
            };
        }]
);
