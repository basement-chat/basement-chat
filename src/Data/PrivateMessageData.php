<?php

namespace Haemanthus\Basement\Data;

use Haemanthus\Basement\Casts\AsMessageType;
use Haemanthus\Basement\Enums\MessageType;
use Haemanthus\Basement\Facades\Basement;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Support\Carbon;
use Spatie\LaravelData\Attributes\WithCast;
use Spatie\LaravelData\Data;
use Spatie\LaravelData\DataCollection;
use Spatie\LaravelData\Lazy;

/**
 * @property Spatie\LaravelData\Lazy $receiver
 * @property Spatie\LaravelData\Lazy $sender
 */
class PrivateMessageData extends Data
{
    /**
     * Create a new private message data instance.
     *
     * @param int|null $id
     * @param int $receiver_id
     * @param int $sender_id
     * @param \Haemanthus\Basement\Enums\MessageType $type
     * @param string $value
     * @param \Illuminate\Support\Carbon|null $created_at
     * @param \Illuminate\Support\Carbon|null $read_at
     * @param \Spatie\LaravelData\Lazy|(Authenticatable&\Haemanthus\Basement\Contracts\User)|null $receiver
     * @param \Spatie\LaravelData\Lazy|(Authenticatable&\Haemanthus\Basement\Contracts\User)|null $sender
     */
    public function __construct(
        public ?int $id,
        public int $receiver_id,
        public int $sender_id,
        #[WithCast(AsMessageType::class)]
        public MessageType $type,
        public string $value,
        public ?Carbon $created_at,
        public ?Carbon $read_at,
        public Lazy|Authenticatable|null $receiver,
        public Lazy|Authenticatable|null $sender,
    ) {
        $this->receiver = Lazy::create(fn (): Authenticatable => (
            $receiver instanceof Authenticatable ? $receiver : Basement::newUserModel()->findOrFail($this->receiver_id)
        ));

        $this->sender = Lazy::create(fn (): Authenticatable => (
            $sender instanceof Authenticatable ? $sender : Basement::newUserModel()->findOrFail($this->sender_id)
        ));
    }

    /**
     * Create data collection from given messages id.
     *
     * @param array<int> $messagesId
     * @param array $with
     * @return \Spatie\LaravelData\DataCollection
     */
    public static function collectionFromId(array $messagesId, array $with = []): DataCollection
    {
        $messages = Basement::newPrivateMessageModel()
            ->with($with)
            ->whereIn('id', $messagesId)
            ->get();

        return self::collection($messages);
    }
}
