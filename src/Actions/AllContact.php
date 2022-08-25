<?php

namespace Haemanthus\Basement\Actions;

use Haemanthus\Basement\Contracts\AllContact as AllContactContract;
use Haemanthus\Basement\Contracts\User;
use Haemanthus\Basement\Data\ContactData;
use Haemanthus\Basement\Facades\Basement;
use Spatie\LaravelData\DataCollection;

class AllContact implements AllContactContract
{
    /**
     * Get all contact list.
     *
     * @return \Spatie\LaravelData\DataCollection
     */
    public function all(): DataCollection
    {
        $contacts = Basement::userModel()->all()->map(fn (User $user): array => [
            'id' => $user->id,
            'name' => $user->name,
            'avatar' => $user->avatar,
        ]);

        return ContactData::collection($contacts);
    }
}
