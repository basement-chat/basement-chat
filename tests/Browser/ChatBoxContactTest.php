<?php

namespace BasementChat\Basement\Tests\Browser;

use BasementChat\Basement\Tests\BrowserTestCase;
use BasementChat\Basement\Tests\Fixtures\User;
use BasementChat\Basement\Tests\WithPrivateMessages;
use BasementChat\Basement\Tests\WithUsers;
use Illuminate\Foundation\Testing\DatabaseMigrations;
use Laravel\Dusk\Browser;

class ChatBoxContactTest extends BrowserTestCase
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
    public function itShouldBeAbleToSeeAllContacts(): void
    {
        $this->browse(fn (Browser $browser) => $browser
            ->loginAs($this->receiver, guard: 'web')
            ->visit('/dashboard')
            ->pause(1000000));
    }
}
