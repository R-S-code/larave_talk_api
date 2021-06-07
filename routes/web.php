<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', 'App\Http\Controllers\ChattingController@syncGetChatting');

// /chatting/getChatsにpostリクエストがあった際にChattingControllerのgetChattingを呼び出し
Route::post('/getChatting', 'App\Http\Controllers\ChattingController@getChatting');

// chatの登録
Route::post('/insertChatting', 'App\Http\Controllers\ChattingController@insertChatting');

// chatのリセット
Route::post('/resetChatting', 'App\Http\Controllers\ChattingController@resetChatting');

