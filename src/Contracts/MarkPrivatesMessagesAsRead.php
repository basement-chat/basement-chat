<?php

declare(strict_types=1);

namespace Haemanthus\Basement\Contracts;

use Spatie\LaravelData\DataCollection;

interface MarkPrivatesMessagesAsRead
{
    /**
     * Mark given private messages as has been read.
     */
    public function markAsRead(DataCollection $privateMessages): DataCollection;
}
