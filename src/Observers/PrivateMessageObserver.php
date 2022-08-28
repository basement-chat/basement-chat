<?php

namespace Haemanthus\Basement\Observers;

use Haemanthus\Basement\Models\PrivateMessage;

class PrivateMessageObserver
{
    /**
     * When creating a private message, mark it as read if sent to self.
     *
     * @param  \Haemanthus\Basement\Models\PrivateMessage  $message
     * @return void
     */
    public function creating(PrivateMessage $message): void
    {
        if ($message->sender_id === $message->receiver_id) {
            $message->seen_at = now();
        }
    }
}
