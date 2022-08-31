<?php

namespace Haemanthus\Basement\Tests\Feature;

use Haemanthus\Basement\Contracts\SendPrivateMessage;
use Haemanthus\Basement\Data\PrivateMessageData;
use Haemanthus\Basement\Models\PrivateMessage;
use Haemanthus\Basement\Notifications\PrivateMessageSent;
use Haemanthus\Basement\Tests\Fixtures\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Notification;

use function Pest\Laravel\assertDatabaseCount;
use function Pest\Laravel\assertDatabaseHas;

uses(RefreshDatabase::class);

it(description: 'should be able to send a private message', closure: function (): void {
    Notification::fake();
    User::factory()->count(2)->create();

    $message = PrivateMessageData::from(PrivateMessage::factory()->make()->load('receiver'));

    /** @var \Haemanthus\Basement\Tests\TestCase $this */

    $this->freezeTime(function (Carbon $time) use ($message): void {
        /** @var \Haemanthus\Basement\Contracts\SendPrivateMessage $sendPrivateMessageAction */
        $sendPrivateMessageAction = app(SendPrivateMessage::class);
        $createdMessage = $sendPrivateMessageAction->send($message);

        expect($createdMessage)->toBeInstanceOf(PrivateMessageData::class);
        expect($createdMessage->created_at->toString())->toBe($time->toString());
        expect($createdMessage->receiver_id)->toBe($message->receiver_id);
        expect($createdMessage->sender_id)->toBe($message->sender_id);
        expect($createdMessage->type)->toBe($message->type);
        expect($createdMessage->value)->toBe($message->value);
    });

    assertDatabaseCount(table: 'private_messages', count: 1);
    assertDatabaseHas(table: 'private_messages', data: [
        'receiver_id' => $message->receiver_id,
        'sender_id' => $message->sender_id,
        'type' => $message->type->value,
        'value' => $message->value,
    ]);

    Notification::assertCount(1);
    Notification::assertSentTo(notifiable: $message->receiver->resolve(), notification: PrivateMessageSent::class);
});

it(description: 'should be marked as read if sending a message to self', closure: function (): void {
    Notification::fake();

    /** @var \Haemanthus\Basement\Tests\Fixtures\User $receiver */
    $user = User::factory()->create();

    $message = PrivateMessageData::from(
        PrivateMessage::factory()->sendToSelf($user)->make()->load('sender')
    );

    /** @var \Haemanthus\Basement\Tests\TestCase $this */

    $this->freezeTime(function (Carbon $time) use ($message): void {
        /** @var \Haemanthus\Basement\Contracts\SendPrivateMessage $sendPrivateMessageAction */
        $sendPrivateMessageAction = app(SendPrivateMessage::class);
        $createdMessage = $sendPrivateMessageAction->send($message);

        expect($createdMessage)->toBeInstanceOf(PrivateMessageData::class);

        expect($createdMessage->read_at)->toBeInstanceOf(Carbon::class);
        expect($createdMessage->read_at->toString())->toBe($time->toString());
    });
});
