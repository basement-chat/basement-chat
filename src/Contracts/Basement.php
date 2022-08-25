<?php

namespace Haemanthus\Basement\Contracts;

use Illuminate\Database\Eloquent\Model;

/**
 * @template TModel of \Illuminate\Database\Eloquent\Model
 * @template TAllContact of \Haemanthus\Basement\Contracts\AllContact
 */
interface Basement
{
    /**
     * Specify the user model used by the application.
     *
     * @param class-string<TModel> $class
     * @return void
     */
    public static function useUserModel(string $class): void;

    /**
     * Get the name of the user model used by the application.
     *
     * @return \Illuminate\Database\Eloquent\Model & \Haemanthus\Basement\Contracts\User
     */
    public static function userModel(): Model;

    /**
     * Register a class / callback that should be used to get all contacts.
     *
     * @param  class-string<TAllContact>   $class
     * @return void
     */
    public static function allContactUsing(string $class): void;
}
