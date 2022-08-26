<?php

namespace Haemanthus\Basement;

use Haemanthus\Basement\Contracts\AllContact;
use Haemanthus\Basement\Contracts\Basement as BasementContract;
use Haemanthus\Basement\Contracts\User as UserContract;
use Illuminate\Foundation\Auth\User as Authenticatable;

class Basement implements BasementContract
{
    /**
     * The user model used by the application.
     *
     * @var class-string<\Illuminate\Foundation\Auth\User> & class-string<\Haemanthus\Basement\Contracts\User>
     */
    protected static string $userModel;

    /**
     * Specify the user model used by the application.
     *
     * @param mixed $class
     * @return void
     *
     * @throws \TypeError if the given user model is not a subclass of \Illuminate\Foundation\Auth\User
     *                    or does not implement the \Haemanthus\Basement\Contracts\User.
     */
    public static function useUserModel(mixed $class): void
    {
        if (
            is_string($class)
            && class_exists($class)
            && is_subclass_of($class, Authenticatable::class)
            && is_subclass_of($class, UserContract::class)
        ) {
            static::$userModel = $class;
        } else {
            throw new \TypeError(
                'The given user model should be a subclass of ' . Authenticatable::class .
                ' class and implement the ' . UserContract::class . ' contract.'
            );
        }
    }

    /**
     * Get the name of the user model used by the application.
     *
     * @return class-string<\Illuminate\Foundation\Auth\User> & class-string<\Haemanthus\Basement\Contracts\User>
     */
    public static function userModel(): string
    {
        return static::$userModel;
    }

    /**
     * Get a new instance of the user model.
     *
     * @return \Illuminate\Foundation\Auth\User & \Haemanthus\Basement\Contracts\User
     */
    public static function newUserModel(): Authenticatable
    {
        return app(static::$userModel);
    }

    /**
     * Register a class / callback that should be used to get all contacts.
     *
     * @param  class-string<\Haemanthus\Basement\Contracts\AllContact>   $class
     * @return void
     */
    public static function allContactUsing(string $class): void
    {
        app()->bind(abstract: AllContact::class, concrete: $class);
    }
}
