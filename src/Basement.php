<?php

namespace Haemanthus\Basement;

use App\Models\User;
use Haemanthus\Basement\Contracts\AllContact;
use Haemanthus\Basement\Contracts\Basement as BasementContract;
use Illuminate\Database\Eloquent\Model;

/**
 * @template TModel of \Illuminate\Database\Eloquent\Model
 * @template TAllContact of \Haemanthus\Basement\Contracts\AllContact
 */
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
     * @param class-string<TModel> $class
     * @return void
     */
    public static function useUserModel(string $class): void
    {
        static::$userModel = $class;
    }

    /**
     * Get the name of the user model used by the application.
     *
     * @return \Illuminate\Database\Eloquent\Model & \Haemanthus\Basement\Contracts\User
     */
    public static function userModel(): Model
    {
        return app(static::$userModel);
    }

    /**
     * Register a class / callback that should be used to get all contacts.
     *
     * @param  class-string<TAllContact>   $class
     * @return void
     */
    public static function allContactUsing(string $class): void
    {
        app()->bind(abstract: AllContact::class, concrete: $class);
    }
}
