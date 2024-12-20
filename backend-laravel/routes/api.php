<?php
use App\Http\Controllers\UserController;
//use App\Http\Controllers\AuthController;
use App\Http\Middleware\GuestMiddleware;
//use App\Http\Middleware\AuthMiddleware;
use App\Http\Controllers\JWTAuthController;
use App\Http\Middleware\JwtMiddleware;

Route::post('register', [JWTAuthController::class, 'register']);
Route::post('login', [JWTAuthController::class, 'login']);

Route::middleware([JwtMiddleware::class])->group(function () {
    Route::get('user', [JWTAuthController::class, 'getUser']);
    Route::post('logout', [JWTAuthController::class, 'logout']);
});
