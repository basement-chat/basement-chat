<?php

namespace BasementChat\Basement\Broadcasting;

use BasementChat\Basement\Data\ContactData;
use BasementChat\Basement\Facades\Basement;
use Illuminate\Foundation\Auth\User as Authenticatable;

class ContactChannel
{
    /**
     * Authenticate the user's access to the channel.
     *
     * @param  \Illuminate\Foundation\Auth\User&\BasementChat\Basement\Contracts\User $user
     */
    public function join(Authenticatable $user): array
    {
        $contact = Basement::newUserModel()->make($user->toArray());
        $contact->append('avatar');

        return ContactData::from($contact)->all();
    }
}
