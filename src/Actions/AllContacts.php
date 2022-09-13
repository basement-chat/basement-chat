<?php

declare(strict_types=1);

namespace BasementChat\Basement\Actions;

use BasementChat\Basement\Contracts\AllContacts as AllContactsContract;
use BasementChat\Basement\Data\ContactData;
use BasementChat\Basement\Facades\Basement;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Spatie\LaravelData\DataCollection;

class AllContacts implements AllContactsContract
{
    /**
     * Get all contact list.
     *
     * @param \Illuminate\Foundation\Auth\User&\BasementChat\Basement\Contracts\User $user
     */
    public function all(Authenticatable $user): DataCollection
    {
        $contacts = Basement::newUserModel()
            ->addSelectLastPrivateMessageId($user)
            ->addSelectUnreadMessages($user)
            ->get();

        $contacts->append('avatar');
        $contacts->load('lastPrivateMessage');

        return ContactData::collection($contacts->values());
    }
}
