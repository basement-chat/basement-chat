<?php

namespace Haemanthus\Basement\Tests\Feature\Actions;

use Haemanthus\Basement\Contracts\AllPrivateMessages;
use Haemanthus\Basement\Models\PrivateMessage;
use Haemanthus\Basement\Tests\Fixtures\User;
use Illuminate\Contracts\Pagination\CursorPaginator;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Pest\Expectation;
use Spatie\LaravelData\DataCollection;

use function Pest\Laravel\actingAs;

uses(RefreshDatabase::class);

it(description: 'should be able to get all private messages between two users', closure: function (): void {
    [$user1, $user2] = User::factory()->count(2)->create();

    /** @var \Haemanthus\Basement\Tests\Fixtures\User $user1 */
    /** @var \Haemanthus\Basement\Tests\Fixtures\User $user2 */

    actingAs($user1);

    $createdMessages = PrivateMessage::factory()
        ->count(2)
        ->betweenTwoUsers(receiver: $user1, sender: $user2)
        ->create()
        ->merge(PrivateMessage::factory()
            ->count(2)
            ->betweenTwoUsers(receiver: $user2, sender: $user1)
            ->create())
        ->collect()
        ->reverse()
        ->values();

    /** @var \Haemanthus\Basement\Contracts\AllPrivateMessages $allPrivateMessagesAction */
    $allPrivateMessagesAction = app(AllPrivateMessages::class);

    $messages = $allPrivateMessagesAction->allBetweenTwoUsers(receiver: $user1, sender: $user2);

    expect($messages)->toBeInstanceOf(DataCollection::class);
    expect($messages->count())->toBe($createdMessages->count());

    $createdMessages->each(fn (PrivateMessage $message, int $key): Expectation => expect($message->id)
        ->toBe($messages[$key]->id));
});

it(description: 'should be cursor paginated every 50 messages', closure: function (): void {
    [$receiver, $sender] = User::factory()->count(2)->create();

    /** @var \Haemanthus\Basement\Tests\Fixtures\User $receiver */
    /** @var \Haemanthus\Basement\Tests\Fixtures\User $sender */

    PrivateMessage::factory()
        ->count(100)
        ->betweenTwoUsers(receiver: $receiver, sender: $sender)
        ->create();

    /** @var \Haemanthus\Basement\Contracts\AllPrivateMessages $allPrivateMessagesAction */
    $allPrivateMessagesAction = app(AllPrivateMessages::class);

    $messages = $allPrivateMessagesAction->allBetweenTwoUsers(receiver: $receiver, sender: $sender);

    expect($messages->count())->toBe(50);
    expect($messages->items())->toBeInstanceOf(CursorPaginator::class);
    expect($messages->items()->nextPageUrl())->toBeString();
});
