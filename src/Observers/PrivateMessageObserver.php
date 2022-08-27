<?php

namespace Haemanthus\Basement\Observers;

use Haemanthus\Basement\Models\PrivateMessage;

class PrivateMessageObserver
{
    /**
     * Handle the PrivateMessage "creating" event.
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
