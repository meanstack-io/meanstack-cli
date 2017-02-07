angular.module("App")
    .controller("signInController", ['$scope', '$rootScope', '$state', 'toaster', '$stateParams', 'authService', 'auth',
        function ($scope, $rootScope, $state, toaster, $stateParams, authService, auth) {

            /**
             * Parameters redirection when login.
             *
             * @returns {{redirect: string, params: {}, defaultRedirect: boolean}}
             */
            var paramsRedirectionLogin = auth.paramsRedirectionLogin();

            if (!paramsRedirectionLogin.defaultRedirect) {
                toaster.error('Not authorized access ' + $state.href(paramsRedirectionLogin.redirect, paramsRedirectionLogin.params));
            } else if ($stateParams.error) {
                toaster.error($stateParams.error);
            }

            /**
             * Sign in
             */
            $scope.signIn = function () {
                // Clear message.
                toaster.clear();

                authService.signIn({
                    email: $scope.email,
                    password: $scope.password
                }).then(function (response) {
                    // Alter username navbar.
                    $rootScope.$emit('username', response.data.payload.username);

                    // Get parameters for redirect
                    var paramsRedirectionLogin = auth.paramsRedirectionLogin();

                    // Go to page redirect.
                    return $state.go(paramsRedirectionLogin.redirect, paramsRedirectionLogin.params);

                }).catch(function (response) {
                    return toaster.error("Error", response.data.msg.join('<br>'));
                });
            };
        }]);
