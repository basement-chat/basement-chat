<?php

namespace Haemanthus\Basement\Actions;

use Haemanthus\Basement\Contracts\AllPrivateMessages as AllPrivateMessagesContract;
use Haemanthus\Basement\Data\PrivateMessageData;
use Haemanthus\Basement\Models\PrivateMessage;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Spatie\LaravelData\DataCollection;

class AllPrivateMessages implements AllPrivateMessagesContract
{
    /**
     * The query string variable used to store the cursor.
     */
    protected const CURSOR_NAME = 'basement.page';

    /**
     * The total number of messages displayed per page.
     */
    protected const MESSAGES_PER_PAGE = 50;

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
    ): DataCollection {
        $messages = PrivateMessage::whereBetweenTwoUsers($receiver, $sender)
            ->whereValueLike($keyword)
            ->orderByDescId()
            ->cursorPaginate(perPage: self::MESSAGES_PER_PAGE, cursorName: self::CURSOR_NAME);

        return PrivateMessageData::collection($messages);
    }
}
