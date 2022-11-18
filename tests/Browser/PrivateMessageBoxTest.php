<?php

declare(strict_types=1);

namespace BasementChat\Basement\Tests\Browser;

use BasementChat\Basement\Tests\Browser\Components\ChatBoxComponent;
use BasementChat\Basement\Tests\Browser\Components\ContactComponent;
use BasementChat\Basement\Tests\Browser\Components\PrivateMessageComponent;
use BasementChat\Basement\Tests\BrowserTestCase;
use BasementChat\Basement\Tests\Fixtures\Models\User;
use BasementChat\Basement\Tests\WithPrivateMessages;
use BasementChat\Basement\Tests\WithUsers;
use Illuminate\Database\Eloquent\Factories\Sequence;
use Illuminate\Foundation\Testing\DatabaseMigrations;
use Laravel\Dusk\Browser;

class PrivateMessageBoxTest extends BrowserTestCase
{
    use DatabaseMigrations;
    use WithPrivateMessages;
    use WithUsers;

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
        $this->addUsers(3);

        $this->receiver = $this->users[0];
        $this->sender = $this->users[1];
    }

    /**
     * @test
     */
    public function itShouldBeAbleToSeeAllPrivateMessages(): void
    {
        $this->addPrivateMessages(receiver: $this->sender, sender: $this->receiver, count: 50, state: new Sequence(
            ['created_at' => now()->subYears(2), 'read_at' => now()],
        ));

        $this->addPrivateMessages(receiver: $this->receiver, sender: $this->sender, count: 9, state: new Sequence(
            ['created_at' => now()->subYear()],
            ['created_at' => now()->subMonth()],
            ['created_at' => now()->subDay()],
            ['created_at' => now()->subHours(3)],
            ['created_at' => now()->subHours(2)],
            ['created_at' => now()->subHour()],
            ['created_at' => now()->subMinutes(3)],
            ['created_at' => now()->subMinutes(2)],
            ['created_at' => now()->subMinute()],
        ));

        $this->browse(function (Browser $browser): void {
            $browser->resize(width: 800, height: 600);

            $last5Messages = $this->privateMessages->reverse()->slice(0, 5)->values();
            $first5Messages = $this->privateMessages->slice(0, 5)->values();

            $browser->loginAs($this->receiver, guard: 'web');
            $browser->visit('/dashboard');

            $browser->within(selector: new ChatBoxComponent(), callback: fn (Browser $chatBox) => $chatBox
                ->openChatBox()
                ->within(selector: new ContactComponent(), callback: fn (Browser $contact) => $contact
                    ->waitUntilContactsVisible()
                    ->openPrivateChatWith($this->sender))
                ->within(selector: new PrivateMessageComponent(), callback: static fn (Browser $message) => $message
                    ->assertSeeMessages(...$last5Messages)
                    ->assertSeeLoadMoreMessagesButton()
                    ->clickLoadMoreMessagesButton()
                    ->assertSeeMessages(...$first5Messages)));

            $browser->screenshot('itShouldBeAbleToSeeAllPrivateMessages $browser' . time());
        });
    }

    /**
     * @test
     */
    public function itShouldBeAbleToSendAPrivateMessageInRealtime(): void
    {
        $this->browse(function (Browser $browserReceiver, Browser $browserSender): void {
            $browserReceiver->resize(width: 800, height: 600);
            $browserSender->resize(width: 800, height: 600);

            $browserReceiver->loginAs($this->receiver, guard: 'web');
            $browserReceiver->visit('/dashboard');

            $browserSender->loginAs($this->sender, guard: 'web');
            $browserSender->visit('/dashboard');

            $browserReceiver->within(selector: new ChatBoxComponent(), callback: fn (Browser $chatBox) => $chatBox
                ->openChatBox()
                ->within(selector: new ContactComponent(), callback: fn (Browser $contact) => $contact
                    ->waitUntilContactsVisible()
                    ->openPrivateChatWith($this->sender)));

            $browserSender->within(selector: new ChatBoxComponent(), callback: fn (Browser $chatBox) => $chatBox
                ->openChatBox()
                ->within(selector: new ContactComponent(), callback: fn (Browser $contact) => $contact
                    ->waitUntilContactsVisible()
                    ->openPrivateChatWith($this->receiver))
                ->within(selector: new PrivateMessageComponent(), callback: static fn (Browser $message) => $message
                    ->sendMessage('Hello World!')
                    ->waitFor(selector: '.private-message__text--value', seconds: 10)
                    ->assertSee('Hello World!')));

            $browserReceiver->within(selector: new PrivateMessageComponent(), callback: static fn (Browser $message) => $message
                ->waitFor(selector: '.private-message__text--value', seconds: 10)
                ->assertSee('Hello World!'));

            $browserSender->screenshot('itShouldBeAbleToSendAPrivateMessageInRealtime $browserSender' . time());
            $browserReceiver->screenshot('itShouldBeAbleToSendAPrivateMessageInRealtime $browserReceiver' . time());
        });
    }

    /**
     * @test
     */
    public function itShouldBeAbleToShowTheNumberOfUnreadMessages(): void
    {
        $this->addPrivateMessages(receiver: $this->receiver, sender: $this->sender, count: 10);

        $this->browse(function (Browser $browser): void {
            $browser->resize(width: 800, height: 600);

            $browser->loginAs($this->receiver, guard: 'web');
            $browser->visit('/dashboard');

            $browser->within(selector: new ChatBoxComponent(), callback: fn (Browser $chatBox) => $chatBox
                ->assertSeeUnreadMessagesCount(10)
                ->openChatBox()
                ->within(selector: new ContactComponent(), callback: fn (Browser $contact) => $contact
                    ->waitUntilContactsVisible()
                    ->assertSeeUnreadMessagesCount($this->sender, 10)));

            $browser->screenshot('itShouldBeAbleToShowTheNumberOfUnreadMessages $browser' . time());
        });
    }
}
