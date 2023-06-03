<?php

declare(strict_types=1);

namespace BasementChat\Basement\Tests\Feature\Actions;

use BasementChat\Basement\Contracts\SendPrivateMessage;
use BasementChat\Basement\Data\PrivateMessageData;
use BasementChat\Basement\Events\PrivateMessageReceived;
use BasementChat\Basement\Events\PrivateMessageSent;
use BasementChat\Basement\Models\PrivateMessage;
use BasementChat\Basement\Tests\Fixtures\Models\User;
use BasementChat\Basement\Tests\TestCase;
use BasementChat\Basement\Tests\WithPrivateMessages;
use BasementChat\Basement\Tests\WithUsers;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Event;

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
        Event::fake([PrivateMessageSent::class, PrivateMessageReceived::class]);

        /** @var \BasementChat\Basement\Models\PrivateMessage $message */
        $message = PrivateMessage::factory()
            ->betweenTwoUsers(
                receiver: $this->receiver,
                sender: $this->sender,
            )
            ->make();

        $this->freezeTime(function (Carbon $time) use ($message): void {
            /** @var \BasementChat\Basement\Contracts\SendPrivateMessage $sendPrivateMessageAction */
            $sendPrivateMessageAction = app(SendPrivateMessage::class);

            $createdMessage = $sendPrivateMessageAction->send(new PrivateMessageData(
                receiver_id: (int) $message->receiver_id,
                sender_id: (int) $message->sender_id,
                type: $message->type,
                value: $message->value,
                id: (int) $message->id,
                created_at: $message->created_at,
                read_at: $message->read_at,
            ));

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

        Event::assertDispatchedTimes(event: PrivateMessageSent::class, times: 1);
        Event::assertDispatchedTimes(event: PrivateMessageReceived::class, times: 1);
    }

    /**
     * @test
     */
    public function itShouldBeMarkedAsReadIfSendingAMessageToSelf(): void
    {
        Event::fake([PrivateMessageSent::class, PrivateMessageReceived::class]);

        $this->addPrivateMessages(receiver: $this->receiver, sender: $this->receiver);

        $message = $this->privateMessages[0];

        $this->freezeTime(function (Carbon $time) use ($message): void {
            /** @var \BasementChat\Basement\Contracts\SendPrivateMessage $sendPrivateMessageAction */
            $sendPrivateMessageAction = app(SendPrivateMessage::class);
            $createdMessage = $sendPrivateMessageAction->send(new PrivateMessageData(
                receiver_id: (int) $message->receiver_id,
                sender_id: (int) $message->sender_id,
                type: $message->type,
                value: $message->value,
                id: (int) $message->id,
                created_at: $message->created_at,
                read_at: $message->read_at,
            ));

            $this->assertInstanceOf(expected: PrivateMessageData::class, actual: $createdMessage);

            $this->assertInstanceOf(expected: Carbon::class, actual: $createdMessage->read_at);
            $this->assertSame(expected: $time->toString(), actual: $createdMessage->read_at->toString());
        });
    }
}
