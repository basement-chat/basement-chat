<?php

declare(strict_types=1);

namespace BasementChat\Basement\Actions;

use BasementChat\Basement\Contracts\MarkPrivatesMessagesAsRead as MarkPrivatesMessagesAsReadContract;
use BasementChat\Basement\Data\PrivateMessageData;
use BasementChat\Basement\Facades\Basement;
use BasementChat\Basement\Events\PrivateMessageRead;
use Illuminate\Support\Collection;
use Spatie\LaravelData\DataCollection;

class MarkPrivatesMessagesAsRead implements MarkPrivatesMessagesAsReadContract
{
    /**
     * Mark given private messages as has been read.
     */
    public function markAsRead(DataCollection $privateMessages): DataCollection
    {
        $time = now();

        Basement::newPrivateMessageModel()
            ->whereIn('id', $privateMessages->toCollection()->pluck('id'))
            ->whereNull('read_at')
            ->update([
                'read_at' => $time,
            ]);

        $privateMessages
            ->toCollection()
            ->each(static function (PrivateMessageData $data) use ($time): void {
                $data->read_at = $time;
            });

        $this->notifySenders($privateMessages);

        return $privateMessages;
    }

    /**
     * Notify the sender that the receiver has read private messages.
     */
    protected function notifySenders(DataCollection $privateMessages): void
    {
        /** @var \Illuminate\Support\Collection<int,\BasementChat\Basement\Data\PrivateMessageData> $collection */
        $collection = $privateMessages->toCollection();

        $collection
            ->groupBy('sender_id')
            ->each(static fn (Collection $messages) => broadcast(new PrivateMessageRead($messages)));
    }
}
