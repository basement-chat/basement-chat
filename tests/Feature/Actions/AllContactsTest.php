<?php

namespace Haemanthus\Basement\Tests\Feature\Actions;

use Haemanthus\Basement\Contracts\AllContacts;
use Haemanthus\Basement\Data\ContactData;
use Haemanthus\Basement\Data\PrivateMessageData;
use Haemanthus\Basement\Models\PrivateMessage;
use Haemanthus\Basement\Tests\Fixtures\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Spatie\LaravelData\DataCollection;

uses(RefreshDatabase::class);

it(description: 'should be able to get all contacts', closure: function (): void {
    /** @var \Illuminate\Database\Eloquent\Collection<\Haemanthus\Basement\Tests\Fixtures\User> $users */
    $users = User::factory(count: 10)->create();

    /** @var \Haemanthus\Basement\Contracts\AllContacts $allContactsAction */
    $allContactsAction = app(AllContacts::class);

    $contacts = $allContactsAction->all($users[0]);

    expect($contacts)->toBeInstanceOf(DataCollection::class);
    expect($contacts->count())->toBe($users->count());

    /** @var \Haemanthus\Basement\Data\ContactData $contact */
    $contact = $contacts
        ->toCollection()
        ->first(fn (ContactData $data): bool => $data->id === $users[0]->id);

    expect($contact)->toBeInstanceOf(ContactData::class);
    expect($contact->id)->toBe($users[0]->id);
    expect($contact->name)->toBe($users[0]->name);
    expect($contact->avatar)->toBe($users[0]->avatar);
});

it(description: 'should have the last private message', closure: function (): void {
    [$receiver, $sender] = User::factory()->count(2)->create();

    /** @var \Haemanthus\Basement\Tests\Fixtures\User $receiver */
    /** @var \Haemanthus\Basement\Tests\Fixtures\User $sender */

    /** @var \Haemanthus\Basement\Models\PrivateMessage $lastMessage */
    $lastMessage = PrivateMessage::factory()
        ->count(5)
        ->betweenTwoUsers(receiver: $receiver, sender: $sender)
        ->create()
        ->last();

    /** @var \Haemanthus\Basement\Contracts\AllContacts $allContactsAction */
    $allContactsAction = app(AllContacts::class);

    /** @var \Haemanthus\Basement\Data\ContactData $contact */
    $contact = $allContactsAction
        ->all($sender)
        ->toCollection()
        ->first(fn (ContactData $data): bool => $data->id === $receiver->id);

    expect($contact->last_private_message)->toBeInstanceOf(PrivateMessageData::class);
    expect($contact->last_private_message->id)->toBe($lastMessage->id);
    expect($contact->last_private_message->receiver_id)->toBe($lastMessage->receiver_id);
    expect($contact->last_private_message->sender_id)->toBe($lastMessage->sender_id);
    expect($contact->last_private_message->type)->toBe($lastMessage->type);
    expect($contact->last_private_message->created_at->toString())->toBe($lastMessage->created_at->toString());
    expect($contact->last_private_message->read_at)->toBe($lastMessage->read_at);
});

it(description: 'should have the number of unread messages', closure: function (): void {
    [$receiver, $sender] = User::factory()->count(2)->create();

    /** @var \Haemanthus\Basement\Tests\Fixtures\User $receiver */
    /** @var \Haemanthus\Basement\Tests\Fixtures\User $sender */

    PrivateMessage::factory()
        ->count(5)
        ->betweenTwoUsers(receiver: $receiver, sender: $sender)
        ->create();

    /** @var \Haemanthus\Basement\Contracts\AllContacts $allContactsAction */
    $allContactsAction = app(AllContacts::class);

    /** @var \Haemanthus\Basement\Data\ContactData $contact */
    $contact = $allContactsAction
        ->all($receiver)
        ->toCollection()
        ->first(fn (ContactData $data): bool => $data->id === $sender->id);

    expect($contact->unread_messages)->toBe(5);
});

it(description: 'should be sorted in desc order at the time the last message is received', closure: function (): void {
    [$receiver, $sender1, $sender2] = User::factory()->count(3)->create();

    /** @var \Haemanthus\Basement\Tests\Fixtures\User $receiver */
    /** @var \Haemanthus\Basement\Tests\Fixtures\User $sender1 */
    /** @var \Haemanthus\Basement\Tests\Fixtures\User $sender2 */

    PrivateMessage::factory()->betweenTwoUsers(receiver: $receiver, sender: $sender1)->create();
    PrivateMessage::factory()->betweenTwoUsers(receiver: $receiver, sender: $sender2)->create();

    /** @var \Haemanthus\Basement\Contracts\AllContacts $allContactsAction */
    $allContactsAction = app(AllContacts::class);

    /** @var \Spatie\LaravelData\DataCollection & array<\Haemanthus\Basement\Data\ContactData> $contacts */
    $contacts = $allContactsAction->all($receiver);

    expect($contacts[0]->id)->toBe($sender2->id);
    expect($contacts[0]->name)->toBe($sender2->name);

    expect($contacts[1]->id)->toBe($sender1->id);
    expect($contacts[1]->name)->toBe($sender1->name);

    expect($contacts[2]->id)->toBe($receiver->id);
    expect($contacts[2]->name)->toBe($receiver->name);
});
