<?php

declare(strict_types=1);

namespace BasementChat\Basement\Events;

use BasementChat\Basement\Data\PrivateMessageData;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcastNow;
use Illuminate\Support\Collection;

class PrivateMessagesReceivedMarkedAsRead implements ShouldBroadcastNow
{
    /**
     * The value of the private message sent.
     *
     * @var array<string,mixed>
     */
    public array $detail;

    /**
     * Create a new notification instance.
     *
     * @param Collection<array-key,Collection<array-key,PrivateMessageData>> $messages
     */
    public function __construct(
        protected int $receiverId,
        Collection $messages,
    ) {
        $this->detail = [
            'messages' => $messages
                ->map(fn (Collection $messages, int $senderId): array => [
                    'sender_id' => $senderId,
                    'total' => $messages->count(),
                ])
                ->values()
                ->toArray(),
        ];
    }

    /**
     * The event's broadcast name.
     */
    public function broadcastAs(): string
    {
        return 'basement.message.received-messages-marked-as-read';
    }

    /**
     * Get the channels the event should broadcast on.
     */
    public function broadcastOn(): PresenceChannel|array
    {
        return new PresenceChannel('basement.contacts.' . $this->receiverId);
    }
}
