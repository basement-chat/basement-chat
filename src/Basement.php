<?php

declare(strict_types=1);

namespace BasementChat\Basement;

use BasementChat\Basement\Contracts\AllContacts;
use BasementChat\Basement\Contracts\AllPrivateMessages;
use BasementChat\Basement\Contracts\Basement as BasementContract;
use BasementChat\Basement\Contracts\MarkPrivatesMessagesAsRead;
use BasementChat\Basement\Contracts\SendPrivateMessage;
use BasementChat\Basement\Contracts\User as UserContract;
use BasementChat\Basement\Models\PrivateMessage;
use Illuminate\Foundation\Auth\User as Authenticatable;

class Basement implements BasementContract
{
    /**
     * The user model used by the application.
     *
     * @phpstan-var class-string<\Illuminate\Foundation\Auth\User>&class-string<\BasementChat\Basement\Contracts\User>
     */
    protected static string $userModel;

    /**
     * The private message model used by the application.
     *
     * @phpstan-var class-string<\BasementChat\Basement\Models\PrivateMessage>
     */
    protected static string $privateMessageModel;

    /**
     * Specify the user model used by the application.
     *
     * @throws \TypeError if the given user model is not a subclass of \Illuminate\Foundation\Auth\User
     *                    or does not implement the \BasementChat\Basement\Contracts\User.
     */
    public static function useUserModel(mixed $class): void
    {
        if (
            is_string($class) === false
            || class_exists($class) === false
            || is_subclass_of($class, Authenticatable::class) === false
            || is_subclass_of($class, UserContract::class) === false
        ) {
            throw new \TypeError(
                'The given user model should be a subclass of ' . Authenticatable::class .
                ' class and implement the ' . UserContract::class . ' contract.'
            );
        }

        static::$userModel = $class;
    }

    /**
     * Get the name of the user model used by the application.
     *
     * @return class-string<\Illuminate\Foundation\Auth\User>&class-string<\BasementChat\Basement\Contracts\User>
     */
    public static function userModel(): string
    {
        return static::$userModel;
    }

    /**
     * Get a new instance of the user model.
     *
     * @return \Illuminate\Foundation\Auth\User&\BasementChat\Basement\Contracts\User
     */
    public static function newUserModel(): Authenticatable
    {
        return app(static::$userModel);
    }

    /**
     * Specify the private message model used by the application.
     *
     * @throws \TypeError if the given user model is not a subclass of \BasementChat\Basement\Models\PrivateMessage.
     */
    public static function usePrivateMessageModel(mixed $class): void
    {
        if (
            is_string($class) === false
            || class_exists($class) === false
            || (is_subclass_of($class, PrivateMessage::class) === false && $class !== PrivateMessage::class)
        ) {
            throw new \TypeError(
                'The given private message model should be a subclass of ' . PrivateMessage::class . ' class.'
            );
        }

        static::$privateMessageModel = $class;
    }

    /**
     * Get the name of the private message model used by the application.
     *
     * @return class-string<\BasementChat\Basement\Models\PrivateMessage>
     */
    public static function privateMessageModel(): string
    {
        return static::$privateMessageModel;
    }

    /**
     * Get a new instance of the private message model.
     */
    public static function newPrivateMessageModel(): PrivateMessage
    {
        return app(static::$privateMessageModel);
    }

    /**
     * Register a class / callback that should be used to get all contacts.
     *
     * @param  class-string<\BasementChat\Basement\Contracts\AllContacts>   $class
     */
    public static function allContactsUsing(string $class): void
    {
        app()->bind(abstract: AllContacts::class, concrete: $class);
    }

    /**
     * Register a class / callback that should be used to get all private messages.
     *
     * @param  class-string<\BasementChat\Basement\Contracts\AllPrivateMessages>   $class
     */
    public static function allPrivateMessagesUsing(string $class): void
    {
        app()->bind(abstract: AllPrivateMessages::class, concrete: $class);
    }

    /**
     * Register a class / callback that should be used to get mark private messages as read.
     *
     * @param  class-string<\BasementChat\Basement\Contracts\MarkPrivatesMessagesAsRead>   $class
     */
    public static function markPrivateMessagesAsReadUsing(string $class): void
    {
        app()->bind(abstract: MarkPrivatesMessagesAsRead::class, concrete: $class);
    }

    /**
     * Register a class / callback that should be used to send a private message.
     *
     * @param  class-string<\BasementChat\Basement\Contracts\SendPrivateMessage>   $class
     */
    public static function sendPrivateMessagesUsing(string $class): void
    {
        app()->bind(abstract: SendPrivateMessage::class, concrete: $class);
    }
}
