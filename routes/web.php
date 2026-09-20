<?php

use App\Http\Controllers\ShowroomController;
use Illuminate\Support\Facades\Route;

Route::get('/', ShowroomController::class)->name('home');
Route::get('/katalog', ShowroomController::class)->name('catalog');
Route::get('/produk/{slug}', ShowroomController::class)->name('products.show');
Route::get('/admin', ShowroomController::class)->name('admin');
