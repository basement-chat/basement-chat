<?php

namespace Haemanthus\Basement\Tests\Api;

use Haemanthus\Basement\Tests\Fixtures\User;
use Illuminate\Foundation\Testing\RefreshDatabase;

use function Pest\Laravel\actingAs;
use function Pest\Laravel\get;

uses(RefreshDatabase::class);

it(description: 'should get response status code 200 if authenticated', closure: function (): void {
    /** @var \Haemanthus\Basement\Tests\Fixtures\User $user */
    $user = User::factory()->create();

    actingAs($user);

    $response = get('/api/contacts');

    $response->assertOk();
    $response->assertJsonStructure([
        'data' => [
            '*' => [
                'id',
                'name',
                'avatar',
                'last_private_message',
                'unread_messages',
            ],
        ],
    ]);
});

it(description: 'should be redirected to login page if not authenticated', closure: function (): void {
    $response = get('/api/contacts');

    $response->assertRedirect(uri: 'login');
});
