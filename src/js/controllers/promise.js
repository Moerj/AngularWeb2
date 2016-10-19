angular.module('myModule')
.controller("promise", function ($scope, $q, $timeout) {
    $scope.flag = true;
    $scope.handle = function () {
        var deferred = $q.defer();
        var promise = deferred.promise;

        promise.then(function (result) {
            result = result + "you have passed the first then()";
            $scope.status = result;
            return result;
        }, function (error) {
            error = error + "failed but you have passed the first then()";
            $scope.status = error;
            return error;
        }).then(function (result) {
            console.log("Success: " + result);
        }, function (error) {
            console.log("Fail: " + error);
        })

        if ($scope.flag) {
            deferred.resolve("you are lucky!");
        } else {
            deferred.reject("sorry, it lost!");
        }
        $scope.flag = !$scope.flag
    }
})
