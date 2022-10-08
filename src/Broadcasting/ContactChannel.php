<?php

declare(strict_types=1);

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
     *
     * @return array<string,mixed>|null
     */
    public function join(Authenticatable $user, int $id): ?array
    {
        if ($user->id !== $id) {
            return null;
        }

        $contact = Basement::newUserModel()->find($user->id);
        $contact->append('avatar');

        return ContactData::from($contact)->all();
    }
}