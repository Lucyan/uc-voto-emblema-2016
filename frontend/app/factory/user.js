votoEmblemaAPP.factory("User", function ($http, ezfb, $rootScope){
	var baseAPI = '/api/user/';

	var interfaz = {
		data: null,
		isLogin: false,

		fetch: function(callback) {
			if (this.isLogin) {
				var _this = this;
				$http.get(baseAPI + 'me').then(function(resp) {
					_this.data = resp.data;
					console.log(_this.data);
					$rootScope.userLogin = true;
					if (callback) callback();
				}, function(resp) {
					console.log('Login Error!', resp.data);
					if (callback) callback(false);
					_this.logout();
				});
			}

			return this;
		},

		login: function(callback) {
			var _this = this;
			ezfb.login(function(res) {
				if (res.authResponse) {
					_this.loginBackend({accessToken: res.authResponse.accessToken, userID: res.authResponse.userID}, callback);
				} else if (callback) callback(false);
			}, {scope: 'public_profile, email'});
		},

		logout: function() {
			$rootScope.userLogin = false;
			localStorage.removeItem('session');
			$http.defaults.headers.common.Authorization = undefined;
			this.data = null;
			this.isLogin = false;
		},

		loginBackend: function(data, callback) {
			var _this = this;
			$http.post(baseAPI + 'login', data).then(function(resp) {
				_this.setHeaders(resp.data.token);
				_this.setLocalStorage(resp.data.token);
				_this.isLogin = true;
				_this.fetch(callback);
			});
		},

		setLocalStorage: function(token) {
			localStorage.setItem('session', JSON.stringify(token));
		},

		getLocalStorage: function() {
			var token = JSON.parse(localStorage.getItem('session'));
			if (token) return token;
			return false;
		},

		setHeaders: function(token) {
			$http.defaults.headers.common.Authorization = token;
		},

		checkSession: function(callback) {
			var token = this.getLocalStorage();
			if (token) {
				this.setHeaders(token);
				this.isLogin = true;
				if (callback) callback(true);
			} else {
				if (callback) callback(false);
			}
		},

		saveVote: function(opcion, callback) {
			$http.post(baseAPI + 'voto', {opcion: opcion}).then(function(resp) {
				if (callback) callback(true, resp.data);
			}, function(resp) {
				if (callback) callback(false, resp.data.msg);
			});
		},

		getVotos: function(callback) {
			$http.get(baseAPI + 'getvotos').then(function(resp) {
				if (callback) callback(resp.data);
			});
		}
	}
	return interfaz;
});
