<?php

declare(strict_types=1);

namespace BasementChat\Basement\Tests\Feature;

use BasementChat\Basement\Contracts\MarkPrivatesMessagesAsRead;
use BasementChat\Basement\Data\PrivateMessageData;
use BasementChat\Basement\Notifications\PrivateMessageRead;
use BasementChat\Basement\Tests\Fixtures\User;
use BasementChat\Basement\Tests\TestCase;
use BasementChat\Basement\Tests\WithPrivateMessages;
use BasementChat\Basement\Tests\WithUsers;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Notification;

class MarkPrivateMessagesAsReadTest extends TestCase
{
    use RefreshDatabase;
    use WithPrivateMessages;
    use WithUsers;

    protected User $receiver;

    protected User $sender;

    /**
     * Setup the test environment.
     */
    protected function setUp(): void
    {
        parent::setUp();

        $this->setUpUsers();
        $this->setUpPrivateMessages();
        $this->addUsers(2);

        $this->receiver = $this->users[0];
        $this->sender = $this->users[1];
    }

    /**
     * @test
     */
    public function itShouldBeAbleToMarkPrivateMessagesAsRead(): void
    {
        $this->addPrivateMessages(receiver: $this->receiver, sender: $this->sender, count: 10);

        Notification::fake();

        $this->freezeTime(function (Carbon $time): void {
            /** @var \BasementChat\Basement\Contracts\MarkPrivatesMessagesAsRead $markAsRead */
            $markAsRead = app(MarkPrivatesMessagesAsRead::class);
            $markAsRead->markAsRead(
                PrivateMessageData::collectionFromId(
                    messagesId: $this->privateMessages->pluck('id')->toArray(),
                    with: ['sender'],
                ),
            );

            $this->assertSame(
                expected: 10,
                actual: DB::table('private_messages')->where('read_at', $time)->count(),
            );
        });

        Notification::assertSentTo(notifiable: $this->sender, notification: PrivateMessageRead::class);
        Notification::assertCount(1);
    }
}
