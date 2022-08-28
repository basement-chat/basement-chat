<?php

namespace Haemanthus\Basement\Policies;

use Haemanthus\Basement\Data\PrivateMessageData;
use Illuminate\Auth\Access\HandlesAuthorization;
use Illuminate\Auth\Access\Response;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Spatie\LaravelData\DataCollection;

class PrivateMessagePolicy
{
    use HandlesAuthorization;

    /**
     * Determine if the given private messages can be updated by the user.
     *
     * @param  \Illuminate\Foundation\Auth\User & \Haemanthus\Basement\Contracts\User $user
     * @param  \Spatie\LaravelData\DataCollection  $privateMessages
     * @return \Illuminate\Auth\Access\Response
     */
    public function updateAny(Authenticatable $user, DataCollection $privateMessages): Response
    {
        $allowed = $privateMessages
            ->toCollection()
            ->every(fn (PrivateMessageData $data): bool => $data->receiver_id === $user->id);

        return $allowed ? $this->allow() : $this->deny('You must be the sender of the message to update messages');
    }
}
