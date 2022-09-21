<?php

declare(strict_types=1);

namespace BasementChat\Basement\Events;

use BasementChat\Basement\Data\PrivateMessageData;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Support\Collection;

class PrivateMessageRead implements ShouldBroadcast
{
    /**
     * The message sender id.
     */
    protected int $senderId;

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
    public function __construct(Collection $messages)
    {
        $this->senderId = $messages[0]->sender_id;
        $this->detail = [
            'receiver' => [
                'id' => $messages[0]->receiver_id,
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
