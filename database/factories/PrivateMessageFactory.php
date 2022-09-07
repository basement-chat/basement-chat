<?php

declare(strict_types=1);

namespace BasementChat\Basement\Database\Factories;

use BasementChat\Basement\Enums\MessageType;
use BasementChat\Basement\Models\PrivateMessage;
use BasementChat\Basement\Tests\Fixtures\User;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Foundation\Auth\User as Authenticatable;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\BasementChat\Basement\Models\PrivateMessage>
 */
class PrivateMessageFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var class-string<\BasementChat\Basement\Models\PrivateMessage>
     */
    protected $model = PrivateMessage::class;

    /**
     * Define the model's default state.
     *
     * @return array<model-property<\BasementChat\Basement\Models\PrivateMessage>, mixed>
     */
    public function definition(): array
    {
        /** @var \BasementChat\Basement\Tests\Fixtures\User $receiver */
        $receiver = User::inRandomOrder()->first();

        /** @var \BasementChat\Basement\Tests\Fixtures\User $sender */
        $sender = User::inRandomOrder()->first();

        return [
            'receiver_id' => $receiver->id,
            'sender_id' => $sender->id,
            'type' => MessageType::text(),
            'value' => fake()->text(),
            'read_at' => null,
        ];
    }

    /**
     * Indicate that the receiver and sender model's should be two given users.
     *
     * @param \Illuminate\Foundation\Auth\User&\BasementChat\Basement\Contracts\User $receiver
     * @param \Illuminate\Foundation\Auth\User&\BasementChat\Basement\Contracts\User $sender
     */
    public function betweenTwoUsers(Authenticatable $receiver, Authenticatable $sender): self
    {
        return $this->state([
            'receiver_id' => $receiver->id,
            'sender_id' => $sender->id,
        ]);
    }

    /**
     * Indicate that the receiver and sender model's should be same.
     *
     * @param \Illuminate\Foundation\Auth\User&\BasementChat\Basement\Contracts\User $user
     */
    public function sendToSelf(Authenticatable $user): self
    {
        return $this->state([
            'receiver_id' => $user->id,
            'sender_id' => $user->id,
        ]);
    }
}
