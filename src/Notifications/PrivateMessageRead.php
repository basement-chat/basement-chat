<?php

declare(strict_types=1);

namespace Haemanthus\Basement\Notifications;

use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Messages\BroadcastMessage;
use Illuminate\Notifications\Notification;
use Illuminate\Support\Collection;

class PrivateMessageRead extends Notification implements ShouldBroadcast
{
    /**
     * Message sender id.
     */
    protected int $senderId;

    /**
     * List of read messages id.
     *
     * @var array<mixed>
     */
    protected array $privateMessages;

    /**
     * Create a new notification instance.
     *
     * @param \Illuminate\Foundation\Auth\User&\Haemanthus\Basement\Contracts\User $sender
     * @param \Illuminate\Support\Collection<int,\Haemanthus\Basement\Data\PrivateMessageData> $privateMessages
     */
    public function __construct(Authenticatable $sender, Collection $privateMessages)
    {
        $this->senderId = $sender->id;
        $this->privateMessages = $privateMessages->toArray();
    }

    /**
     * The event's broadcast name.
     */
    public function broadcastAs(): string
    {
        return 'basement.message.read';
    }

    /**
     * Get the channels the event should broadcast on.
     */
    public function broadcastOn(): PresenceChannel|array
    {
        return new PresenceChannel('basement.contact.' . $this->senderId);
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
            'messages' => $this->privateMessages,
        ]);
    }
}
