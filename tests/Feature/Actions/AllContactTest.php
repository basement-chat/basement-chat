<?php

namespace Haemanthus\Basement\Tests\Feature\Actions;

use Haemanthus\Basement\Contracts\AllContact;
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

    /** @var \Haemanthus\Basement\Contracts\AllContact $allContactAction */
    $allContactAction = app(AllContact::class);

    $contacts = $allContactAction->all();

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

    /** @var \Haemanthus\Basement\Contracts\AllContact $allContactAction */
    $allContactAction = app(AllContact::class);

    $contact = $allContactAction->all()[0];

    expect($contact->last_private_message)->toBeInstanceOf(PrivateMessageData::class);
    expect($contact->last_private_message->id)->toBe($lastMessage->id);
    expect($contact->last_private_message->receiver_id)->toBe($lastMessage->receiver_id);
    expect($contact->last_private_message->sender_id)->toBe($lastMessage->sender_id);
    expect($contact->last_private_message->type)->toBe($lastMessage->type);
    expect($contact->last_private_message->created_at->toString())->toBe($lastMessage->created_at->toString());
    expect($contact->last_private_message->seen_at)->toBe($lastMessage->seen_at);
});
