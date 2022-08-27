<?php

namespace Haemanthus\Basement\Tests\Feature\Models;

use Haemanthus\Basement\Enums\AvatarStyle;
use Haemanthus\Basement\Tests\Fixtures\User;

it(description: 'avatar property must represent the value from the config', closure: function (): void {
    config(['basement.avatar.style' => AvatarStyle::bigEars()]);
    config(['basement.avatar.options' => ['size' => 32]]);

    /** @var \Haemanthus\Basement\Tests\Fixtures\User $user */
    $user = User::factory()->make([
        'name' => 'John Doe',
    ]);

    expect($user->avatar)
        ->toBe('https://avatars.dicebear.com/api/big-ears/4c2a904bafba06591225113ad17b5cec.svg?size=32');
});
