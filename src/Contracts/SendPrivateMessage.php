<?php

declare(strict_types=1);

namespace Haemanthus\Basement\Contracts;

use Haemanthus\Basement\Data\PrivateMessageData;

interface SendPrivateMessage
{
    /**
     * Send a private message to the receiver.
     */
    public function send(PrivateMessageData $privateMessage): PrivateMessageData;
}
