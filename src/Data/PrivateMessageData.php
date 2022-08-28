<?php

namespace Haemanthus\Basement\Data;

use Haemanthus\Basement\Enums\MessageType;
use Haemanthus\Basement\Facades\Basement;
use Illuminate\Support\Carbon;
use Spatie\LaravelData\Data;
use Spatie\LaravelData\DataCollection;

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
     * @param \Illuminate\Support\Carbon|null $created_at
     * @param \Illuminate\Support\Carbon|null $seen_at
     */
    public function __construct(
        public int $id,
        public int $receiver_id,
        public int $sender_id,
        public MessageType $type,
        public string $value,
        public ?Carbon $created_at,
        public ?Carbon $seen_at,
    ) {
    }

    /**
     * Create data collection from given messages id.
     *
     * @param int ...$id
     * @return \Spatie\LaravelData\DataCollection
     */
    public static function collectionFromId(int ...$id): DataCollection
    {
        return self::collection(Basement::newPrivateMessageModel()->whereIn('id', $id)->get());
    }
}
