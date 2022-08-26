<?php

namespace Haemanthus\Basement\Models;

use Haemanthus\Basement\Contracts\User as UserContract;
use Haemanthus\Basement\Facades\Basement;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\MorphTo;
use Illuminate\Foundation\Auth\User as Authenticatable;

class PrivateMessage extends Model
{
    use HasFactory;

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
