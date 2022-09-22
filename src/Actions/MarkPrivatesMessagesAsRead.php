<?php

declare(strict_types=1);

namespace BasementChat\Basement\Actions;

use BasementChat\Basement\Contracts\MarkPrivatesMessagesAsRead as MarkPrivatesMessagesAsReadContract;
use BasementChat\Basement\Data\PrivateMessageData;
use BasementChat\Basement\Events\PrivateMessageRead;
use BasementChat\Basement\Facades\Basement;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Support\Collection;
use Spatie\LaravelData\DataCollection;

class MarkPrivatesMessagesAsRead implements MarkPrivatesMessagesAsReadContract
{
    /**
     * Mark given private messages as has been read.
     *
     * @param \Illuminate\Foundation\Auth\User&\BasementChat\Basement\Contracts\User $readBy
     */
    public function markAsRead(Authenticatable $readBy, DataCollection $privateMessages): DataCollection
    {
        $time = now();

        Basement::newPrivateMessageModel()
            ->whereIn('id', $privateMessages->toCollection()->pluck('id'))
            ->whereNull('read_at')
            ->update([
                'read_at' => $time,
            ]);

        /** @var \Illuminate\Support\Collection<int,\BasementChat\Basement\Data\PrivateMessageData> $messages */
        $messages = $privateMessages->toCollection();

        $messages->each(static function (PrivateMessageData $data) use ($time): void {
            $data->read_at = $time;
        });

        $this->notifySenders(receiver: $readBy, privateMessages: $messages);

        return $privateMessages;
    }

    /**
     * Notify the sender that the receiver has read private messages.
     *
     * @param \Illuminate\Foundation\Auth\User&\BasementChat\Basement\Contracts\User $receiver
     * @param \Illuminate\Support\Collection<int,\BasementChat\Basement\Data\PrivateMessageData> $privateMessages
     */
    protected function notifySenders(Authenticatable $receiver, Collection $privateMessages): void
    {
        $privateMessages
            ->groupBy('sender_id')
            ->each(static fn (Collection $messages, int $senderId) => broadcast(new PrivateMessageRead(
                receiverId: $receiver->id,
                senderId: $senderId,
                messages: $messages,
            )));
    }
}
