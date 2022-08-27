<?php

namespace Haemanthus\Basement\Actions;

use Haemanthus\Basement\Contracts\AllContacts as AllContactsContract;
use Haemanthus\Basement\Data\ContactData;
use Haemanthus\Basement\Facades\Basement;
use Illuminate\Support\Facades\Auth;
use Spatie\LaravelData\DataCollection;

class AllContacts implements AllContactsContract
{
    /**
     * Get all contact list.
     *
     * @return \Spatie\LaravelData\DataCollection
     */
    public function all(): DataCollection
    {
        /** @var \Haemanthus\Basement\Contracts\User & \Illuminate\Foundation\Auth\User */
        $user = Auth::user();

        $contacts = Basement::newUserModel()
            ->addSelectLastPrivateMessageId($user)
            ->addSelectUnreadMessages($user)
            ->get();

        $contacts->append('avatar');
        $contacts->load('lastPrivateMessage');

        return ContactData::collection($contacts->sortByDesc('lastPrivateMessage.id')->values());
    }
}
