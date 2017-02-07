angular.module("App")
    .controller("forgotController", ['$scope', '$state', 'toaster', '$stateParams', 'authService',
        function ($scope, $state, toaster, $stateParams, authService) {

            $scope.forgotSendEmail = function () {
                authService.forgotSendEmail({
                    email: $scope.email
                }).then(function (response) {
                    toaster.success("Success", response.data.msg.join('<br>'));

                    return $state.go('home');
                }).catch(function (response) {
                    return toaster.error("Error", response.data.msg.join('<br>'));
                });
            };

            $scope.forgotResetPassword = function () {
                authService.forgotResetPassword(
                    $stateParams.token,
                    {
                        password: $scope.password,
                        repassword: $scope.repassword
                    }
                ).then(function (response) {
                    toaster.success("Success", response.data.msg.join('<br>'));

                    return $state.go('signin');
                }).catch(function (response) {
                    return toaster.error("Error", response.data.msg.join('<br>'));
                });
            };
        }]);
