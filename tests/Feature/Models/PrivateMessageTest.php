<?php

namespace Haemanthus\Basement\Tests\Feature\Models;

use Haemanthus\Basement\Models\PrivateMessage;
use Haemanthus\Basement\Tests\Fixtures\User;
use Illuminate\Support\Carbon;

it(description: 'should be marked as read if sending a message to self', closure: function (): void {
    /** @var \Haemanthus\Basement\Tests\Fixtures\User $receiver */
    $user = User::factory()->create();

    /** @var \Haemanthus\Basement\Models\PrivateMessage $message */
    $message = PrivateMessage::factory()
        ->betweenTwoUsers(receiver: $user, sender: $user)
        ->create();

    expect($message->read_at)->toBeInstanceOf(Carbon::class);
});
