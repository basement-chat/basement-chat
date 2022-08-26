<?php

namespace Haemanthus\Basement\Traits;

use Haemanthus\Basement\Enums\AvatarStyle;
use Illuminate\Database\Eloquent\Relations\MorphMany;

trait HasPrivateMessages
{
    /**
     * Get the user's avatar.
     *
     * @return string
     */
    public function getAvatarAttribute(): string
    {
        /** @var \Haemanthus\Basement\Enums\AvatarStyle $style */
        $style = config(key: 'basement.avatar.style', default: AvatarStyle::adventurer());

        $key = md5($this->getNameAttribute());

        /** @var array $options */
        $options = config(key: 'basement.avatar.options', default: []);

        $queryString = collect($options)
            ->map(fn (string $option, string $key): string => ("{$key}={$option}"))
            ->join('&');

        return "https://avatars.dicebear.com/api/{$style->value}/{$key}.svg?{$queryString}";
    }

    /**
     * Get the user's name.
     *
     * @return string
     */
    public function getNameAttribute(): string
    {
        return $this->attributes['name'] ?? '';
    }

    /**
     * Get all private messages that the user receives.
     *
     * @return \Illuminate\Database\Eloquent\Relations\MorphMany<\Haemanthus\Basement\Models\PrivateMessage>
     */
    public function privateMessagesReceived(): MorphMany
    {
        /** @var \Illuminate\Database\Eloquent\Model $this */

        return $this->morphMany(related: self::class, name: 'receiver');
    }

    /**
     * Get all private messages sent by the user.
     *
     * @return \Illuminate\Database\Eloquent\Relations\MorphMany<\Haemanthus\Basement\Models\PrivateMessage>
     */
    public function privateMessagesSent(): MorphMany
    {
        /** @var \Illuminate\Database\Eloquent\Model $this */

        return $this->morphMany(related: self::class, name: 'sender');
    }

    /**
     * The channels the user receives notification broadcasts on.
     *
     * @return string
     */
    public function receivesBroadcastNotificationsOn(): string
    {
        /** @var \Illuminate\Database\Eloquent\Model $this */

        return 'basement.users.' . $this->{$this->primaryKey};
    }
}
