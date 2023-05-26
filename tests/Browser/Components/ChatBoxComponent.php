<?php

declare(strict_types=1);

namespace BasementChat\Basement\Tests\Browser\Components;

use Laravel\Dusk\Browser;
use Laravel\Dusk\Component as BaseComponent;

class ChatBoxComponent extends BaseComponent
{
    /**
     * Get the root selector for the component.
     */
    public function selector(): string
    {
        return '.basement-chat-box';
    }

    /**
     * Assert that the browser page contains the component.
     */
    public function assert(Browser $browser): void
    {
        $browser->assertVisible($this->selector());
    }

    /**
     * Assert that the browser page contains the number of unread messages.
     */
    public function assertSeeUnreadMessagesCount(Browser $browser, int $count): void
    {
        $browser
            ->waitFor(
                selector: ".basement-chat-box__open-button[data-title=\"There are $count unread messages\"]",
                seconds: 10,
            )
            ->assertSee($count);
    }

    /**
     * Maximize the chat box container.
     */
    public function openChatBox(Browser $browser): void
    {
        $browser->click('.basement-chat-box__open-button');
    }
}
