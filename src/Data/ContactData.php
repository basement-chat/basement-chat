<?php

declare(strict_types=1);

namespace BasementChat\Basement\Data;

use Illuminate\Contracts\Support\Arrayable;

/**
 * @implements Arrayable<string,mixed>
 */
class ContactData implements Arrayable
{
    /**
     * Create a new contact data instance.
     */
    public function __construct(
        public int $id,
        public string $name,
        public string $avatar,
        public ?PrivateMessageData $last_private_message = null,
        public int $unread_messages = 0,
    ) {
    }

    /**
     * Get the instance as an array.
     *
     * @return array<string,mixed>
     */
    public function toArray(): array
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'avatar' => $this->avatar,
            'last_private_message' => $this->last_private_message?->toArray(),
            'unread_messages' => $this->unread_messages,
        ];
    }
}
