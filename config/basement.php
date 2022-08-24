<?php

use App\Models\User;
use Haemanthus\Basement\Enums\AvatarStyle;
use Haemanthus\Basement\Enums\ChatBoxPosition;

return [

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

    'chat_box_widget_position' => ChatBoxPosition::BOTTOM_RIGHT,

    /*
    |--------------------------------------------------------------------------
    | User Model
    |--------------------------------------------------------------------------
    |
    | Specify the namespace and class used to get the user model instance. The
    | given class must implement the "HasPrivateMessages" contract.
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
        'style' => AvatarStyle::MICAH,
        'options' => [
            'b' => '%233584e4',
            'size' => 64,
        ],
    ],

];
