<?php

declare(strict_types=1);

namespace BasementChat\Basement\Database\Factories;

use BasementChat\Basement\Tests\Fixtures\User;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\BasementChat\Basement\Tests\Fixtures\User>
 */
class UserFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var class-string<\BasementChat\Basement\Tests\Fixtures\User>
     */
    protected $model = User::class;

    /**
     * Define the model's default state.
     *
     * @return array<model-property<\BasementChat\Basement\Tests\Fixtures\User>, mixed>
     */
    public function definition(): array
    {
        return [
            'name' => fake()->unique()->name(),
            'email' => fake()->safeEmail(),
            'email_verified_at' => now(),
            'password' => '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', // password
            'remember_token' => Str::random(10),
        ];
    }
}
