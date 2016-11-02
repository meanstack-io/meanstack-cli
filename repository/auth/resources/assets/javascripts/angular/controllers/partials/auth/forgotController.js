angular.module("App")
    .controller("forgotController", ['$scope', '$state', 'toaster', '$stateParams', 'authService',
        function ($scope, $state, toaster, $stateParams, authService) {

            $scope.forgotSendEmail = function () {
                authService.forgotSendEmail({
                    email: $scope.email
                });
            };

            $scope.forgotResetPassword = function () {
                authService.forgotResetPassword(
                    $stateParams.token,
                    {
                        password: $scope.password,
                        repassword: $scope.repassword
                    }
                );
            };
        }]);
