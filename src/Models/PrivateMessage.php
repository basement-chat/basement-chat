<?php

namespace Haemanthus\Basement\Models;

use Haemanthus\Basement\Casts\AsMessageType;
use Haemanthus\Basement\Contracts\User as UserContract;
use Haemanthus\Basement\Facades\Basement;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\MorphTo;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Foundation\Auth\User as Authenticatable;

/**
 * @property int $id
 * @property int $receiver_id
 * @property int $sender_id
 * @property string $type
 * @property string $value
 * @property \Illuminate\Support\Carbon $created_at
 * @property \Illuminate\Support\Carbon|null $seen_at
 *
 * @method static \Haemanthus\Basement\Database\Factories\PrivateMessageFactory factory(...$parameters)
 */
class PrivateMessage extends Model
{
    use HasFactory;
    use SoftDeletes;

    /**
     * The attributes that should be cast.
     *
     * @var array<model-property<self>, string|class-string<Illuminate\Contracts\Database\Eloquent\CastsAttributes>>
     */
    protected $casts = [
        'type' => AsMessageType::class,
        'seen_at' => 'datetime',
    ];

    /**
     * Get the model belonging to the message received.
     *
     * @return \Illuminate\Database\Eloquent\Relations\MorphTo<Model, Authenticatable & UserContract>
     */
    public function receiver(): MorphTo
    {
        return $this->morphTo(name: Basement::userModel(), type: 'receiver');
    }

    /**
     * Get the model belonging to the message sent.
     *
     * @return \Illuminate\Database\Eloquent\Relations\MorphTo<Model, Authenticatable & UserContract>
     */
    public function sender(): MorphTo
    {
        return $this->morphTo(name: Basement::userModel(), type: 'sender');
    }
}
