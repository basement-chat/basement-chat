<?php

namespace Haemanthus\Basement\Tests\Api;

use Haemanthus\Basement\Models\PrivateMessage;
use Haemanthus\Basement\Tests\ApiJsonStructure;
use Haemanthus\Basement\Tests\Fixtures\User;
use Illuminate\Foundation\Testing\RefreshDatabase;

use function Pest\Laravel\actingAs;
use function Pest\Laravel\get;
use function Pest\Laravel\patch;
use function Pest\Laravel\post;

uses(ApiJsonStructure::class, RefreshDatabase::class);

it(description: 'should get response status code 200 if can get all private messages', closure: function (): void {
    [$receiver, $sender] = User::factory()->count(2)->create();

    /** @var \Haemanthus\Basement\Tests\Fixtures\User $receiver */
    /** @var \Haemanthus\Basement\Tests\Fixtures\User $sender */

    PrivateMessage::factory()
        ->count(15)
        ->betweenTwoUsers(receiver: $receiver, sender: $sender)
        ->create();

    actingAs($receiver);

    $response = get("/api/contacts/{$sender->id}/private-messages");

    $response->assertOk();
    $response->assertJsonStructure(array_merge($this->paginationStructure, [
        'data' => [
            '*' => $this->privateMessageStructure,
        ],
    ]));
});

it(description: 'should be redirected to login page if not authenticated when getting all private messages', closure: function (): void {
    /** @var \Haemanthus\Basement\Tests\Fixtures\User $user */
    $user = User::factory()->create();

    $response = get("/api/contacts/{$user->id}/private-messages");

    $response->assertRedirect(uri: 'login');
});

it(description: 'should get response status code 201 if can send a private message', closure: function (): void {
    [$receiver, $sender] = User::factory()->count(2)->create();

    /** @var \Haemanthus\Basement\Tests\Fixtures\User $receiver */
    /** @var \Haemanthus\Basement\Tests\Fixtures\User $sender */

    actingAs($sender);

    $response = post(uri: "/api/contacts/{$receiver->id}/private-messages", data: [
        'value' => fake()->text(),
    ]);

    $response->assertCreated();
    $response->assertJsonStructure([
        'data' =>  $this->privateMessageStructure,
    ]);
});

it(description: 'should get response status code 422 if the data provided is incorrect when sending a private message', closure: function (): void {
    /** @var \Haemanthus\Basement\Tests\Fixtures\User $user */
    $user = User::factory()->create();

    actingAs($user);

    $response = post(uri: "/api/contacts/{$user->id}/private-messages", headers: [
        'Accept' => 'application/json',
    ]);

    $response->assertUnprocessable();
    $response->assertJsonStructure(['message', 'errors' => ['value']]);
});

it(description: 'should be redirected to login page if not authenticated when sending a private message', closure: function (): void {
    /** @var \Haemanthus\Basement\Tests\Fixtures\User $user */
    $user = User::factory()->create();

    $response = post(uri: "/api/contacts/{$user->id}/private-messages", data: [
        'value' => fake()->text(),
    ]);

    $response->assertRedirect(uri: 'login');
});

it(description: 'should get response status code 200 if can mark private messages as read', closure: function (): void {
    [$receiver, $sender] = User::factory()->count(2)->create();

    /** @var \Haemanthus\Basement\Tests\Fixtures\User $receiver */
    /** @var \Haemanthus\Basement\Tests\Fixtures\User $sender */

    $messages = PrivateMessage::factory()
        ->count(10)
        ->betweenTwoUsers(receiver: $receiver, sender: $sender)
        ->create();

    actingAs($receiver);

    $response = patch(
        uri: '/api/private-messages',
        data: $messages
            ->map(fn (PrivateMessage $privateMessage): array => [
                'operation' => 'mark as read',
                'value' => ['id' => $privateMessage->id],
            ])
            ->toArray(),
        headers: [
            'Accept' => 'application/json',
        ],
    );

    $response->assertOk();
    $response->assertJsonStructure([
        'data' =>  [
            '*' => $this->privateMessageStructure,
        ],
    ]);
});


it(description: 'should get response status code 422 if mark message as read which is not received', closure: function (): void {
    [$receiver, $sender] = User::factory()->count(2)->create();

    /** @var \Haemanthus\Basement\Tests\Fixtures\User $receiver */
    /** @var \Haemanthus\Basement\Tests\Fixtures\User $sender */

    $messages = PrivateMessage::factory()
        ->count(10)
        ->betweenTwoUsers(receiver: $receiver, sender: $sender)
        ->create();

    actingAs($sender);

    $response = patch(
        uri: '/api/private-messages',
        data: $messages
            ->map(fn (PrivateMessage $privateMessage): array => [
                'operation' => 'mark as read',
                'value' => ['id' => $privateMessage->id],
            ])
            ->toArray(),
        headers: [
            'Accept' => 'application/json',
        ],
    );

    $response->assertUnprocessable();
    $response->assertJsonStructure(['message', 'errors' => ['0.value.id']]);
});
