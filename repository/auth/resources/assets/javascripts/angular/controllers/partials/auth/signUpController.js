angular.module("App")
    .controller("signUpController", ['$scope', '$state', 'toaster', '$stateParams', 'authService',
        function ($scope, $state, toaster, $stateParams, authService) {

            /**
             * Sign up
             */
            $scope.signUp = function () {
                authService.signUp({
                    username: $scope.username,
                    email: $scope.email,
                    password: $scope.password,
                    repassword: $scope.repassword
                });
            };
        }]);
