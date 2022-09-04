<?php

declare(strict_types=1);

namespace Haemanthus\Basement\Tests\Api;

use Haemanthus\Basement\Models\PrivateMessage;
use Haemanthus\Basement\Tests\ApiJsonStructure;
use Haemanthus\Basement\Tests\Fixtures\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use function Pest\Laravel\actingAs;
use function Pest\Laravel\get;

uses(ApiJsonStructure::class, RefreshDatabase::class);

it(description: 'should get response status code 200 if can get all contacts', closure: function (): void {
    /** @var \Haemanthus\Basement\Tests\Fixtures\User $user */
    $user = User::factory()->create();

    PrivateMessage::factory()
        ->count(15)
        ->betweenTwoUsers(receiver: $user, sender: $user)
        ->create();

    actingAs($user);

    $response = get('/api/contacts');

    $response->assertOk();
    $response->assertJsonStructure([
        'data' => [
            '*' => array_merge($this->contactStructure, [
                'last_private_message' => $this->privateMessageStructure,
            ]),
        ],
    ]);
});

it(description: 'should be redirected to login page if not authenticated when getting all contacts', closure: function (): void {
    $response = get('/api/contacts');

    $response->assertRedirect(uri: 'login');
});
