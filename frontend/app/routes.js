votoEmblemaAPP.config(function ($routeProvider, $locationProvider, ezfbProvider){

  ezfbProvider.setLocale('es_CL');
  ezfbProvider.setInitParams({
    // This is my FB app id for plunker demo app
    appId: '644660985700607',

    // Module default is `v2.4`.
    // If you want to use Facebook platform `v2.3`, you'll have to add the following parameter.
    // https://developers.facebook.com/docs/javascript/reference/FB.init
    version: 'v2.7'
  });

  $locationProvider.html5Mode(true);

  $routeProvider
  .when('/',
  {
    templateUrl: 'app/modules/home/home.template.html',
    controller: 'homeController'
  })
  .when('/static-page',
  {
    templateUrl: 'app/modules/staticPage/staticPage.template.html'
  })
  .otherwise({
    redirectTo: '/'
  });

});
