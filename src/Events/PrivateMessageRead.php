<?php

declare(strict_types=1);

namespace BasementChat\Basement\Events;

use BasementChat\Basement\Data\PrivateMessageData;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcastNow;
use Illuminate\Support\Collection;

class PrivateMessageRead implements ShouldBroadcastNow
{
    /**
     * The value of the private message sent.
     *
     * @var array<string,mixed>
     */
    public array $detail;

    /**
     * The message sender id.
     */
    protected int $senderId;

    /**
     * Create a new notification instance.
     *
     * @param \Illuminate\Support\Collection<int,\BasementChat\Basement\Data\PrivateMessageData> $messages
     */
    public function __construct(
        int $receiverId,
        int $senderId,
        Collection $messages,
    ) {
        $this->senderId = $senderId;
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
        return 'basement.message.marked-as-read';
    }

    /**
     * Get the channels the event should broadcast on.
     */
    public function broadcastOn(): PresenceChannel|array
    {
        return new PresenceChannel('basement.contacts.' . $this->senderId);
    }
}
