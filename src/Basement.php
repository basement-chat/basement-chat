<?php

namespace Haemanthus\Basement;

use App\Models\User;
use Haemanthus\Basement\Contracts\Basement as BasementContract;
use Haemanthus\Basement\Enums\AvatarStyle;

class Basement implements BasementContract
{
    /**
     * Get the user avatar.
     *
     * @param string $key
     * @return string
     */
    public static function avatar(string $key): string
    {
        /** @var string $style */
        $style = config(key: 'basement.avatar.style', default: AvatarStyle::ADVENTURER);

        /** @var array $options */
        $options = config(key: 'basement.avatar.options', default: []);

        $queryString = collect($options)
            ->map(fn (string $option, string $key): string => ("{$key}={$option}"))
            ->join('&');

        return self::AVATAR_BASE_URI . "api/{$style}/" . md5($key) . ".svg?{$queryString}";
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
