<?php

declare(strict_types=1);

namespace BasementChat\Basement\Actions;

use BasementChat\Basement\Contracts\AllPrivateMessages as AllPrivateMessagesContract;
use BasementChat\Basement\Facades\Basement;
use Illuminate\Contracts\Pagination\CursorPaginator;
use Illuminate\Foundation\Auth\User as Authenticatable;

class AllPrivateMessages implements AllPrivateMessagesContract
{
    /**
     * The total number of messages displayed per page.
     */
    protected const MESSAGES_PER_PAGE = 50;

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
    ): CursorPaginator {
        return Basement::newPrivateMessageModel()
            ->whereBetweenTwoUsers($receiver, $sender)
            ->whereValueLike($keyword)
            ->orderByDescId()
            ->cursorPaginate(self::MESSAGES_PER_PAGE);
    }
}
