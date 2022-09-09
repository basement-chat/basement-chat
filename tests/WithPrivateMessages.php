<?php

declare(strict_types=1);

namespace BasementChat\Basement\Tests;

use BasementChat\Basement\Models\PrivateMessage;
use BasementChat\Basement\Tests\Fixtures\User;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Factories\Sequence;

trait WithPrivateMessages
{
    /**
     * @var \Illuminate\Database\Eloquent\Collection<int,\BasementChat\Basement\Models\PrivateMessage>
     */
    protected ?Collection $privateMessages = null;

    /**
     * Initialize the default value for the $privateMessages class property.
     */
    protected function setUpPrivateMessages(): void
    {
        $this->privateMessages = new Collection();
    }

    /**
     * Add new private messages to the database and append to the $privateMessages class property.
     */
    protected function addPrivateMessages(
        User $receiver,
        User $sender,
        int $count = 1,
        array|Sequence $state = [],
    ): void {
        $privateMessages = PrivateMessage::factory()
            ->count($count)
            ->betweenTwoUsers(receiver: $receiver, sender: $sender)
            ->state($state)
            ->create();

        $this->privateMessages = $this->privateMessages->mergeRecursive($privateMessages);
    }
}
