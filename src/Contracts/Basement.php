<?php

declare(strict_types=1);

namespace BasementChat\Basement\Contracts;

use BasementChat\Basement\Models\PrivateMessage;
use Illuminate\Foundation\Auth\User as Authenticatable;

interface Basement
{
    /**
     * Specify the user model used by the application.
     */
    public static function useUserModel(mixed $class): void;

    /**
     * Get the name of the user model used by the application.
     *
     * @return class-string<\Illuminate\Foundation\Auth\User>&class-string<\BasementChat\Basement\Contracts\User>
     *
     * @throws \TypeError if the given user model is not a subclass of \Illuminate\Foundation\Auth\User
     *                    or does not implement the \BasementChat\Basement\Contracts\User.
     */
    public static function userModel(): string;

    /**
     * Get a new instance of the user model.
     *
     * @return \Illuminate\Foundation\Auth\User&\BasementChat\Basement\Contracts\User
     */
    public static function newUserModel(): Authenticatable;

    /**
     * Specify the private message model used by the application.
     */
    public static function usePrivateMessageModel(mixed $class): void;

    /**
     * Get the name of the private message model used by the application.
     *
     * @return class-string<\BasementChat\Basement\Models\PrivateMessage>
     *
     * @throws \TypeError if the given user model is not a subclass of \BasementChat\Basement\Models\PrivateMessage.
     */
    public static function privateMessageModel(): string;

    /**
     * Get a new instance of the private message model.
     */
    public static function newPrivateMessageModel(): PrivateMessage;

    /**
     * Register a class / callback that should be used to get all contacts.
     *
     * @param  class-string<\BasementChat\Basement\Contracts\AllContacts>   $class
     */
    public static function allContactsUsing(string $class): void;

    /**
     * Register a class / callback that should be used to get mark private messages as read.
     *
     * @param  class-string<\BasementChat\Basement\Contracts\MarkPrivatesMessagesAsRead>   $class
     */
    public static function markPrivateMessagesAsReadUsing(string $class): void;
}
