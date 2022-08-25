<?php

namespace Haemanthus\Basement\Tests\Fixtures;

use Haemanthus\Basement\Traits\HasPrivateMessages;
use Haemanthus\Basement\Contracts\User as UserContract;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;

/**
 * @property int $id
 * @property string $name
 * @property-read string $avatar
 */
class User extends Authenticatable implements UserContract
{
    use HasFactory;
    use HasPrivateMessages;

    /**
     * The attributes that aren't mass assignable.
     *
     * @var array
     */
    protected $guarded = [];
}
