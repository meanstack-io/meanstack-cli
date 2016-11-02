angular.module("App")
    .controller('navController', ['$scope', '$rootScope', '$templateCache', '$state', 'authService',
        function ($scope, $rootScope, $templateCache, $state, authService) {

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
                authService.logout();
            };
        }]);
