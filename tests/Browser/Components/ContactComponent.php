<?php

namespace BasementChat\Basement\Tests\Browser\Components;

use Laravel\Dusk\Browser;
use Laravel\Dusk\Component as BaseComponent;

class ContactComponent extends BaseComponent
{
    /**
     * Get the root selector for the component.
     */
    public function selector(): string
    {
        return '@contact__container--main';
    }

    /**
     * Assert that the browser page contains the component.
     */
    public function assert(Browser $browser): void
    {
        $browser->assertVisible($this->selector());
    }

    /**
     * Assert that given names are displayed.
     */
    public function assertSeeContacts(Browser $browser, string ...$names): void
    {
        collect($names)->each(fn (string $name) => $browser->assertSee($name));
    }

    /**
     * Assert that given names are in offline status.
     */
    public function assertContactsIsOffline(Browser $browser, string ...$names): void
    {
        collect($names)->each(fn (string $name) => $browser
            ->waitFor("div[title=\"{$name} is offline\"]")
            ->with(
                selector: "div[title=\"{$name} is offline\"]",
                callback: function (Browser $container): void {
                    $container->assertAttributeContains(
                        selector: '@contact__container--online-indicator',
                        attribute: 'class',
                        value: 'red',
                    );
                },
            ));
    }

    /**
     * Assert that given names are in online status.
     */
    public function assertContactsIsOnline(Browser $browser, string ...$names): void
    {
        collect($names)->each(fn (string $name) => $browser
            ->waitFor("div[title=\"{$name} is online\"]")
            ->with(
                selector: "div[title=\"{$name} is online\"]",
                callback: function (Browser $container): void {
                    $container->assertAttributeContains(
                        selector: '@contact__container--online-indicator',
                        attribute: 'class',
                        value: 'green',
                    );
                },
            ));
    }

    /**
     * Type keyword in the search contact input form.
     */
    public function filterContacts(Browser $browser, string $keyword): void
    {
        $browser
            ->clear('@contact__input--filter')
            ->type(field: '@contact__input--filter', value: $keyword);
    }

    /**
     * Waiting for contact data to display successfully.
     */
    public function waitUntilContactsVisible(Browser $browser): void
    {
        $browser->waitUntilMissingText('No contacts found');
    }
}
