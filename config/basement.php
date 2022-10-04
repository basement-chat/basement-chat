<?php

declare(strict_types=1);

use App\Models\User;
use BasementChat\Basement\Enums\AvatarStyle;
use BasementChat\Basement\Enums\ChatBoxPosition;

return [

    /*
    |--------------------------------------------------------------------------
    | Laravel Echo Broadcast Options
    |--------------------------------------------------------------------------
    |
    | Here is the configuration where you can set the options used on client-
    | side Laravel Echo. For server-side broadcasting options, please refer to
    | /config/broadcasting.php file. The "default" value below should be
    | available as an array key inside "connections".
    |
    */

    'broadcaster' => [
        'default' => env('BROADCAST_DRIVER', 'null'),
        'connections' => [
            'pusher' => [
                'broadcaster' => 'pusher',
                'key' => env('PUSHER_APP_KEY'),
                'cluster' => env('PUSHER_APP_CLUSTER'),
                'useTLS' => true,
            ],
            'null' => [
            ],
        ],
    ],

    /*
    |--------------------------------------------------------------------------
    | Chat Box Widget Position
    |--------------------------------------------------------------------------
    |
    | Configure where you want to place the chat box widget view. If you have
    | advanced configuration, feel free to publish the view and modify it as
    | you wish.
    |
    */

    'chat_box_widget_position' => ChatBoxPosition::bottomRight(),

    /*
    |--------------------------------------------------------------------------
    | User Model
    |--------------------------------------------------------------------------
    |
    | Specify the namespace and class used to get the user model instance. The
    | given class must extend the "Illuminate\Foundation\Auth\User" and
    | implement the "BasementChat\Basement\Contracts\User".
    |
    */

    'user_model' => User::class,

    /*
    |--------------------------------------------------------------------------
    | Avatar
    |--------------------------------------------------------------------------
    |
    | You can change the avatar's appearance in the contact list according to
    | the styles available in https://avatars.dicebear.com/. If you have other
    | avatar preferences (such as the user's real photo uploaded on your site),
    | you can override the "getAvatarAttribute" accessor function in your user
    | model.
    |
    */

    'avatar' => [
        'style' => AvatarStyle::micah(),
        'options' => [
            'b' => '%233584e4',
            'size' => 64,
        ],
    ],

    /*
    |--------------------------------------------------------------------------
    | Middleware
    |--------------------------------------------------------------------------
    |
    | Basement frontend uses API calls to get contacts and private messages
    | data. Here you can configure what middleware should be passed when
    | processing requests.
    |
    */

    'middleware' => [
        \Laravel\Sanctum\Http\Middleware\EnsureFrontendRequestsAreStateful::class,
        'throttle:api',
        \Illuminate\Routing\Middleware\SubstituteBindings::class,
        'auth:sanctum',
    ],

];
