angular.module("App")
    .controller('navController', ['$scope', '$rootScope', '$state', 'authService', 'toaster',
        function ($scope, $rootScope, $state, authService, toaster) {

            /**
             * Alter username nav.
             */
            $rootScope.$on('username', function (event, name) {
                $scope.username = name;
            });

            /**
             * Logoff
             */
            $scope.logout = function () {
                authService.logout()
                    .success(function () {
                        return $state.go('home');
                    })
                    .error(function () {
                        toaster.error("Error in logout");
                    });
            };
        }]);
