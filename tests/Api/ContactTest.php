<?php

declare(strict_types=1);

namespace Haemanthus\Basement\Tests\Api;

use Haemanthus\Basement\Tests\ApiJsonStructure;
use Haemanthus\Basement\Tests\Fixtures\User;
use Haemanthus\Basement\Tests\TestCase;
use Haemanthus\Basement\Tests\WithPrivateMessages;
use Haemanthus\Basement\Tests\WithUsers;
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
    protected function setUp(): void
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
