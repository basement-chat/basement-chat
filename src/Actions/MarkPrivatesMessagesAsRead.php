<?php

declare(strict_types=1);

namespace BasementChat\Basement\Actions;

use BasementChat\Basement\Contracts\MarkPrivatesMessagesAsRead as MarkPrivatesMessagesAsReadContract;
use BasementChat\Basement\Data\PrivateMessageData;
use BasementChat\Basement\Events\PrivateMessagesReceivedMarkedAsRead;
use BasementChat\Basement\Events\PrivateMessagesSentMarkedAsRead;
use BasementChat\Basement\Facades\Basement;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Support\Collection;

class MarkPrivatesMessagesAsRead implements MarkPrivatesMessagesAsReadContract
{
    /**
     * Mark given private messages as has been read.
     *
     * @param \Illuminate\Foundation\Auth\User&\BasementChat\Basement\Contracts\User $readBy
     * @param \Illuminate\Support\Collection<int,\BasementChat\Basement\Data\PrivateMessageData> $privateMessages
     *
     * @return \Illuminate\Support\Collection<int,\BasementChat\Basement\Data\PrivateMessageData>
     */
    public function markAsRead(Authenticatable $readBy, Collection $privateMessages): Collection
    {
        $time = now();

        Basement::newPrivateMessageModel()
            ->whereIn('id', $privateMessages->pluck('id'))
            ->whereNull('read_at')
            ->update([
                'read_at' => $time,
            ]);

        $privateMessages->each(static function (PrivateMessageData $data) use ($time): void {
            $data->read_at = $time;
        });

        $this->notify(receiver: $readBy, privateMessages: $privateMessages);

        return $privateMessages;
    }

    /**
     * Notify the sender that the receiver has read private messages. This method also notifies
     * the receiver, so multiple tabs opened by the receiver will synchronize unread messages.
     *
     * @param \Illuminate\Foundation\Auth\User&\BasementChat\Basement\Contracts\User $receiver
     * @param \Illuminate\Support\Collection<int,\BasementChat\Basement\Data\PrivateMessageData> $privateMessages
     */
    protected function notify(Authenticatable $receiver, Collection $privateMessages): void
    {
        $privateMessages
            ->groupBy('sender_id')
            ->tap(function (Collection $groupedMessages) use ($receiver): void {
                broadcast(new PrivateMessagesReceivedMarkedAsRead(
                    receiverId: (int) $receiver->id,
                    messages: $groupedMessages,
                ));
            })
            ->each(static fn (Collection $messages, int $senderId) => broadcast(new PrivateMessagesSentMarkedAsRead(
                receiverId: (int) $receiver->id,
                senderId: (int) $senderId,
                messages: $messages,
            )));
    }
}
