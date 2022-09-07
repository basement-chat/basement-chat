<?php

declare(strict_types=1);

namespace BasementChat\Basement\Observers;

use BasementChat\Basement\Models\PrivateMessage;

class PrivateMessageObserver
{
    /**
     * When creating a private message, mark it as read if sent to self.
     */
    public function creating(PrivateMessage $message): void
    {
        if ($message->sender_id === $message->receiver_id) {
            $message->read_at = now();
        }
    }
}
