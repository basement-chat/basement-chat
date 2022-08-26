<?php

namespace Haemanthus\Basement\Data;

use Haemanthus\Basement\Casts\MessageTypeCast;
use Haemanthus\Basement\Enums\MessageType;
use Illuminate\Support\Carbon;
use Spatie\LaravelData\Attributes\WithCast;
use Spatie\LaravelData\Data;

class PrivateMessageData extends Data
{
    /**
     * Create a new private message data instance.
     *
     * @param integer $id
     * @param integer $receiver_id
     * @param integer $sender_id
     * @param \Haemanthus\Basement\Enums\MessageType $type
     * @param string $value
     * @param \Illuminate\Support\Carbon|null $seen_at
     */
    public function __construct(
        public int $id,
        public int $receiver_id,
        public int $sender_id,
        #[WithCast(MessageTypeCast::class)]
        public MessageType $type,
        public string $value,
        public ?Carbon $seen_at
    ) {
    }
}
