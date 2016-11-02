angular.module("App")
    .controller("signInController", ['$scope', '$state', 'toaster', '$stateParams', 'authService', 'auth',
        function ($scope, $state, toaster, $stateParams, authService, auth) {

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
                authService.signIn({
                    email: $scope.email,
                    password: $scope.password
                });
            };
        }]);
