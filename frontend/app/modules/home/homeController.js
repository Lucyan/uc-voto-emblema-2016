votoEmblemaAPP.controller("homeController", function ($scope, $rootScope, User) {
	$scope.tryvote = false;
	$scope.yavoto = false;
	$scope.gracias = false;
	$scope.showResena1 = false;
	$scope.showResena2 = false;

	$scope.totalVotos = 0;
	$scope.opcion1 = 0;
	$scope.opcion2 = 0;
	$scope.graciasImg = 'img/OpcionA.png';

	$scope.getVotos = function() {
		User.getVotos(function(resp) {
			$scope.totalVotos = resp.total;
			for (var i = 0; i < resp.opciones.length; i++) {
				if (resp.opciones[i].opcion == 1) {
					$scope.opcion1 = resp.opciones[i].count;
				} else if (resp.opciones[i].opcion == 2) {
					$scope.opcion2 = resp.opciones[i].count;
				}
			}
		});
	}

	$scope.getVotos();

 	$scope.login = function() {
 		User.login(function() {
 			$scope.tryvote = false;
 		});
 	}

 	$scope.votar = function(opcion) {
 		if ($rootScope.userLogin) {
			User.saveVote(opcion, function(flag, data) {
	 			if (flag) {
	 				if (opcion == 1) {
	 					$scope.graciasImg = 'img/OpcionA.png';
	 				} else {
	 					$scope.graciasImg = 'img/OpcionB.png';
	 				}

	 				$scope.gracias = true;
	 			} else {
					$scope.yavoto = true;
	 			}

	 			$scope.getVotos();
	 			User.fetch();
	 		});
 		} else {
 			$scope.tryvote = true;
 		}
 	}

 	$scope.hidePopup = function() {
 		$scope.tryvote = false;
 		$scope.yavoto = false;
 		$scope.gracias = false;
 		$scope.showResena1 = false;
 		$scope.showResena2 = false;
 	}
});
