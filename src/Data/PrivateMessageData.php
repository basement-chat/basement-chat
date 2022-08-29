<?php

namespace Haemanthus\Basement\Data;

use Haemanthus\Basement\Enums\MessageType;
use Haemanthus\Basement\Facades\Basement;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Support\Carbon;
use Spatie\LaravelData\Data;
use Spatie\LaravelData\DataCollection;

class PrivateMessageData extends Data
{
    /**
     * Create a new private message data instance.
     *
     * @param int $id
     * @param int $receiver_id
     * @param \Illuminate\Foundation\Auth\User&\Haemanthus\Basement\Contracts\User|null $receiver
     * @param int $sender_id
     * @param \Illuminate\Foundation\Auth\User&\Haemanthus\Basement\Contracts\User|null $sender
     * @param \Haemanthus\Basement\Enums\MessageType $type
     * @param string $value
     * @param \Illuminate\Support\Carbon|null $created_at
     * @param \Illuminate\Support\Carbon|null $read_at
     */
    public function __construct(
        public int $id,
        public int $receiver_id,
        public ?Authenticatable $receiver,
        public int $sender_id,
        public ?Authenticatable $sender,
        public MessageType $type,
        public string $value,
        public ?Carbon $created_at,
        public ?Carbon $read_at,
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
        $messages = Basement::newPrivateMessageModel()
            ->with('sender')
            ->whereIn('id', $id)
            ->get();

        return self::collection($messages);
    }
}
