<?php

declare(strict_types=1);

namespace BasementChat\Basement\Tests\Browser\Components;

use BasementChat\Basement\Tests\Fixtures\Models\User;
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
        return '.basement-contacts';
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
            $selector = ".basement-contacts__user-container[data-id=\"{$contact->id}\"]";

            $browser
                ->waitFor(
                    selector: "{$selector} > div[data-title=\"{$contact->name} is offline\"]",
                    seconds: 10,
                )
                ->with(selector: $selector, callback: static fn (Browser $container) => $container
                    ->assertAttributeContains(
                        selector: '.basement-contacts__user-online-indicator',
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
            $selector = ".basement-contacts__user-container[data-id=\"{$contact->id}\"]";

            $browser
                ->waitFor(
                    selector: "{$selector} > div[data-title=\"{$contact->name} is online\"]",
                    seconds: 10,
                )
                ->with(selector: $selector, callback: static fn (Browser $container) => $container
                    ->assertAttributeContains(
                        selector: '.basement-contacts__user-online-indicator',
                        attribute: 'class',
                        value: 'green',
                    ));
        });
    }

    /**
     * Assert that the given contact has the number of unread messages.
     */
    public function assertSeeUnreadMessagesCount(Browser $browser, User $contact, int $count): void
    {
        $selector = ".basement-contacts__user-container[data-id=\"{$contact->id}\"]";

        $browser->assertSeeIn(selector: "{$selector} .basement-contacts__user-unread-messages-count", text: $count);
    }

    /**
     * Type keyword in the search contact input form.
     */
    public function filterContactsByKeyword(Browser $browser, string $keyword): void
    {
        $browser
            ->clear('.basement-contacts__filter-contacts-input')
            ->type(field: '.basement-contacts__filter-contacts-input', value: $keyword);
    }

    /**
     * Open a private message box with the given user.
     */
    public function openPrivateChatWith(Browser $browser, User $contact): void
    {
        $this->filterContactsByKeyword($browser, $contact->name);

        $browser
            ->click(".basement-contacts__user-container")
            ->waitUntilMissing(selector: $this->selector(), seconds: 10);
    }

    /**
     * Waiting for contact data to display successfully.
     */
    public function waitUntilContactsVisible(Browser $browser): void
    {
        $browser->waitUntilMissingText(text: 'No contacts found', seconds: 10);
    }
}
