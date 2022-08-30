<?php

namespace Haemanthus\Basement\Contracts;

use Haemanthus\Basement\Data\PrivateMessageData;

interface SendPrivateMessage
{
    /**
     * Send a private message to the receiver.
     *
     * @param \Haemanthus\Basement\Data\PrivateMessageData $privateMessage
     * @return \Haemanthus\Basement\Data\PrivateMessageData
     */
    public function send(PrivateMessageData $privateMessage): PrivateMessageData;
}
