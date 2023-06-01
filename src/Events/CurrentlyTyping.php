<?php

declare(strict_types=1);

namespace BasementChat\Basement\Events;

use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcastNow;

class CurrentlyTyping implements ShouldBroadcastNow
{
    /**
     * The value of the user who currently typing a message.
     *
     * @var array<string,mixed>
     */
    public array $detail;

    /**
     * Create a new notification instance.
     */
    public function __construct(
        int $senderId,
        protected int $receiverId,
    ) {
        $this->detail = [
            'contact' => [
                'id' => $senderId,
                'typing' => true,
            ],
        ];
    }

    /**
     * The event's broadcast name.
     */
    public function broadcastAs(): string
    {
        return 'basement.contact.currently-typing';
    }

    /**
     * Get the channels the event should broadcast on.
     */
    public function broadcastOn(): PresenceChannel|array
    {
        return new PresenceChannel('basement.contacts.' . $this->receiverId);
    }
}
