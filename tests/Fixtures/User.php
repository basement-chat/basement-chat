<?php

declare(strict_types=1);

namespace Haemanthus\Basement\Tests\Fixtures;

use Haemanthus\Basement\Contracts\User as UserContract;
use Haemanthus\Basement\Traits\HasPrivateMessages;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;

/**
 * @property int $id
 * @property string $name
 *
 * @property-read string $avatar
 *
 * @method static \Haemanthus\Basement\Database\Factories\UserFactory factory(...$parameters)
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
