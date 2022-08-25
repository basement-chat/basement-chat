<?php

namespace Haemanthus\Basement;

use App\Models\User;
use Haemanthus\Basement\Contracts\Basement as BasementContract;

class Basement implements BasementContract
{
    /**
     * The user model used by the application.
     *
     * @var string
     */
    protected static string $userModel = User::class;

    /**
     * Specify the user model used by the application.
     *
     * @param string $class
     * @return void
     */
    public static function useUserModel(string $class): void
    {
        static::$userModel = $class;
    }

    /**
     * Get the name of the user model used by the application.
     *
     * @return string
     */
    public static function userModel(): string
    {
        return config(key: 'basement.user_model', default: User::class);
    }
}
