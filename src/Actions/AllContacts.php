<?php

namespace Haemanthus\Basement\Actions;

use Haemanthus\Basement\Contracts\AllContacts as AllContactsContract;
use Haemanthus\Basement\Data\ContactData;
use Haemanthus\Basement\Facades\Basement;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Spatie\LaravelData\DataCollection;

class AllContacts implements AllContactsContract
{
    /**
     * Get all contact list.
     *
     * @param \Illuminate\Foundation\Auth\User&\Haemanthus\Basement\Contracts\User $user
     *
     * @return \Spatie\LaravelData\DataCollection
     */
    public function all(Authenticatable $user): DataCollection
    {
        $contacts = Basement::newUserModel()
            ->addSelectLastPrivateMessageId($user)
            ->addSelectUnreadMessages($user)
            ->get();

        $contacts->append('avatar');
        $contacts->load('lastPrivateMessage');

        return ContactData::collection($contacts->sortByDesc('lastPrivateMessage.id')->values());
    }
}
