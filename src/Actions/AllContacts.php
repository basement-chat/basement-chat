<?php

declare(strict_types=1);

namespace BasementChat\Basement\Actions;

use BasementChat\Basement\Contracts\AllContacts as AllContactsContract;
use BasementChat\Basement\Data\ContactData;
use BasementChat\Basement\Data\PrivateMessageData;
use BasementChat\Basement\Facades\Basement;
use BasementChat\Basement\Models\PrivateMessage;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Support\Collection;

class AllContacts implements AllContactsContract
{
    /**
     * Get all contact list.
     *
     * @param \Illuminate\Foundation\Auth\User&\BasementChat\Basement\Contracts\User $user
     */
    public function all(Authenticatable $user): Collection
    {
        $contacts = Basement::newUserModel()
            ->addSelectLastPrivateMessageId($user)
            ->addSelectUnreadMessages($user)
            ->get();

        $contacts->append('avatar');
        $contacts->load('lastPrivateMessage');

        return $contacts
            ->sortByDesc('lastPrivateMessage.id')
            ->values()
            ->map(fn (Authenticatable $contact): ContactData => new ContactData(
                id: (int) $contact->id,
                name: $contact->name,
                avatar: $contact->avatar,
                last_private_message: (function () use ($contact) {
                    /** @var \BasementChat\Basement\Models\PrivateMessage|null $lastPrivateMessage */
                    $lastPrivateMessage = $contact->lastPrivateMessage;

                    return $lastPrivateMessage !== null ? new PrivateMessageData(
                        receiver_id: (int) $lastPrivateMessage->receiver_id,
                        sender_id: (int) $lastPrivateMessage->sender_id,
                        type: $lastPrivateMessage->type,
                        value: $lastPrivateMessage->value,
                        id: (int) $lastPrivateMessage->id,
                        created_at: $lastPrivateMessage->created_at,
                        read_at: $lastPrivateMessage->read_at,
                    ) : null;
                })(),
                unread_messages: (int) $contact->unread_messages,
            ));
    }
}
