<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It's a breeze. Simply tell Laravel the URIs it should respond to
| and give it the controller to call when that URI is requested.
|
*/

$app->get('/', function() use ($app) {
    return $app->welcome();
});

$app->group(["prefix" => "user", "namespace" => "App\Http\Controllers"], function ($app) {

	$app->post('login', [
		'as' => 'userLogin',
		'uses' => 'UserController@login'
	]);

	$app->get('me', [
		'as' => 'userMe',
		'middleware' => 'auth',
		'uses' => 'UserController@me'
	]);

	$app->post('voto', [
		'as' => 'userVote',
		'middleware' => 'auth',
		'uses' => 'UserController@vote'
	]);

	$app->get('getvotos', [
		'as' => 'getVotos',
		'uses' => 'UserController@getVotos'
	]);
});