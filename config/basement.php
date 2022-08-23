<?php

return [

    /*
    |--------------------------------------------------------------------------
    | Avatar
    |--------------------------------------------------------------------------
    |
    | You can change the avatar's appearance in the contact list according to
    | the styles available in https://avatars.dicebear.com/. If you have other
    | avatar preferences (such as the user's real photo uploaded on your site),
    | you can publish the \Haemanthus\Basement\Models\User.php file and modify
    | the "avatar" accessor function.
    |
    */

    'avatar' => [
        'style' => \Haemanthus\Basement\Enums\AvatarStyle::MICAH,
        'options' => [
            'b' => '%233584e4',
            'size' => 64,
        ],
    ],

    /*
    |--------------------------------------------------------------------------
    | Chat Box Position
    |--------------------------------------------------------------------------
    |
    | Configure where you want to place the chat box widget view. If you have
    | advanced configuration, feel free to publish the view and modify it as
    | you wish.
    |
    */

    'position' => \Haemanthus\Basement\Enums\ChatBoxPosition::BOTTOM_RIGHT,
];
