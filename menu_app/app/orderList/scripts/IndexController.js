angular
  .module('orderList')
  .controller('IndexController', function($scope, $http, supersonic) {
    // Controller functionality here
    var ip = "192.168.1.143";
    $scope.refresh = function() {
        $http.get("http://192.168.1.143:5000/order")
            .success(function(response) {
                $scope.orders = response.orders;
                supersonic.logger.debug("applying orders");
                supersonic.logger.debug($scope.orders);
            })
            .error(function(status, response) {
                supersonic.logger.debug("Could not load data: ", status);
                $scope.error = "Could not load data.";
            });
    };

    $scope.bumpOrder = function(index) {
        supersonic.logger.debug("Bumping order:");
        supersonic.logger.debug(index);
        $http({
            url: "http://"+ip+":5000/order",
            method: "DELETE",
            data: JSON.stringify({"index":index}),
            headers: {'Content-Type':'application/json'}
        })
            .success(function(response) {
                supersonic.logger.debug("Success!");
                $scope.refresh();
            })
            .error(function (response) {
                alert("ERROR: Could not bump order");
            });
    };
    $scope.refresh();
  });
