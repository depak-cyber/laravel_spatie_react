<?php

use Inertia\Inertia;
use App\Enum\RolesEnum;
use App\Enum\PermissionsEnum;
use Illuminate\Support\Facades\Route;
use Illuminate\Foundation\Application;
use App\Http\Controllers\UserController;
use App\Http\Controllers\UpvoteController;
use App\Http\Controllers\CommentController;
use App\Http\Controllers\FeatureController;
use App\Http\Controllers\ProfileController;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|


Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

*/
Route::redirect('/', '/dashboard');




Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    /*
    Route::middleware(['verified','role:'. RolesEnum::User->value])->group(function(){
        Route::get('/dashboard', function () {
            return Inertia::render('Dashboard');
        })->
    */
    Route::middleware(['verified','role:'. RolesEnum::Admin->value])->group(function(){
        Route::get('/user', [UserController::class, 'index'])
            ->name('user.index');
        Route::get('/user/{user}/edit', [UserController::class, 'edit'])
            ->name('user.edit');
        Route::put('/user/{user}', [UserController::class, 'update'])
            ->name('user.update');

    });


     Route::middleware([
        'verified',
        sprintf('role:%s|%s|%s',
            RolesEnum::User->value,
            RolesEnum::Commenter->value,
            RolesEnum::Admin->value
        )
    ])->group(function(){
        Route::get('/dashboard', function () {
            return Inertia::render('Dashboard');
        })->name('dashboard');

        Route::resource('/feature', FeatureController::class)
        ->except(['show', 'index'])
        ->middleware('can:'.PermissionsEnum::ManageFeatures->value);

         Route::get('/feature', [FeatureController::class, 'index'])
            ->name('feature.index');

        Route::get('/feature/{feature}', [FeatureController::class, 'show'])->name('feature.show');

         Route::post('/feature/{feature}/upvote', [UpvoteController::class, 'store'])
            ->name('upvote.store');
        Route::delete('/feature/{feature}/upvote', [UpvoteController::class, 'destroy'])
            ->name('upvote.destroy');
        
       Route::post('/feature/{feature}/comments', [CommentController::class, 'store'])
            ->name('comment.store')
            ->middleware('can:'.PermissionsEnum::ManageFeatures->value);
          Route::delete('/comment/{comment}', [CommentController::class, 'destroy'])
            ->name('comment.destroy')
            ->middleware('can:'.PermissionsEnum::ManageFeatures->value);
    });
});
require __DIR__.'/auth.php';
