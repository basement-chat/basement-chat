<?php

namespace Haemanthus\Basement\Actions;

use Haemanthus\Basement\Contracts\MarkPrivatesMessagesAsRead as MarkPrivatesMessagesAsReadContract;
use Haemanthus\Basement\Data\PrivateMessageData;
use Haemanthus\Basement\Facades\Basement;
use Haemanthus\Basement\Notifications\PrivateMessageRead;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\Facades\Notification;
use Spatie\LaravelData\DataCollection;

class MarkPrivatesMessagesAsRead implements MarkPrivatesMessagesAsReadContract
{
    /**
     * Notify the sender that the receiver has read private messages.
     *
     * @param \Spatie\LaravelData\DataCollection $privateMessages
     * @return void
     */
    protected function notifySenders(DataCollection $privateMessages): void
    {
        /** @var \Illuminate\Support\Collection<int,\Haemanthus\Basement\Data\PrivateMessageData> $collection */
        $collection = $privateMessages->toCollection();

        /** @var \Illuminate\Support\Collection<int,\Illuminate\Foundation\Auth\User&\Haemanthus\Basement\Contracts\User> $senders */
        $senders = $collection->pluck('sender')->unique();

        $senders->each(fn (Authenticatable $sender) => Notification::sendNow(
            notifiables: $sender,
            notification: new PrivateMessageRead(
                sender: $sender,
                privateMessages: $collection->filter(fn (PrivateMessageData $data): bool => $data->id === $sender->id),
            ),
        ));
    }

    /**
     * Mark given private messages as has been read.
     *
     * @param \Illuminate\Foundation\Auth\User&\Haemanthus\Basement\Contracts\User $receiver
     * @param \Spatie\LaravelData\DataCollection $privateMessages
     * @return \Spatie\LaravelData\DataCollection
     */
    public function markAsRead(Authenticatable $receiver, DataCollection $privateMessages): DataCollection
    {
        Gate::forUser($receiver)->authorize('mark-as-read', $privateMessages);

        Basement::newPrivateMessageModel()
            ->whereIn('id', $privateMessages->toCollection()->pluck('id'))
            ->whereNull('read_at')
            ->update([
                'read_at' => now(),
            ]);

        $this->notifySenders($privateMessages);

        return $privateMessages;
    }
}
