<?php

declare(strict_types=1);

namespace BasementChat\Basement\Tests\Feature\Api;

use BasementChat\Basement\Tests\ApiJsonStructure;
use BasementChat\Basement\Tests\Fixtures\Models\User;
use BasementChat\Basement\Tests\TestCase;
use BasementChat\Basement\Tests\WithPrivateMessages;
use BasementChat\Basement\Tests\WithUsers;
use Illuminate\Foundation\Testing\RefreshDatabase;

class PrivateMessageTest extends TestCase
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
    public function itShouldGetResponseStatusCodeOkIfCanGetAllPrivateMessages(): void
    {
        $this->addPrivateMessages(receiver: $this->receiver, sender: $this->sender, count: 15);

        $this->actingAs($this->sender);

        $response = $this->get("/api/basement/contacts/{$this->receiver->id}/private-messages");

        $response->assertOk();
        $response->assertJsonStructure(array_merge($this->paginationStructure, [
            'data' => [
                '*' => $this->privateMessageStructure,
            ],
        ]));
    }

    /**
     * @test
     */
    public function itShouldBeRedirectedToLoginPageIfNotAuthenticatedWhenGettingAllPrivateMessages(): void
    {
        $response = $this->get("/api/basement/contacts/{$this->receiver->id}/private-messages");

        $response->assertRedirect('login');
    }

    /**
     * @test
     */
    public function itShouldGetResponseStatusCodeCreatedIfCanSendAPrivateMessage(): void
    {
        $this->actingAs($this->sender);

        $response = $this->post(uri: "/api/basement/contacts/{$this->receiver->id}/private-messages", data: [
            'value' => fake()->text(),
        ]);

        $response->assertCreated();
        $response->assertJsonStructure([
            'data' => $this->privateMessageStructure,
        ]);
    }

    /**
     * @test
     */
    public function itShouldGetResponseStatusCodeUnprocessableIfTheDataProvidedIsIncorrectWhenSendingAPrivateMessage(): void
    {
        $this->actingAs($this->sender);

        $response = $this->post(uri: "/api/basement/contacts/{$this->receiver->id}/private-messages", headers: [
            'Accept' => 'application/json',
        ]);

        $response->assertUnprocessable();
        $response->assertJsonStructure(['message', 'errors' => ['value']]);
    }

    /**
     * @test
     */
    public function itShouldBeRedirectedToLoginPageIfNotAuthenticatedWhenSendingAPrivateMessage(): void
    {
        $response = $this->post(uri: "/api/basement/contacts/{$this->receiver->id}/private-messages", data: [
            'value' => fake()->text(),
        ]);

        $response->assertRedirect('login');
    }

    /**
     * @test
     */
    public function itShouldGetResponseStatusCodeOkIfCanMarkPrivateMessagesAsRead(): void
    {
        $this->addPrivateMessages(receiver: $this->receiver, sender: $this->sender, count: 10);

        $this->actingAs($this->receiver);

        $response = $this->patch(
            uri: '/api/basement/private-messages',
            data: $this->privateMessages->pluck('id')->map(static fn (int $id): array => [
                'operation' => 'mark as read',
                'value' => ['id' => $id],
            ])->toArray(),
            headers: [
                'Accept' => 'application/json',
            ],
        );

        $response->assertOk();
        $response->assertJsonStructure([
            'data' => [
                '*' => $this->privateMessageStructure,
            ],
        ]);
    }

    /**
     * @test
     */
    public function itShouldGetResponseStatusCodeUnprocessableIfUpdateMessagesWhenDataEmpty(): void
    {
        $this->actingAs($this->sender);

        $response = $this->patch(uri: '/api/basement/private-messages', data: [], headers: [
            'Accept' => 'application/json',
        ]);

        $response->assertUnprocessable();
        $response->assertJsonStructure(['message', 'errors' => ['*']]);
    }

    /**
     * @test
     */
    public function itShouldGetResponseStatusCodeUnprocessableIfMarkMessageAsReadWhichIsNotReceived(): void
    {
        $this->addPrivateMessages(receiver: $this->receiver, sender: $this->sender, count: 10);

        $this->actingAs($this->sender);

        $response = $this->patch(
            uri: '/api/basement/private-messages',
            data: $this->privateMessages->pluck('id')->map(static fn (int $id): array => [
                'operation' => 'mark as read',
                'value' => ['id' => $id],
            ])->toArray(),
            headers: [
                'Accept' => 'application/json',
            ],
        );

        $response->assertUnprocessable();
        $response->assertJsonStructure(['message', 'errors' => ['0.value.id']]);
    }
}
