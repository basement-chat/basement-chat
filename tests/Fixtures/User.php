<?php

declare(strict_types=1);

namespace BasementChat\Basement\Tests\Fixtures;

use BasementChat\Basement\Contracts\User as UserContract;
use BasementChat\Basement\Traits\HasPrivateMessages;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;

/**
 * @property int $id
 * @property string $name
 *
 * @property-read string $avatar
 *
 * @method static \BasementChat\Basement\Database\Factories\UserFactory factory(...$parameters)
 */
class User extends Authenticatable implements UserContract
{
    use HasFactory;
    use HasPrivateMessages;

    /**
     * The attributes that aren't mass assignable.
     *
     * @var array<string>|bool
     */
    protected $guarded = [];
}
