<?php

namespace Haemanthus\Basement\Tests\Feature;

use Haemanthus\Basement\Contracts\MarkPrivatesMessagesAsRead;
use Haemanthus\Basement\Data\PrivateMessageData;
use Haemanthus\Basement\Models\PrivateMessage;
use Haemanthus\Basement\Notifications\PrivateMessageRead;
use Haemanthus\Basement\Tests\Fixtures\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Notification;

uses(RefreshDatabase::class);

it(description: 'should be able to mark private messages as read', closure: function (): void {
    Notification::fake();

    [$receiver, $sender] = User::factory()->count(2)->create();

    /** @var \Haemanthus\Basement\Tests\Fixtures\User $receiver */
    /** @var \Haemanthus\Basement\Tests\Fixtures\User $sender */
    /** @var \Haemanthus\Basement\Tests\TestCase $this */

    $this->freezeTime(function (Carbon $time) use ($receiver, $sender): void {
        $messagesId = PrivateMessage::factory()
            ->count(10)
            ->betweenTwoUsers(receiver: $receiver, sender: $sender)
            ->create()
            ->pluck('id')
            ->toArray();

        /** @var \Haemanthus\Basement\Contracts\MarkPrivatesMessagesAsRead $markAsReadAction */
        $markAsReadAction = app(MarkPrivatesMessagesAsRead::class);

        $markAsReadAction->markAsRead(
            PrivateMessageData::collectionFromId(messagesId: $messagesId, with: ['sender']),
        );

        expect(DB::table('private_messages')->where('read_at', $time)->count())->toBe(10);
    });

    Notification::assertSentTo(notifiable: $sender, notification: PrivateMessageRead::class);
    Notification::assertCount(1);
});
