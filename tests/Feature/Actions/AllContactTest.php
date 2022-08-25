<?php

namespace Haemanthus\Basement\Tests\Feature\Actions;

use Haemanthus\Basement\Contracts\AllContact;
use Haemanthus\Basement\Data\ContactData;
use Haemanthus\Basement\Enums\AvatarStyle;
use Haemanthus\Basement\Facades\Basement;
use Haemanthus\Basement\Tests\Fixtures\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Spatie\LaravelData\DataCollection;

uses(RefreshDatabase::class);

it(description: 'should be able to get all contacts', closure: function (): void {
    Basement::useUserModel(User::class);

    /** @var \Illuminate\Database\Eloquent\Collection<\Haemanthus\Basement\Tests\Fixtures\User> $users */
    $users = User::factory(count: 10)->create();

    /** @var \Haemanthus\Basement\Contracts\AllContact $allContactAction */
    $allContactAction = app(AllContact::class);

    $contacts = $allContactAction->all();

    expect($contacts)->toBeInstanceOf(DataCollection::class);
    expect($contacts->count())->toBe($users->count());

    /** @var \Haemanthus\Basement\Data\ContactData $firstContact */
    $firstContact = $contacts[0];

    expect($firstContact)->toBeInstanceOf(ContactData::class);
    expect($firstContact->id)->toBe($users[0]->id);
    expect($firstContact->name)->toBe($users[0]->name);
    expect($firstContact->avatar)->toBe($users[0]->avatar);
});

it(description: 'avatar property must represent the value from the config', closure: function (): void {
    config(['basement.avatar.style' => AvatarStyle::bigEars()]);
    config(['basement.avatar.options' => ['size' => 32]]);

    Basement::useUserModel(User::class);

    $user = User::factory()->make([
        'name' => 'John Doe',
    ]);

    expect($user->avatar)
        ->toBe('https://avatars.dicebear.com/api/big-ears/4c2a904bafba06591225113ad17b5cec.svg?size=32');
});
