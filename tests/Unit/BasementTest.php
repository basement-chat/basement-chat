<?php

use Haemanthus\Basement\Facades\Basement;

it(description: 'should return the same model as in the given config file', closure: function (): void {
    $class = '\\App\\Models\\Admin';

    config(['basement.user_model' => $class]);

    expect(Basement::userModel())->toBe($class);
});

it(description: 'should return the correct avatar URI as in the given config file', closure: function (): void {
    config(['basement.avatar.style' => 'big-ears']);
    config(['basement.avatar.options' => ['size' => 32]]);

    expect(Basement::avatar('John Doe'))
        ->toBe('https://avatars.dicebear.com/api/big-ears/4c2a904bafba06591225113ad17b5cec.svg?size=32');
});
