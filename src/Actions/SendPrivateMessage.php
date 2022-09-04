<?php

namespace Haemanthus\Basement\Actions;

use Haemanthus\Basement\Contracts\SendPrivateMessage as SendPrivateMessageContract;
use Haemanthus\Basement\Data\PrivateMessageData;
use Haemanthus\Basement\Facades\Basement;
use Haemanthus\Basement\Notifications\PrivateMessageSent;
use Illuminate\Support\Facades\Notification;

class SendPrivateMessage implements SendPrivateMessageContract
{
    /**
     * Notify receiver that a new message has been sent.
     *
     * @param \Haemanthus\Basement\Data\PrivateMessageData $privateMessage
     * @return void
     */
    protected function notifyReceiver(PrivateMessageData $privateMessage): void
    {
        /** @var \Illuminate\Foundation\Auth\User&\Haemanthus\Basement\Contracts\User $receiver */
        $receiver = $privateMessage->receiver->resolve();

        Notification::send(
            notifiables: $receiver,
            notification: new PrivateMessageSent(
                receiver: $receiver,
                privateMessage: $privateMessage,
            ),
        );
    }

    /**
     * Send a private message to the receiver.
     *
     * @param \Haemanthus\Basement\Data\PrivateMessageData $privateMessage
     * @return \Haemanthus\Basement\Data\PrivateMessageData
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
}
