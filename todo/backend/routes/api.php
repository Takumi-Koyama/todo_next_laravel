<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::post('auth/login', 'AuthController@login');
Route::post('users/register', 'UserController@register');

Route::group([
    'prefix' => 'auth',
    'middleware' => 'auth:api'
], function () {
    Route::post('logout', 'AuthController@logout');
    Route::post('refresh', 'AuthController@refresh');
    Route::post('me', 'AuthController@me');
});

Route::group([
    'prefix' => 'todos',
    'middleware' => 'auth:api'
], function () {
    Route::post('/', 'TodoController@create');
    Route::get('/', 'TodoController@fetch');
    Route::get('/byPage', 'TodoController@fetchByPage');
    Route::get('{todoId}', 'TodoController@fetchOne');
    Route::delete('{todoId}', 'TodoController@delete');
    Route::patch('{todoId}', 'TodoController@update');
});