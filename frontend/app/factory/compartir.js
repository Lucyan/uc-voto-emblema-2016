votoEmblemaAPP.factory("Compartir", function ($location){
	var url = $location.protocol() + "://" + $location.host();

	var interfaz = {

		fb: function() {
			var shareURL = url;
			var urlFacebook = '//www.facebook.com/share.php?u=' + encodeURIComponent(shareURL);
			var popupWindow = window.open(
				urlFacebook,'popUpWindow','height=300,width=600,left=10,top=10,resizable=no,scrollbars=no,toolbar=no,menubar=no,location=no,directories=no,status=yes');
		},

		tw: function(id) {
			var shareURL = url;
			var mensaje = encodeURIComponent('Elige la insignia que lucirá la UC en su nueva camiseta conmemorativa de los 80 años');
			var shareURL = encodeURIComponent(shareURL);

			var urlTwitter = 'https://twitter.com/intent/tweet?text=';
			urlTwitter = urlTwitter + mensaje;
			urlTwitter = urlTwitter +'&url=' + shareURL;
			popupWindow = window.open(
				urlTwitter,'popUpWindow','height=300,width=600,left=10,top=10,resizable=no,scrollbars=no,toolbar=no,menubar=no,location=no,directories=no,status=yes');
		}
	};

	return interfaz;
});