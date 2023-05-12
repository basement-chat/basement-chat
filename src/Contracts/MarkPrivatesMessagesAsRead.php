<?php

declare(strict_types=1);

namespace BasementChat\Basement\Contracts;

use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Support\Collection;

interface MarkPrivatesMessagesAsRead
{
    /**
     * Mark given private messages as has been read.
     *
     * @param \Illuminate\Foundation\Auth\User&\BasementChat\Basement\Contracts\User $readBy
     * @param \Illuminate\Support\Collection<int,\BasementChat\Basement\Data\PrivateMessageData> $privateMessages
     *
     * @return \Illuminate\Support\Collection<int,\BasementChat\Basement\Data\PrivateMessageData>
     */
    public function markAsRead(Authenticatable $readBy, Collection $privateMessages): Collection;
}
