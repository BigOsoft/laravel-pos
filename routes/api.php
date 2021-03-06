<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\CompanyController;
use App\Http\Controllers\AccessController;
use App\Http\Controllers\InventoryController;
use App\Http\Controllers\PermissionsController;
use App\Http\Controllers\POSController;
use App\Http\Controllers\TransactionsController;

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

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::resources([
    'company' => CompanyController::class,
    'access' => AccessController::class,
    'inventory' => InventoryController::class,
    'permissions' => PermissionsController::class,
    'pos' => POSController::class,
    'transactions' => TransactionsController::class,
]);
// Route::resource('companies', CompanyController::class);
// Route::resource('transactions', TransactionsController::class);
