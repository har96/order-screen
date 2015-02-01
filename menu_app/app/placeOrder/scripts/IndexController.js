angular
  .module('placeOrder')
  .controller('IndexController', function($scope, $http, supersonic) {
    // Controller functionality here
    
    // Get IP if not saved yet
//    var ip = localStorage.getItem("ip_address");
//    if (ip == null) {
 //       ip = prompt("IP of Server");
  //      localStorage.setItem("ip_address", ip);
 //   }
    var ip = "192.168.1.143";

    $scope.menu = {};

    // Fetch menu
    $http.get("http://"+ip+":5000/menu")
      .success(function (response) {
          $scope.menu = response;
      })
      .error(function (status, response) {
          alert("Could not load menu!");
      });

    $scope.resetOrder = function() {
        $scope.items = [0];
        $scope.index = 0;
        $scope.order = {
            "name":"",
            "food":[{"food":"", "options":"","RED FLAG":""}]
        };
    }
    $scope.resetOrder();
    $scope.placeOrder = function() {
        supersonic.logger.debug($scope.order);
        $http({
            url: "http://"+ip+":5000/order",
            method: "POST",
            data: JSON.stringify($scope.order),
            headers: {'Content-Type':'application/json'}
        })
            .success(function (response) {
                if (response.success == true) {
                    alert("Order Placed");
                    $scope.resetOrder();
                }
            })
            .error(function (response) {
                alert("Order Failed");
            });
    }
    $scope.addItem = function() {
        $scope.order.food.push({"food":"","options":"","RED FLAG":""});
        $scope.index += 1;
        $scope.items.push($scope.index);
    }
  });
