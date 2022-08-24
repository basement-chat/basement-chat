<?php

namespace Haemanthus\Basement\Contracts;

interface Basement
{
    /**
     * The default host address for getting the avatar image.
     */
    public const AVATAR_BASE_URI = 'https://avatars.dicebear.com/';

    /**
     * Get the user avatar.
     *
     * @param string $key
     * @return string
     */
    public static function avatar(string $key): string;

    /**
     * Get the name of the user model used by the application.
     *
     * @return string
     */
    public static function userModel(): string;
}
