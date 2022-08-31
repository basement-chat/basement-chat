<?php

namespace Haemanthus\Basement;

use Haemanthus\Basement\Contracts\AllContacts;
use Haemanthus\Basement\Contracts\AllPrivateMessages;
use Haemanthus\Basement\Contracts\Basement as BasementContract;
use Haemanthus\Basement\Contracts\MarkPrivatesMessagesAsRead;
use Haemanthus\Basement\Contracts\SendPrivateMessage;
use Haemanthus\Basement\Contracts\User as UserContract;
use Haemanthus\Basement\Models\PrivateMessage;
use Illuminate\Foundation\Auth\User as Authenticatable;

class Basement implements BasementContract
{
    /**
     * The user model used by the application.
     *
     * @var string
     * @phpstan-var class-string<\Illuminate\Foundation\Auth\User>&class-string<\Haemanthus\Basement\Contracts\User>
     */
    protected static string $userModel;

    /**
     * The private message model used by the application.
     *
     * @var string
     * @phpstan-var class-string<\Haemanthus\Basement\Models\PrivateMessage>
     */
    protected static string $privateMessageModel;

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
     * @return class-string<\Illuminate\Foundation\Auth\User>&class-string<\Haemanthus\Basement\Contracts\User>
     */
    public static function userModel(): string
    {
        return static::$userModel;
    }

    /**
     * Get a new instance of the user model.
     *
     * @return \Illuminate\Foundation\Auth\User&\Haemanthus\Basement\Contracts\User
     */
    public static function newUserModel(): Authenticatable
    {
        return app(static::$userModel);
    }

    /**
     * Specify the private message model used by the application.
     *
     * @param mixed $class
     * @return void
     *
     * @throws \TypeError if the given user model is not a subclass of \Haemanthus\Basement\Models\PrivateMessage.
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
     * @return class-string<\Haemanthus\Basement\Models\PrivateMessage>
     */
    public static function privateMessageModel(): string
    {
        return static::$privateMessageModel;
    }

    /**
     * Get a new instance of the private message model.
     *
     * @return \Haemanthus\Basement\Models\PrivateMessage
     */
    public static function newPrivateMessageModel(): PrivateMessage
    {
        return app(static::$privateMessageModel);
    }

    /**
     * Register a class / callback that should be used to get all contacts.
     *
     * @param  class-string<\Haemanthus\Basement\Contracts\AllContacts>   $class
     * @return void
     */
    public static function allContactsUsing(string $class): void
    {
        app()->bind(abstract: AllContacts::class, concrete: $class);
    }

    /**
     * Register a class / callback that should be used to get all private messages.
     *
     * @param  class-string<\Haemanthus\Basement\Contracts\AllPrivateMessages>   $class
     * @return void
     */
    public static function allPrivateMessagesUsing(string $class): void
    {
        app()->bind(abstract: AllPrivateMessages::class, concrete: $class);
    }

    /**
     * Register a class / callback that should be used to get mark private messages as read.
     *
     * @param  class-string<\Haemanthus\Basement\Contracts\MarkPrivatesMessagesAsRead>   $class
     * @return void
     */
    public static function markPrivateMessagesAsReadUsing(string $class): void
    {
        app()->bind(abstract: MarkPrivatesMessagesAsRead::class, concrete: $class);
    }

    /**
     * Register a class / callback that should be used to send a private message.
     *
     * @param  class-string<\Haemanthus\Basement\Contracts\SendPrivateMessage>   $class
     * @return void
     */
    public static function sendPrivateMessagesUsing(string $class): void
    {
        app()->bind(abstract: SendPrivateMessage::class, concrete: $class);
    }
}
