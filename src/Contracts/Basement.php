<?php

namespace Haemanthus\Basement\Contracts;

use Illuminate\Foundation\Auth\User as Authenticatable;

interface Basement
{
    /**
     * Specify the user model used by the application.
     *
     * @param mixed $class
     * @return void
     *
     * @throws \TypeError if the given user model is not a subclass of \Illuminate\Foundation\Auth\User
     *                    or does not implement the \Haemanthus\Basement\Contracts\User.
     */
    public static function useUserModel(mixed $class): void;

    /**
     * Get the name of the user model used by the application.
     *
     * @return class-string<\Illuminate\Foundation\Auth\User> & class-string<\Haemanthus\Basement\Contracts\User>
     */
    public static function userModel(): string;

    /**
     * Get a new instance of the user model.
     *
     * @return \Illuminate\Foundation\Auth\User & \Haemanthus\Basement\Contracts\User
     */
    public static function newUserModel(): Authenticatable;

    /**
     * Register a class / callback that should be used to get all contacts.
     *
     * @param  class-string<\Haemanthus\Basement\Contracts\AllContact>   $class
     * @return void
     */
    public static function allContactUsing(string $class): void;
}
