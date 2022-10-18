<?php

declare(strict_types=1);

namespace BasementChat\Basement\Tests\Actions;

use BasementChat\Basement\Contracts\AllPrivateMessages;
use BasementChat\Basement\Models\PrivateMessage;
use BasementChat\Basement\Tests\Fixtures\Models\User;
use BasementChat\Basement\Tests\TestCase;
use BasementChat\Basement\Tests\WithPrivateMessages;
use BasementChat\Basement\Tests\WithUsers;
use Illuminate\Contracts\Pagination\CursorPaginator;
use Illuminate\Database\Eloquent\Factories\Sequence;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Spatie\LaravelData\DataCollection;

class AllPrivateMessagesTest extends TestCase
{
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
    public function itShouldBeAbleToGetAllPrivateMessagesBetweenTwoUsers(): void
    {
        $this->addPrivateMessages(receiver: $this->receiver, sender: $this->sender, count: 10);
        $this->addPrivateMessages(receiver: $this->sender, sender: $this->receiver, count: 10);

        /** @var \BasementChat\Basement\Contracts\AllPrivateMessages $allPrivateMessages */
        $allPrivateMessages = app(AllPrivateMessages::class);

        $messages = $allPrivateMessages->allBetweenTwoUsers(receiver: $this->receiver, sender: $this->sender);

        $this->assertInstanceOf(expected: DataCollection::class, actual: $messages);
        $this->assertCount(expectedCount: $this->privateMessages->count(), haystack: $messages);

        $this->privateMessages
            ->reverse()
            ->values()
            ->each(fn (PrivateMessage $message, int $key) => $this->assertSame(
                expected: $message->id,
                actual: $messages[$key]->id,
            ));
    }

    /**
     * @test
     */
    public function itShouldBeCursorPaginated(): void
    {
        $this->addPrivateMessages(receiver: $this->receiver, sender: $this->sender, count: 100);
        $this->addPrivateMessages(receiver: $this->sender, sender: $this->receiver, count: 100);

        /** @var \BasementChat\Basement\Contracts\AllPrivateMessages $allPrivateMessages */
        $allPrivateMessages = app(AllPrivateMessages::class);

        $messages = $allPrivateMessages->allBetweenTwoUsers(receiver: $this->receiver, sender: $this->sender);

        $this->assertCount(expectedCount: 50, haystack: $messages);
        $this->assertInstanceOf(expected: CursorPaginator::class, actual: $messages->items());
        $this->assertNotNull(actual: $messages->items()->nextPageUrl());
    }

    /**
     * @test
     */
    public function itShouldBeFilteredByTheGivenKeyword(): void
    {
        $this->addPrivateMessages(receiver: $this->receiver, sender: $this->sender, count: 30, state: new Sequence(
            ['value' => 'Lorem ipsum dolor sit amet consectetur, adipisicing elit.'],
            ['value' => 'Enim rerum ullam tenetur voluptatem, nostrum aspernatur consequatur libero itaque eos.'],
        ));

        /** @var \BasementChat\Basement\Contracts\AllPrivateMessages $allPrivateMessages */
        $allPrivateMessages = app(AllPrivateMessages::class);

        $messages = $allPrivateMessages->allBetweenTwoUsers(
            receiver: $this->receiver,
            sender: $this->sender,
            keyword: 'lorem ipsum dolor sit',
        );

        $this->assertCount(expectedCount: 15, haystack: $messages);
    }
}
