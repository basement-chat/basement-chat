<?php

namespace Haemanthus\Basement\Contracts;

use Illuminate\Foundation\Auth\User as Authenticatable;
use Spatie\LaravelData\DataCollection;

interface AllContacts
{
    /**
     * Get all contact list.
     *
     * @param \Haemanthus\Basement\Contracts\User & \Illuminate\Foundation\Auth\User $user
     *
     * @return \Spatie\LaravelData\DataCollection
     */
    public function all(Authenticatable $user): DataCollection;
}
