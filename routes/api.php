<?php

use Haemanthus\Basement\Http\Controllers\Api\ContactController;
use Illuminate\Support\Facades\Route;

Route::middleware(config('basement.middleware'))->name('api.')->prefix('api')->group(function (): void {
    Route::apiResource(name: 'contacts', controller: ContactController::class)->only('index');
});
