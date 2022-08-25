<?php

namespace Haemanthus\Basement\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\MorphTo;

class PrivateMessage extends Model
{
    use HasFactory;

    /**
     * Get the model belonging to the message received.
     *
     * @return \Illuminate\Database\Eloquent\Relations\MorphTo
     */
    public function receiver(): MorphTo
    {
        return $this->morphTo(name: \Basement::userModel(), type: 'receiver');
    }

    /**
     * Get the model belonging to the message sent.
     *
     * @return \Illuminate\Database\Eloquent\Relations\MorphTo
     */
    public function sender(): MorphTo
    {
        return $this->morphTo(name: \Basement::userModel(), type: 'sender');
    }
}
