<?php

namespace Haemanthus\Basement\Actions;

use Haemanthus\Basement\Contracts\MarkPrivatesMessagesAsRead as MarkPrivatesMessagesAsReadContract;
use Haemanthus\Basement\Facades\Basement;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Support\Facades\Gate;
use Spatie\LaravelData\DataCollection;

class MarkPrivatesMessagesAsRead implements MarkPrivatesMessagesAsReadContract
{
    /**
     * Mark given private messages as has been read.
     *
     * @param \Spatie\LaravelData\DataCollection $privateMessages
     * @return \Spatie\LaravelData\DataCollection
     */
    public function markAsRead(DataCollection $privateMessages): DataCollection
    {
        Gate::authorize('mark-as-read', $privateMessages);

        Basement::newPrivateMessageModel()
            ->whereIn('id', $privateMessages->toCollection()->pluck('id'))
            ->whereNull('seen_at')
            ->update([
                'seen_at' => now(),
            ]);

        return $privateMessages;
    }
}
