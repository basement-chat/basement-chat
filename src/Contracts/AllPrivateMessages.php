<?php

declare(strict_types=1);

namespace BasementChat\Basement\Contracts;

use Illuminate\Foundation\Auth\User as Authenticatable;
use Spatie\LaravelData\DataCollection;

interface AllPrivateMessages
{
    /**
     * Get all private messages between to a given user list.
     *
     * @param \Illuminate\Foundation\Auth\User&\BasementChat\Basement\Contracts\User $receiver
     * @param \Illuminate\Foundation\Auth\User&\BasementChat\Basement\Contracts\User $sender
     */
    public function allBetweenTwoUsers(
        Authenticatable $receiver,
        Authenticatable $sender,
        string $keyword = '',
    ): DataCollection;
}
