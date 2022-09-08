<?php

declare(strict_types=1);

namespace BasementChat\Basement\Tests\Feature;

use BasementChat\Basement\Contracts\SendPrivateMessage;
use BasementChat\Basement\Data\PrivateMessageData;
use BasementChat\Basement\Models\PrivateMessage;
use BasementChat\Basement\Notifications\PrivateMessageSent;
use BasementChat\Basement\Tests\Fixtures\User;
use BasementChat\Basement\Tests\TestCase;
use BasementChat\Basement\Tests\WithPrivateMessages;
use BasementChat\Basement\Tests\WithUsers;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Notification;

class SendPrivateMessageTest extends TestCase
{
    use RefreshDatabase;
    use WithPrivateMessages;
    use WithUsers;

    protected User $receiver;

    protected User $sender;

    /**
     * Setup the test environment.
     */
    public function setUp(): void
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
    public function itShouldBeAbleToSendAPrivateMessage(): void
    {
        Notification::fake();

        /** @var \BasementChat\Basement\Models\PrivateMessage $message */
        $message = PrivateMessage::factory()->make();

        $this->freezeTime(function (Carbon $time) use ($message): void {
            /** @var \BasementChat\Basement\Contracts\SendPrivateMessage $sendPrivateMessageAction */
            $sendPrivateMessageAction = app(SendPrivateMessage::class);

            $createdMessage = $sendPrivateMessageAction->send(PrivateMessageData::from($message));

            $this->assertInstanceOf(expected: PrivateMessageData::class, actual: $createdMessage);
            $this->assertInstanceOf(expected: Carbon::class, actual: $createdMessage->created_at);
            $this->assertSame(expected: $time->toString(), actual: $createdMessage->created_at->toString());
            $this->assertSame(expected: $message->receiver_id, actual: $createdMessage->receiver_id);
            $this->assertSame(expected: $message->sender_id, actual: $createdMessage->sender_id);
            $this->assertSame(expected: $message->type, actual: $createdMessage->type);
            $this->assertSame(expected: $message->value, actual: $createdMessage->value);
        });

        $this->assertDatabaseCount(table: 'private_messages', count: 1);
        $this->assertDatabaseHas(table: 'private_messages', data: [
            'receiver_id' => $message->receiver_id,
            'sender_id' => $message->sender_id,
            'type' => $message->type->value,
            'value' => $message->value,
        ]);

        Notification::assertCount(1);
        Notification::assertSentTo(notifiable: User::find($message->receiver_id), notification: PrivateMessageSent::class);
    }

    /**
     * @test
     */
    public function itShouldBeMarkedAsReadIfSendingAMessageToSelf(): void
    {
        Notification::fake();

        $this->addPrivateMessages(receiver: $this->receiver, sender: $this->receiver);

        $message = $this->privateMessages[0];

        $this->freezeTime(function (Carbon $time) use ($message): void {
            /** @var \BasementChat\Basement\Contracts\SendPrivateMessage $sendPrivateMessageAction */
            $sendPrivateMessageAction = app(SendPrivateMessage::class);
            $createdMessage = $sendPrivateMessageAction->send(PrivateMessageData::from($message));

            $this->assertInstanceOf(expected: PrivateMessageData::class, actual: $createdMessage);

            $this->assertInstanceOf(expected: Carbon::class, actual: $createdMessage->read_at);
            $this->assertSame(expected: $time->toString(), actual: $createdMessage->read_at->toString());
        });
    }
}
