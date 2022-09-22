<?php

declare(strict_types=1);

namespace BasementChat\Basement\Tests\Browser\Components;

use BasementChat\Basement\Tests\Fixtures\User;
use Illuminate\Support\Str;
use Laravel\Dusk\Browser;
use Laravel\Dusk\Component as BaseComponent;

class ContactComponent extends BaseComponent
{
    /**
     * Get the root selector for the component.
     */
    public function selector(): string
    {
        return '.contact__container--main';
    }

    /**
     * Assert that the browser page contains the component.
     */
    public function assert(Browser $browser): void
    {
        $browser->assertVisible($this->selector());
    }

    /**
     * Assert that given users are displayed.
     */
    public function assertSeeContacts(Browser $browser, User ...$contacts): void
    {
        collect($contacts)->each(static function (User $contact) use ($browser): void {
            $firstName = Str::of($contact->name)->explode(' ')->first();

            $browser->assertSee($firstName);
        });
    }

    /**
     * Assert that given users are in offline status.
     */
    public function assertContactsIsOffline(Browser $browser, User ...$contacts): void
    {
        collect($contacts)->each(static function (User $contact) use ($browser): void {
            $selector = ".contact__container--user-box[data-id=\"{$contact->id}\"]";

            $browser
                ->waitFor("{$selector} > div[title=\"{$contact->name} is offline\"]")
                ->with(selector: $selector, callback: static fn (Browser $container) => $container
                    ->assertAttributeContains(
                        selector: '.contact__container--online-indicator',
                        attribute: 'class',
                        value: 'red',
                    ));
        });
    }

    /**
     * Assert that given users are in online status.
     */
    public function assertContactsIsOnline(Browser $browser, User ...$contacts): void
    {
        collect($contacts)->each(static function (User $contact) use ($browser): void {
            $selector = ".contact__container--user-box[data-id=\"{$contact->id}\"]";

            $browser
                ->waitFor("{$selector} > div[title=\"{$contact->name} is online\"]")
                ->with(selector: $selector, callback: static fn (Browser $container) => $container
                    ->assertAttributeContains(
                        selector: '.contact__container--online-indicator',
                        attribute: 'class',
                        value: 'green',
                    ));
        });
    }

    /**
     * Type keyword in the search contact input form.
     */
    public function filterContactsByKeyword(Browser $browser, string $keyword): void
    {
        $browser
            ->clear('.contact__input--filter')
            ->type(field: '.contact__input--filter', value: $keyword);
    }

    /**
     * Open a private message box with the given user.
     */
    public function openPrivateChatWith(Browser $browser, User $contact): void
    {
        $browser
            ->click(".contact__container--user-box[data-id=\"{$contact->id}\"]")
            ->waitUntilMissing($this->selector());
    }

    /**
     * Waiting for contact data to display successfully.
     */
    public function waitUntilContactsVisible(Browser $browser): void
    {
        $browser->waitUntilMissingText('No contacts found');
    }
}
