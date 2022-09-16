<?php

namespace BasementChat\Basement\Tests\Browser;

use BasementChat\Basement\Tests\Browser\Components\ChatBoxComponent;
use BasementChat\Basement\Tests\Browser\Components\ContactComponent;
use BasementChat\Basement\Tests\BrowserTestCase;
use BasementChat\Basement\Tests\Fixtures\User;
use BasementChat\Basement\Tests\WithPrivateMessages;
use BasementChat\Basement\Tests\WithUsers;
use Illuminate\Database\Eloquent\Factories\Sequence;
use Illuminate\Foundation\Testing\DatabaseMigrations;
use Laravel\Dusk\Browser;

class ContactBoxTest extends BrowserTestCase
{
    use DatabaseMigrations;
    use WithPrivateMessages;
    use WithUsers;

    protected User $receiver;

    protected User $sender1;

    protected User $sender2;

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
        $this->sender1 = $this->users[1];
        $this->sender2 = $this->users[2];
    }

    /**
     * @test
     */
    public function itShouldBeAbleToSeeAllContactsWithTheirOnlineStatus(): void
    {
        $this->addPrivateMessages(receiver: $this->receiver, sender: $this->sender1, state: new Sequence([
            'created_at' => now()->yesterday(),
        ]));
        $this->addPrivateMessages(receiver: $this->receiver, sender: $this->sender2);

        $this->browse(function (Browser $browserReceiver, Browser $browserSender): void {
            $browserReceiver->loginAs($this->receiver, guard: 'web');
            $browserReceiver->visit('/dashboard');

            $browserSender->loginAs($this->sender1, guard: 'web');
            $browserSender->visit('/dashboard');

            $browserReceiver->within(selector: new ChatBoxComponent(), callback: fn (Browser $chatBox) => $chatBox
                ->openChatBox()
                ->within(selector: new ContactComponent(), callback: fn (Browser $contact) => $contact
                    ->waitUntilContactsVisible()
                    ->assertSeeContacts($this->receiver->name, $this->sender1->name, $this->sender2->name)
                    ->assertContactsIsOnline($this->receiver->name, $this->sender1->name)
                    ->assertContactsIsOffline($this->sender2->name)));
        });
    }

    /**
     * @test
     */
    public function itShouldBeAbleToFilterContactsByKeyword(): void
    {
        $this->browse(function (Browser $browser): void {
            $browser->loginAs($this->receiver, guard: 'web');
            $browser->visit('/dashboard');

            $browser->within(selector: new ChatBoxComponent(), callback: fn (Browser $chatBox) => $chatBox
                ->openChatBox()
                ->within(selector: new ContactComponent(), callback: fn (Browser $contact) => $contact
                    ->waitUntilContactsVisible()
                    ->filterContacts($this->receiver->name)
                    ->assertSeeContacts($this->receiver->name)
                    ->filterContacts(' ')
                    ->assertSeeContacts($this->receiver->name, $this->sender1->name, $this->sender2->name)));
        });
    }
}
