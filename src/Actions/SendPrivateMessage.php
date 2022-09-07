<?php

declare(strict_types=1);

namespace BasementChat\Basement\Actions;

use BasementChat\Basement\Contracts\SendPrivateMessage as SendPrivateMessageContract;
use BasementChat\Basement\Data\PrivateMessageData;
use BasementChat\Basement\Facades\Basement;
use BasementChat\Basement\Notifications\PrivateMessageSent;
use Illuminate\Support\Facades\Notification;

class SendPrivateMessage implements SendPrivateMessageContract
{
    /**
     * Send a private message to the receiver.
     */
    public function send(PrivateMessageData $privateMessage): PrivateMessageData
    {
        $createdMessage = Basement::newPrivateMessageModel()->create([
            'receiver_id' => $privateMessage->receiver_id,
            'sender_id' => $privateMessage->sender_id,
            'type' => $privateMessage->type,
            'value' => $privateMessage->value,
        ]);

        $privateMessage->id = $createdMessage->id;
        $privateMessage->created_at = $createdMessage->created_at;
        $privateMessage->read_at = $createdMessage->read_at;

        $this->notifyReceiver($privateMessage);

        return $privateMessage;
    }

    /**
     * Notify receiver that a new message has been sent.
     */
    protected function notifyReceiver(PrivateMessageData $privateMessage): void
    {
        /** @var \Illuminate\Foundation\Auth\User&\BasementChat\Basement\Contracts\User $receiver */
        $receiver = $privateMessage->receiver->resolve();

        Notification::send(
            notifiables: $receiver,
            notification: new PrivateMessageSent(
                receiver: $receiver,
                privateMessage: $privateMessage,
            ),
        );
    }
}
