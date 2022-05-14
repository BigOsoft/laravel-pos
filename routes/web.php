<?php

use Illuminate\Support\Facades\Route;
use App\Models\POS; 
use App\Models\Transactions;


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

Route::match(array('GET', 'POST'), '/dashboard', function() {
    $poss = POS::all();
    return view('dashboard', ['poss' => $poss]);
})->middleware(['auth'])->name('dashboard');

Route::match(array('GET', 'POST'), '/report', function() {
    $transactions = Transactions::all();
    return view('report', ['transactions' => $transactions]);
})->middleware(['auth'])->name('report');

Route::get('/users', function () {
    return view('users');
})->middleware(['auth'])->name('users');

require __DIR__.'/auth.php';
