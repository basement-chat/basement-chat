<?php

declare(strict_types=1);

use BasementChat\Basement\Http\Controllers\Api\ContactController;
use BasementChat\Basement\Http\Controllers\Api\PrivateMessageController;
use Illuminate\Support\Facades\Route;

$middleware = config('basement.middleware');

Route::middleware(is_array($middleware) || is_string($middleware) ? $middleware : [
    \Laravel\Sanctum\Http\Middleware\EnsureFrontendRequestsAreStateful::class,
    'throttle:api',
    \Illuminate\Routing\Middleware\SubstituteBindings::class,
    'auth:sanctum',
])->name('api.')->prefix('api')->group(static function (): void {
    Route::apiResource(name: 'contacts', controller: ContactController::class)
        ->only('index');

    Route::apiResource(name: 'contacts.private-messages', controller: PrivateMessageController::class)
        ->shallow()
        ->only(['index', 'store']);

    Route::patch(uri: 'private-messages', action: [PrivateMessageController::class, 'updates'])
        ->name('private-messages.updates');
});
