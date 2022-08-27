<?php

namespace Haemanthus\Basement\Contracts;

use Illuminate\Foundation\Auth\User as Authenticatable;
use Spatie\LaravelData\DataCollection;

interface AllPrivateMessages
{
    /**
     * Get all private messages between to a given user list.
     *
     * @param \Illuminate\Foundation\Auth\User & \Haemanthus\Basement\Contracts\User $receiver
     * @param \Illuminate\Foundation\Auth\User & \Haemanthus\Basement\Contracts\User $sender
     *
     * @return \Spatie\LaravelData\DataCollection
     */
    public function allBetweenTwoUsers(
        Authenticatable $receiver,
        Authenticatable $sender,
        string $keyword = '',
    ): DataCollection;
}
