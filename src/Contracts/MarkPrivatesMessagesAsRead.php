<?php

declare(strict_types=1);

namespace BasementChat\Basement\Contracts;

use Illuminate\Foundation\Auth\User as Authenticatable;
use Spatie\LaravelData\DataCollection;

interface MarkPrivatesMessagesAsRead
{
    /**
     * Mark given private messages as has been read.
     *
     * @param \Illuminate\Foundation\Auth\User&\BasementChat\Basement\Contracts\User $readBy
     */
    public function markAsRead(Authenticatable $readBy, DataCollection $privateMessages): DataCollection;
}
