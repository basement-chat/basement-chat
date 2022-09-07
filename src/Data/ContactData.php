<?php

declare(strict_types=1);

namespace BasementChat\Basement\Data;

use Spatie\LaravelData\Data;
use Spatie\TypeScriptTransformer\Attributes\TypeScript;

#[TypeScript]
class ContactData extends Data
{
    /**
     * Create a new contact data instance.
     */
    public function __construct(
        public int $id,
        public string $name,
        public string $avatar,
        public ?PrivateMessageData $last_private_message,
        public int $unread_messages = 0,
    ) {
    }
}
