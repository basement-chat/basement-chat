<?php

namespace Haemanthus\Basement\Contracts;

use Haemanthus\Basement\Models\PrivateMessage;
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
     * @return class-string<\Illuminate\Foundation\Auth\User>&class-string<\Haemanthus\Basement\Contracts\User>
     */
    public static function userModel(): string;

    /**
     * Get a new instance of the user model.
     *
     * @return \Illuminate\Foundation\Auth\User&\Haemanthus\Basement\Contracts\User
     */
    public static function newUserModel(): Authenticatable;

    /**
     * Specify the private message model used by the application.
     *
     * @param mixed $class
     * @return void
     *
     * @throws \TypeError if the given user model is not a subclass of \Haemanthus\Basement\Models\PrivateMessage.
     */
    public static function usePrivateMessageModel(mixed $class): void;

    /**
     * Get the name of the private message model used by the application.
     *
     * @return class-string<\Haemanthus\Basement\Models\PrivateMessage>
     */
    public static function privateMessageModel(): string;

    /**
     * Get a new instance of the private message model.
     *
     * @return \Haemanthus\Basement\Models\PrivateMessage
     */
    public static function newPrivateMessageModel(): PrivateMessage;

    /**
     * Register a class / callback that should be used to get all contacts.
     *
     * @param  class-string<\Haemanthus\Basement\Contracts\AllContacts>   $class
     * @return void
     */
    public static function allContactsUsing(string $class): void;

    /**
     * Register a class / callback that should be used to get mark private messages as read.
     *
     * @param  class-string<\Haemanthus\Basement\Contracts\MarkPrivatesMessagesAsRead>   $class
     * @return void
     */
    public static function markPrivateMessagesAsReadUsing(string $class): void;
}
