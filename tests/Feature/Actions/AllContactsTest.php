<?php

namespace Haemanthus\Basement\Tests\Feature\Actions;

use Haemanthus\Basement\Contracts\AllContacts;
use Haemanthus\Basement\Data\ContactData;
use Haemanthus\Basement\Data\PrivateMessageData;
use Haemanthus\Basement\Models\PrivateMessage;
use Haemanthus\Basement\Tests\Fixtures\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Spatie\LaravelData\DataCollection;

use function Pest\Laravel\actingAs;

uses(RefreshDatabase::class);

it(description: 'should be able to get all contacts', closure: function (): void {
    /** @var \Illuminate\Database\Eloquent\Collection<\Haemanthus\Basement\Tests\Fixtures\User> $users */
    $users = User::factory(count: 10)->create();

    actingAs($users[0]);

    /** @var \Haemanthus\Basement\Contracts\AllContacts $allContactsAction */
    $allContactsAction = app(AllContacts::class);

    $contacts = $allContactsAction->all();

    expect($contacts)->toBeInstanceOf(DataCollection::class);
    expect($contacts->count())->toBe($users->count());

    /** @var \Haemanthus\Basement\Data\ContactData $contact */
    $contact = $contacts->toCollection()->first(fn (ContactData $data): bool => (
        $data->id === $users[0]->id
    ));

    expect($contact)->toBeInstanceOf(ContactData::class);
    expect($contact->id)->toBe($users[0]->id);
    expect($contact->name)->toBe($users[0]->name);
    expect($contact->avatar)->toBe($users[0]->avatar);
});

it(description: 'should have the last private message added', closure: function (): void {
    /** @var \Haemanthus\Basement\Tests\Fixtures\User $receiver */
    $receiver = User::factory()->create();

    /** @var \Haemanthus\Basement\Tests\Fixtures\User $sender */
    $sender = User::factory()->create();

    actingAs($sender);

    /** @var \Haemanthus\Basement\Models\PrivateMessage $lastMessage */
    $lastMessage = PrivateMessage::factory()
        ->count(5)
        ->betweenTwoUsers(receiver: $receiver, sender: $sender)
        ->create()
        ->last();

    /** @var \Haemanthus\Basement\Contracts\AllContacts $allContactsAction */
    $allContactsAction = app(AllContacts::class);

    /** @var \Haemanthus\Basement\Data\ContactData $contact */
    $contact = $allContactsAction->all()->toCollection()->first(fn (ContactData $data): bool => (
        $data->id === $receiver->id
    ));

    expect($contact->last_private_message)->toBeInstanceOf(PrivateMessageData::class);
    expect($contact->last_private_message->id)->toBe($lastMessage->id);
    expect($contact->last_private_message->receiver_id)->toBe($lastMessage->receiver_id);
    expect($contact->last_private_message->sender_id)->toBe($lastMessage->sender_id);
    expect($contact->last_private_message->type)->toBe($lastMessage->type);
    expect($contact->last_private_message->created_at->toString())->toBe($lastMessage->created_at->toString());
    expect($contact->last_private_message->seen_at)->toBe($lastMessage->seen_at);
});

it(description: 'should have the number of unread messages', closure: function (): void {
    /** @var \Haemanthus\Basement\Tests\Fixtures\User $receiver */
    $receiver = User::factory()->create();

    /** @var \Haemanthus\Basement\Tests\Fixtures\User $sender */
    $sender = User::factory()->create();

    actingAs($receiver);

    PrivateMessage::factory()
        ->count(5)
        ->betweenTwoUsers(receiver: $receiver, sender: $sender)
        ->create();

    /** @var \Haemanthus\Basement\Contracts\AllContacts $allContactsAction */
    $allContactsAction = app(AllContacts::class);

    /** @var \Haemanthus\Basement\Data\ContactData $contact */
    $contact = $allContactsAction->all()->toCollection()->first(fn (ContactData $data): bool => (
        $data->id === $sender->id
    ));

    expect($contact->unread_messages)->toBe(5);
});

it(description: 'should be sorted in desc order at the time the last message is received', closure: function (): void {
    /** @var \Haemanthus\Basement\Tests\Fixtures\User $receiver */
    /** @var \Haemanthus\Basement\Tests\Fixtures\User $sender1 */
    /** @var \Haemanthus\Basement\Tests\Fixtures\User $sender2 */

    [$receiver, $sender1, $sender2] = User::factory()->count(3)->create();

    actingAs($receiver);

    PrivateMessage::factory()->betweenTwoUsers(receiver: $receiver, sender: $sender1)->create();
    PrivateMessage::factory()->betweenTwoUsers(receiver: $receiver, sender: $sender2)->create();

    /** @var \Haemanthus\Basement\Contracts\AllContacts $allContactsAction */
    $allContactsAction = app(AllContacts::class);

    $contacts = $allContactsAction->all();

    /** @var \Haemanthus\Basement\Data\ContactData $contact */
    $contact = $contacts[0];

    expect($contact->id)->toBe($sender2->id);
    expect($contact->name)->toBe($sender2->name);
});
