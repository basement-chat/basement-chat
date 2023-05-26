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
        return '.basement-private-messages';
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
            $selector = ".basement-private-messages__message-value[data-id=\"{$message->id}\"]";
            $browser
                ->waitUntil(script: <<<JS
                    document.querySelector('{$selector}') !== null
                JS, seconds: 10)
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
            ->scrollIntoView('.basement-private-messages__load-more-messages-button')
            ->assertSee('Load more messages');
    }

    /**
     * Click load more messages button.
     */
    public function clickLoadMoreMessagesButton(Browser $browser): void
    {
        $browser->click('.basement-private-messages__load-more-messages-button');
    }

    /**
     * Type the value of the new message and send it.
     */
    public function sendMessage(Browser $browser, string $message): void
    {
        $browser
            ->type(field: '.basement-private-messages__new-message-input', value: $message)
            ->click('.basemment-private-messages__send-new-message-button-button');
    }
}
