angular.module("App")
    .controller("forgotController", ['$scope', '$state', 'toaster', '$stateParams', 'authService',
        function ($scope, $state, toaster, $stateParams, authService) {

            $scope.forgotSendEmail = function () {
                authService.forgotSendEmail({
                    email: $scope.email
                }).success(function (response) {
                    toaster.success("Success", response.msg.join('<br>'));

                    return $state.go('home');
                }).error(function (response) {
                    return toaster.error("Error", response.msg.join('<br>'));
                });
            };

            $scope.forgotResetPassword = function () {
                authService.forgotResetPassword(
                    $stateParams.token,
                    {
                        password: $scope.password,
                        repassword: $scope.repassword
                    }
                ).success(function (response) {
                    toaster.success("Success", response.msg.join('<br>'));

                    return $state.go('signin');
                }).error(function (response) {
                    return toaster.error("Error", response.msg.join('<br>'));
                });
            };
        }]);
