<?php

namespace Haemanthus\Basement\Contracts;

use Illuminate\Database\Eloquent\Relations\MorphMany;

/**
 * @property int $id
 * @property string|null $name
 * @property string $avatar
 */
interface User
{
    /**
     * Get the user's avatar.
     *
     * @return string
     */
    public function getAvatarAttribute(): string;

    /**
     * Get the user's name.
     *
     * @return string
     */
    public function getNameAttribute(): string;

    /**
     * Get all private messages that the user receives.
     *
     * @return \Illuminate\Database\Eloquent\Relations\MorphMany
     */
    public function privateMessagesReceived(): MorphMany;

    /**
     * Get all private messages sent by the user.
     *
     * @return \Illuminate\Database\Eloquent\Relations\MorphMany
     */
    public function privateMessagesSent(): MorphMany;

    /**
     * The channels the user receives notification broadcasts on.
     *
     * @return string
     */
    public function receivesBroadcastNotificationsOn(): string;
}
