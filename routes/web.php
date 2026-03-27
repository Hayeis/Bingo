<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\CalendarController;
use App\Http\Controllers\TaskController;
use App\Http\Controllers\Auth\AuthenticatedSessionController;
use App\Http\Controllers\Auth\RegisteredUserController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

// ----------------------
// Root route (optional welcome page)
// ----------------------
Route::get('/', function () {
    return Inertia::render('Welcome');
});

// ----------------------
// Guest routes (for users not logged in)
// ----------------------
Route::middleware('guest')->group(function () {
    // React login/register pages
    Route::get('/login', fn() => Inertia::render('Auth/Login'))->name('login');
    Route::get('/register', fn() => Inertia::render('Auth/Register'))->name('register');

    // Laravel auth logic for form submissions
    Route::post('/login', [AuthenticatedSessionController::class, 'store']);
    Route::post('/register', [RegisteredUserController::class, 'store']);
});

// ----------------------
// Authenticated routes (must be logged in)
// ----------------------
Route::middleware('auth')->group(function () {
    // Dashboard
    Route::get('/dashboard', fn() => Inertia::render('Dashboard'))->name('dashboard');

    // Profile page
    Route::get('/my-profile', fn() => Inertia::render('MyProfile'))->name('my-profile');

    // Update username
    Route::post('/profile/update-username', [ProfileController::class, 'updateUsername'])
        ->name('profile.update-username');

    // Settings page
    Route::get('/settings', fn() => Inertia::render('Settings'))->name('settings');

    // Calendar page
    Route::get('/calendar', [CalendarController::class, 'index'])->name('calendar.index');

    // Calendar AJAX fetch for tasks
    Route::get('/tasks', [CalendarController::class, 'tasks'])->name('calendar.tasks');

    // Task management routes
    Route::get('/tasks/list', [TaskController::class, 'index'])->name('tasks.index');
    Route::get('/tasks/create', [TaskController::class, 'create'])->name('tasks.create');
    Route::post('/tasks', [TaskController::class, 'store'])->name('tasks.store');

    // Custom username setup
    Route::get('/setup-username', [ProfileController::class, 'createUsername'])->name('username.create');
    Route::post('/setup-username', [ProfileController::class, 'storeUsername'])->name('username.store');
});

// ----------------------
// Logout route
// ----------------------
Route::post('/logout', [AuthenticatedSessionController::class, 'destroy'])
    ->middleware('auth')
    ->name('logout');