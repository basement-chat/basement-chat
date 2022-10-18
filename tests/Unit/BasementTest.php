<?php

namespace BasementChat\Basement\Tests\Unit;

use BasementChat\Basement\Basement;
use BasementChat\Basement\Tests\TestCase;
use Illuminate\Support\Facades\Config;

class BasementTest extends TestCase
{
    /**
     * @test
     */
    public function itShouldThrowTypeErrorWhenUserModelIsInvalid(): void
    {
        $this->expectException(\TypeError::class);

        Basement::useUserModel('Foo\\Bar');
        Basement::userModel();
    }

    /**
     * @test
     */
    public function itShouldThrowTypeErrorWhenPrivateMessageModelIsInvalid(): void
    {
        $this->expectException(\TypeError::class);

        Basement::usePrivateMessageModel('Foo\\Bar');
        Basement::privateMessageModel();
    }

    /**
     * @test
     */
    public function itShouldThrowTypeErrorWhenAvatarStyleIsInvalid(): void
    {
        $this->expectException(\TypeError::class);

        Config::set(key: 'basement.avatar.style', value: 'Foo\\Bar');

        Basement::getAvatarStyle();
    }

    /**
     * @test
     */
    public function itShouldThrowTypeErrorWhenAvatarOptionsIsInvalid(): void
    {
        $this->expectException(\TypeError::class);

        Config::set(key: 'basement.avatar.options', value: false);

        Basement::getAvatarOptions();
    }

    /**
     * @test
     */
    public function itShouldThrowTypeErrorWhenChatBoxWidgetPositionIsInvalid(): void
    {
        $this->expectException(\TypeError::class);

        Config::set(key: 'basement.chat_box_widget_position', value: 'Foo\\Bar');

        Basement::getChatBoxWidgetPosition();
    }

    /**
     * @test
     */
    public function itShouldThrowTypeErrorWhenBroadcastOptionsIsInvalid(): void
    {
        $this->expectException(\TypeError::class);

        Config::set(key: 'basement.broadcaster.default', value: 'foo_bar');

        Basement::getBroadcastOptions();
    }
}
