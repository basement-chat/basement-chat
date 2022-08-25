<?php

namespace Haemanthus\Basement\Contracts;

interface Basement
{
    /**
     * Specify the user model used by the application.
     *
     * @param string $class
     * @return void
     */
    public static function useUserModel(string $class): void;

    /**
     * Get the name of the user model used by the application.
     *
     * @return string
     */
    public static function userModel(): string;
}
