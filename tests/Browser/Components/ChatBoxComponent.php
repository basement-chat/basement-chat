<?php

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
        return '.chat-box__container--main';
    }

    /**
     * Assert that the browser page contains the component.
     */
    public function assert(Browser $browser): void
    {
        $browser->assertVisible($this->selector());
    }

    /**
     * Maximize the chat box container.
     */
    public function openChatBox(Browser $browser): void
    {
        $browser->click('.chat-box__button--open');
    }
}
