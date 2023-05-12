<?php

declare(strict_types=1);

namespace BasementChat\Basement\Contracts;

use Illuminate\Contracts\Pagination\CursorPaginator;
use Illuminate\Foundation\Auth\User as Authenticatable;

interface AllPrivateMessages
{
    /**
     * Get all private messages between to a given user list.
     *
     * @param \Illuminate\Foundation\Auth\User&\BasementChat\Basement\Contracts\User $receiver
     * @param \Illuminate\Foundation\Auth\User&\BasementChat\Basement\Contracts\User $sender
     *
     * @return \Illuminate\Contracts\Pagination\CursorPaginator<\BasementChat\Basement\Models\PrivateMessage>
     */
    public function allBetweenTwoUsers(
        Authenticatable $receiver,
        Authenticatable $sender,
        string $keyword = '',
    ): CursorPaginator;
}
