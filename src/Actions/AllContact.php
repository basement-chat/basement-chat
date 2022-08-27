<?php

namespace Haemanthus\Basement\Actions;

use Haemanthus\Basement\Contracts\AllContact as AllContactContract;
use Haemanthus\Basement\Data\ContactData;
use Haemanthus\Basement\Facades\Basement;
use Illuminate\Support\Facades\Auth;
use Spatie\LaravelData\DataCollection;

class AllContact implements AllContactContract
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
            ->appendLastPrivateMessageId($user)
            ->appendUnreadMessages($user)
            ->get();

        $contacts->append('avatar');
        $contacts->load('lastPrivateMessage');

        return ContactData::collection($contacts);
    }
}
