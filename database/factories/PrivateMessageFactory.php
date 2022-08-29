<?php

namespace Haemanthus\Basement\Database\Factories;

use Haemanthus\Basement\Enums\MessageType;
use Haemanthus\Basement\Models\PrivateMessage;
use Haemanthus\Basement\Tests\Fixtures\User;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Foundation\Auth\User as Authenticatable;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\Haemanthus\Basement\Models\PrivateMessage>
 */
class PrivateMessageFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var class-string<\Haemanthus\Basement\Models\PrivateMessage>
     */
    protected $model = PrivateMessage::class;

    /**
     * Define the model's default state.
     *
     * @return array<model-property<\Haemanthus\Basement\Models\PrivateMessage>, mixed>
     */
    public function definition()
    {
        /** @var \Haemanthus\Basement\Tests\Fixtures\User $receiver */
        $receiver = User::inRandomOrder()->first();

        /** @var \Haemanthus\Basement\Tests\Fixtures\User $sender */
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
     * @param \Illuminate\Foundation\Auth\User $receiver
     * @param \Illuminate\Foundation\Auth\User $sender
     * @return self
     */
    public function betweenTwoUsers(Authenticatable $receiver, Authenticatable $sender): self
    {
        return $this->state([
            'receiver_id' => $receiver->id,
            'sender_id' => $sender->id,
        ]);
    }
}
