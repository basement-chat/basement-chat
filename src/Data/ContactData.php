<?php

namespace Haemanthus\Basement\Data;

use Spatie\LaravelData\Data;

class ContactData extends Data
{
    /**
     * Create a new contact data instance.
     *
     * @param int $id
     * @param string $name
     * @param string $avatar
     * @param \Haemanthus\Basement\Data\PrivateMessageData|null $last_private_message
     */
    public function __construct(
        public int $id,
        public string $name,
        public string $avatar,
        public ?PrivateMessageData $last_private_message,
    ) {
    }
}
