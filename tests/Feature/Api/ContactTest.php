<?php

declare(strict_types=1);

namespace BasementChat\Basement\Tests\Feature\Api;

use BasementChat\Basement\Tests\ApiJsonStructure;
use BasementChat\Basement\Tests\Fixtures\Models\User;
use BasementChat\Basement\Tests\TestCase;
use BasementChat\Basement\Tests\WithPrivateMessages;
use BasementChat\Basement\Tests\WithUsers;
use Illuminate\Foundation\Testing\RefreshDatabase;

class ContactTest extends TestCase
{
    use ApiJsonStructure;
    use RefreshDatabase;
    use WithUsers;
    use WithPrivateMessages;

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
    public function itShouldGetResponseStatusCodeOkIfCanGetAllContacts(): void
    {
        $this->addPrivateMessages(receiver: $this->receiver, sender: $this->receiver);
        $this->addPrivateMessages(receiver: $this->receiver, sender: $this->sender);

        $this->actingAs($this->receiver);

        $response = $this->get('/api/contacts');

        $response->assertOk();
        $response->assertJsonStructure([
            'data' => [
                '*' => array_merge($this->contactStructure, [
                    'last_private_message' => $this->privateMessageStructure,
                ]),
            ],
        ]);
    }

    /**
     * @test
     */
    public function itShouldBeRedirectedToLoginPageIfNotAuthenticatedWhenGettingAllContacts(): void
    {
        $response = $this->get('/api/contacts');

        $response->assertRedirect('login');
    }
}
