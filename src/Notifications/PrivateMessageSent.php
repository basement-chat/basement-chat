<?php

declare(strict_types=1);

namespace BasementChat\Basement\Notifications;

use BasementChat\Basement\Data\PrivateMessageData;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Messages\BroadcastMessage;
use Illuminate\Notifications\Notification;

class PrivateMessageSent extends Notification implements ShouldBroadcast
{
    /**
     * Message receiver id.
     */
    protected int $receiverId;

    /**
     * The value of the private message sent.
     *
     * @var array<string,mixed>
     */
    protected array $privateMessage;

    /**
     * Create a new notification instance.
     *
     * @param \Illuminate\Foundation\Auth\User&\BasementChat\Basement\Contracts\User $receiver
     */
    public function __construct(Authenticatable $receiver, PrivateMessageData $privateMessage)
    {
        $this->receiverId = $receiver->id;
        $this->privateMessage = $privateMessage->toArray();
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
        return new PresenceChannel('basement.contact.' . $this->receiverId);
    }

    /**
     * Get the notification's delivery channels.
     *
     * @return array<string>
     */
    public function via(mixed $notifiable): array
    {
        return ['broadcast'];
    }

    /**
     * Get the broadcastable representation of the notification.
     */
    public function toBroadcast(mixed $notifiable): BroadcastMessage
    {
        return new BroadcastMessage([
            'message' => $this->privateMessage,
        ]);
    }
}
