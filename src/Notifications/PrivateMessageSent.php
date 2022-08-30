<?php

namespace Haemanthus\Basement\Notifications;

use Haemanthus\Basement\Data\PrivateMessageData;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Messages\BroadcastMessage;
use Illuminate\Notifications\Notification;

class PrivateMessageSent extends Notification implements ShouldBroadcast
{
    /**
     * Message receiver id.
     *
     * @var int
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
     * @param \Illuminate\Foundation\Auth\User&\Haemanthus\Basement\Contracts\User $receiver
     * @param \Haemanthus\Basement\Data\PrivateMessageData $privateMessage
     */
    public function __construct(Authenticatable $receiver, PrivateMessageData $privateMessage)
    {
        $this->receiverId = $receiver->id;
        $this->privateMessage = $privateMessage->toArray();
    }

    /**
     * The event's broadcast name.
     *
     * @return string
     */
    public function broadcastAs(): string
    {
        return 'basement.message.sent';
    }

    /**
     * Get the channels the event should broadcast on.
     *
     * @return \Illuminate\Broadcasting\PresenceChannel|array
     */
    public function broadcastOn(): PresenceChannel|array
    {
        return new PresenceChannel('basement.contact.' . $this->receiverId);
    }

    /**
     * Get the notification's delivery channels.
     *
     * @param  mixed  $notifiable
     * @return array
     */
    public function via($notifiable): array
    {
        return ['broadcast'];
    }

    /**
     * Get the broadcastable representation of the notification.
     *
     * @param  mixed  $notifiable
     * @return \Illuminate\Notifications\Messages\BroadcastMessage
     */
    public function toBroadcast($notifiable): BroadcastMessage
    {
        return new BroadcastMessage([
            'message' => $this->privateMessage,
        ]);
    }
}
