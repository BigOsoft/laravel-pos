<?php

use Illuminate\Support\Facades\Route;
use App\Models\POS; 


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

Route::get('/', function () {
    return view('welcome');
});

Route::get('/dashboard', function () {
    return view('dashboard');
})->middleware(['auth'])->name('dashboard');

Route::get('/users', function () {
    $pos = POS::all();
    return view('users', ['pos' => $pos]);
})->middleware(['auth'])->name('users');

require __DIR__.'/auth.php';
