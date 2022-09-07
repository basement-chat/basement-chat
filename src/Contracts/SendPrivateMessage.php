<?php

declare(strict_types=1);

namespace BasementChat\Basement\Contracts;

use BasementChat\Basement\Data\PrivateMessageData;

interface SendPrivateMessage
{
    /**
     * Send a private message to the receiver.
     */
    public function send(PrivateMessageData $privateMessage): PrivateMessageData;
}
