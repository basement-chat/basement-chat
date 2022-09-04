<?php

use Haemanthus\Basement\Http\Controllers\Api\ContactController;
use Haemanthus\Basement\Http\Controllers\Api\PrivateMessageController;
use Illuminate\Support\Facades\Route;

Route::middleware(config('basement.middleware'))->name('api.')->prefix('api')->group(function (): void {
    Route::apiResource(name: 'contacts', controller: ContactController::class)
        ->only('index');

    Route::apiResource(name: 'contacts.private-messages', controller: PrivateMessageController::class)
        ->shallow()
        ->only(['index', 'store']);

    Route::patch(uri: 'private-messages', action: [PrivateMessageController::class, 'updates'])
        ->name('private-messages.updates');
});
