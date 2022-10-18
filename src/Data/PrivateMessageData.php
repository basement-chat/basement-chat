<?php

declare(strict_types=1);

namespace BasementChat\Basement\Data;

use BasementChat\Basement\Enums\MessageType;
use BasementChat\Basement\Facades\Basement;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Support\Carbon;
use Spatie\LaravelData\Data;
use Spatie\LaravelData\DataCollection;
use Spatie\LaravelData\Lazy;

/**
 * @property \Spatie\LaravelData\Lazy $receiver
 * @property \Spatie\LaravelData\Lazy $sender
 */
class PrivateMessageData extends Data
{
    /**
     * Create a new private message data instance.
     *
     * @param \Spatie\LaravelData\Lazy|(Authenticatable&\BasementChat\Basement\Contracts\User)|null $receiver
     * @param \Spatie\LaravelData\Lazy|(Authenticatable&\BasementChat\Basement\Contracts\User)|null $sender
     */
    public function __construct(
        public int $receiver_id,
        public int $sender_id,
        public MessageType $type,
        public string $value,
        public ?int $id = null,
        public ?Carbon $created_at = null,
        public ?Carbon $read_at = null,
        public Lazy|Authenticatable|null $receiver = null,
        public Lazy|Authenticatable|null $sender = null,
    ) {
        $this->receiver = Lazy::create(fn (): Authenticatable => $receiver instanceof Authenticatable ?
            $receiver : Basement::newUserModel()->findOrFail($this->receiver_id));

        $this->sender = Lazy::create(fn (): Authenticatable => $sender instanceof Authenticatable ?
            $sender : Basement::newUserModel()->findOrFail($this->sender_id));
    }

    /**
     * Create data collection from given messages id.
     *
     * @param array<int> $messagesId
     * @param array<string> $with
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
