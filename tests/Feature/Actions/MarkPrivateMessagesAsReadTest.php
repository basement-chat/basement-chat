<?php

namespace Haemanthus\Basement\Tests\Feature\Actions;

use Haemanthus\Basement\Contracts\MarkPrivatesMessagesAsRead;
use Haemanthus\Basement\Data\PrivateMessageData;
use Haemanthus\Basement\Models\PrivateMessage;
use Haemanthus\Basement\Tests\Fixtures\User;
use Illuminate\Auth\Access\AuthorizationException;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\DB;

use function Pest\Laravel\actingAs;

uses(RefreshDatabase::class);

it(description: 'should be able to mark private messages as read', closure: function (): void {
    [$receiver, $sender] = User::factory()->count(2)->create();

    /** @var \Haemanthus\Basement\Tests\Fixtures\User $receiver */
    /** @var \Haemanthus\Basement\Tests\Fixtures\User $sender */
    /** @var \Haemanthus\Basement\Tests\TestCase $this */

    actingAs($receiver);

    $this->freezeTime(function (Carbon $time) use ($receiver, $sender): void {
        $messagesId = PrivateMessage::factory()
            ->count(10)
            ->betweenTwoUsers(receiver: $receiver, sender: $sender)
            ->create()
            ->pluck('id')
            ->toArray();

        /** @var \Haemanthus\Basement\Contracts\MarkPrivatesMessagesAsRead $markAsReadAction */
        $markAsReadAction = app(MarkPrivatesMessagesAsRead::class);

        $markAsReadAction->markAsRead(PrivateMessageData::collectionFromId(...$messagesId));

        expect(DB::table('private_messages')->where('seen_at', $time)->count())->toBe(10);
    });
});

it(description: 'should throw an exception if the user is not authorized', closure: function (): void {
    [$receiver, $sender] = User::factory()->count(2)->create();

    /** @var \Haemanthus\Basement\Tests\Fixtures\User $receiver */
    /** @var \Haemanthus\Basement\Tests\Fixtures\User $sender */
    /** @var \Haemanthus\Basement\Tests\TestCase $this */

    actingAs($sender);

    $messagesId = PrivateMessage::factory()
        ->count(10)
        ->betweenTwoUsers(receiver: $receiver, sender: $sender)
        ->create()
        ->pluck('id')
        ->toArray();

    /** @var \Haemanthus\Basement\Contracts\MarkPrivatesMessagesAsRead $markAsReadAction */
    $markAsReadAction = app(MarkPrivatesMessagesAsRead::class);

    $this->expectException(AuthorizationException::class);

    $markAsReadAction->markAsRead(PrivateMessageData::collectionFromId(...$messagesId));
});
