<?php

declare(strict_types=1);

namespace BasementChat\Basement\Events;

use BasementChat\Basement\Data\PrivateMessageData;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;

class PrivateMessageSent implements ShouldBroadcast
{
    /**
     * The message receiver id.
     */
    protected int $receiverId;

    /**
     * The value of the private message sent.
     *
     * @var array<string,mixed>
     */
    public array $detail;

    /**
     * Create a new notification instance.
     */
    public function __construct(PrivateMessageData $message)
    {
        $this->receiverId = $message->receiver_id;
        $this->detail = $message->toArray();

        /** @var \Illuminate\Foundation\Auth\User&\BasementChat\Basement\Contracts\User */
        $sender = $message->sender->resolve();

        $this->detail['sender'] = $sender->only(['id', 'name', 'avatar']);
    }

    /**
     * The event's broadcast name.
     */
    public function broadcastAs(): string
    {
        return 'basement.message.sent';
    }

    /**
     * Get the channels the event should broadcast on.
     */
    public function broadcastOn(): PresenceChannel|array
    {
        return new PresenceChannel('basement.contacts.' . $this->receiverId);
    }
}
