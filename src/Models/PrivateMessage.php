<?php

namespace Haemanthus\Basement\Models;

use Haemanthus\Basement\Casts\AsMessageType;
use Haemanthus\Basement\Contracts\User as UserContract;
use Haemanthus\Basement\Facades\Basement;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Query\Builder as QueryBuilder;
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
     * @var array<model-property<self>, string|class-string<Illuminate\Contracts\Database\Eloquent\CastsAttributes>>
     */
    protected $casts = [
        'type' => AsMessageType::class,
        'seen_at' => 'datetime',
    ];

    /**
     * Get the model belonging to the message received.
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo<Model, Authenticatable & UserContract>
     */
    public function receiver(): BelongsTo
    {
        return $this->belongsTo(related: Basement::userModel());
    }

    /**
     * Get the model belonging to the message sent.
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo<Model, Authenticatable & UserContract>
     */
    public function sender(): BelongsTo
    {
        return $this->belongsTo(related: Basement::userModel());
    }

    /**
     * Scope a query to sort by id in descending order
     *
     * @param  \Illuminate\Database\Eloquent\Builder<PrivateMessage>|\Illuminate\Database\Query\Builder  $query
     *
     * @return void
     */
    public function scopeOrderByDescId(Builder|QueryBuilder $query): void
    {
        $query->orderByDesc($this->primaryKey);
    }

    /**
     * Scope a query to include only messages between two specific users.
     *
     * @param  \Illuminate\Database\Eloquent\Builder|\Illuminate\Database\Query\Builder  $query
     * @param  \Illuminate\Foundation\Auth\User & \Haemanthus\Basement\Contracts\User $a
     * @param  \Illuminate\Foundation\Auth\User & \Haemanthus\Basement\Contracts\User $b
     *
     * @return void
     */
    public function scopeWhereBetweenTwoUsers(Builder|QueryBuilder $query, Authenticatable $a, Authenticatable $b): void
    {
        $query->where(fn (Builder $clause): Builder => $clause
            ->where(fn (Builder $subclause): Builder => $subclause
                ->whereBelongsTo($a, 'receiver')
                ->whereBelongsTo($b, 'sender'))
            ->orWhere(fn (Builder $subclause): Builder => $subclause
                ->whereBelongsTo($b, 'receiver')
                ->whereBelongsTo($a, 'sender')));
    }

    /**
     * Scope a query to include only messages containing the given keyword.
     *
     * @param  \Illuminate\Database\Eloquent\Builder|\Illuminate\Database\Query\Builder  $query
     * @param  string $keyword
     *
     * @return void
     */
    public function scopeWhereValueLike(Builder|QueryBuilder $query, string $keyword): void
    {
        $query->when(value: $keyword !== '', callback: fn (Builder $clause) => $clause
            ->where('value', 'like', $keyword));
    }
}
