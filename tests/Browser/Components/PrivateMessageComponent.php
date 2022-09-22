<?php

declare(strict_types=1);

namespace BasementChat\Basement\Tests\Browser\Components;

use BasementChat\Basement\Models\PrivateMessage;
use Laravel\Dusk\Browser;
use Laravel\Dusk\Component as BaseComponent;

class PrivateMessageComponent extends BaseComponent
{
    /**
     * Get the root selector for the component.
     */
    public function selector(): string
    {
        return '.private-message__container--main';
    }

    /**
     * Assert that the browser page contains the component.
     */
    public function assert(Browser $browser): void
    {
        $browser->assertVisible($this->selector());
    }

    /**
     * Assert that given messages are displayed.
     */
    public function assertSeeMessages(Browser $browser, PrivateMessage ...$messages): void
    {
        collect($messages)->each(static function (PrivateMessage $message) use ($browser): void {
            $selector = ".private-message__text--value[data-id=\"{$message->id}\"]";
            $browser
                ->waitUntil(<<<JS
                    document.querySelector('{$selector}') !== null
                JS)
                ->scrollIntoView($selector)
                ->assertSee($message->value);
        });
    }

    /**
     * Assert that the load more messages button is available.
     */
    public function assertSeeLoadMoreMessagesButton(Browser $browser): void
    {
        $browser
            ->scrollIntoView('.private-message__button--load-more')
            ->assertSee('Load more messages');
    }

    /**
     * Click load more messages button.
     */
    public function clickLoadMoreMessagesButton(Browser $browser): void
    {
        $browser->click('.private-message__button--load-more');
    }

    /**
     * Type the value of the new message and send it.
     */
    public function sendMessage(Browser $browser, string $message): void
    {
        $browser
            ->type(field: '.private-message__input--message-value', value: $message)
            ->click('.private-message__button--send');
    }
}
