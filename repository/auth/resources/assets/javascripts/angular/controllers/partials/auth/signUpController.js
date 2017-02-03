angular.module("App")
    .controller("signUpController", ['$scope', '$rootScope', '$state', 'toaster', 'authService', 'auth',
        function ($scope, $rootScope, $state, toaster, authService, auth) {

            /**
             * Sign up
             */
            $scope.signUp = function () {
                // Clear message.
                toaster.clear();

                authService.signUp({
                    username: $scope.username,
                    email: $scope.email,
                    password: $scope.password,
                    repassword: $scope.repassword
                }).success(function (response) {
                    // Alter username navbar.
                    $rootScope.$emit('username', response.data.username);

                    // Get parameters for redirect
                    var paramsRedirectionLogin = auth.paramsRedirectionLogin();

                    // Go to page redirect.
                    return $state.go(paramsRedirectionLogin.redirect, paramsRedirectionLogin.params);

                }).error(function (response) {
                    return toaster.error("Error", response.msg.join('<br>'));
                });
            };
        }]);
