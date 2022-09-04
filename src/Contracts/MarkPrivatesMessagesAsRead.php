<?php

namespace Haemanthus\Basement\Contracts;

use Spatie\LaravelData\DataCollection;

interface MarkPrivatesMessagesAsRead
{
    /**
     * Mark given private messages as has been read.
     *
     * @param \Spatie\LaravelData\DataCollection $privateMessages
     * @return \Spatie\LaravelData\DataCollection
     */
    public function markAsRead(DataCollection $privateMessages): DataCollection;
}
