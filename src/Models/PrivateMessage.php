<?php

declare(strict_types=1);

namespace BasementChat\Basement\Models;

use BasementChat\Basement\Casts\AsMessageType;
use BasementChat\Basement\Contracts\User as UserContract;
use BasementChat\Basement\Facades\Basement;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Foundation\Auth\User as Authenticatable;

/**
 * @property int $id
 * @property int $receiver_id
 * @property int $sender_id
 * @property \BasementChat\Basement\Enums\MessageType $type
 * @property string $value
 * @property \Illuminate\Support\Carbon $created_at
 * @property \Illuminate\Support\Carbon|null $read_at
 *
 * @method static \BasementChat\Basement\Database\Factories\PrivateMessageFactory factory(...$parameters)
 * @method static PrivateMessage orderByDescId()
 * @method static PrivateMessage whereBetweenTwoUsers(Authenticatable $a, Authenticatable $b)
 * @method static PrivateMessage whereValueLike(string $keyword)
 */
class PrivateMessage extends Model
{
    use HasFactory;
    use SoftDeletes;

    /**
     * The attributes that should be cast.
     *
     * @var array<model-property<self>,string|class-string<Illuminate\Contracts\Database\Eloquent\CastsAttributes>>
     */
    protected $casts = [
        'type' => AsMessageType::class,
        'read_at' => 'datetime',
    ];

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int,string>
     */
    protected $fillable = [
        'receiver_id',
        'sender_id',
        'type',
        'value',
        'read_at',
    ];

    /**
     * Get the model belonging to the message received.
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo<Model,Authenticatable&UserContract>
     */
    public function receiver(): BelongsTo
    {
        return $this->belongsTo(related: Basement::userModel());
    }

    /**
     * Get the model belonging to the message sent.
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo<Model,Authenticatable&UserContract>
     */
    public function sender(): BelongsTo
    {
        return $this->belongsTo(related: Basement::userModel());
    }

    /**
     * Scope a query to sort by id in descending order
     *
     * @param  \Illuminate\Database\Eloquent\Builder<PrivateMessage>  $query
     */
    public function scopeOrderByDescId(Builder $query): void
    {
        $query->orderByDesc($this->primaryKey);
    }

    /**
     * Scope a query to include only messages between two specific users.
     *
     * @param  \Illuminate\Database\Eloquent\Builder<PrivateMessage>  $query
     * @param  \Illuminate\Foundation\Auth\User&\BasementChat\Basement\Contracts\User $a
     * @param  \Illuminate\Foundation\Auth\User&\BasementChat\Basement\Contracts\User $b
     */
    public function scopeWhereBetweenTwoUsers(Builder $query, Authenticatable $a, Authenticatable $b): void
    {
        $query->where(static fn (Builder $clause): Builder => $clause
            ->where(static fn (Builder $subclause): Builder => $subclause
                ->whereBelongsTo($a, 'receiver')
                ->whereBelongsTo($b, 'sender'))
            ->orWhere(static fn (Builder $subclause): Builder => $subclause
                ->whereBelongsTo($b, 'receiver')
                ->whereBelongsTo($a, 'sender')));
    }

    /**
     * Scope a query to include only messages containing the given keyword.
     *
     * @param  \Illuminate\Database\Eloquent\Builder<PrivateMessage>  $query
     */
    public function scopeWhereValueLike(Builder $query, string $keyword): void
    {
        if ($keyword !== '') {
            $query->where('value', 'like', "%{$keyword}%");
        }
    }
}
