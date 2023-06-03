<?php

declare(strict_types=1);

namespace BasementChat\Basement\Events;

use BasementChat\Basement\Data\PrivateMessageData;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcastNow;
use Illuminate\Support\Collection;

class PrivateMessagesSentMarkedAsRead implements ShouldBroadcastNow
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
     * @param \Illuminate\Support\Collection<int,\BasementChat\Basement\Data\PrivateMessageData> $messages
     */
    public function __construct(
        protected int $receiverId,
        protected int $senderId,
        Collection $messages,
    ) {
        $this->detail = [
            'receiver' => [
                'id' => $receiverId,
            ],
            'messages' => $messages->map(static fn (PrivateMessageData $data): array => [
                'id' => $data->id,
                'read_at' => $data->read_at,
            ])->toArray(),
        ];
    }

    /**
     * The event's broadcast name.
     */
    public function broadcastAs(): string
    {
        return 'basement.message.sent-messages-marked-as-read';
    }

    /**
     * Get the channels the event should broadcast on.
     */
    public function broadcastOn(): PresenceChannel|array
    {
        return new PresenceChannel('basement.contacts.' . $this->senderId);
    }
}
