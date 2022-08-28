<?php

namespace Haemanthus\Basement\Contracts;

use Illuminate\Foundation\Auth\User as Authenticatable;
use Spatie\LaravelData\DataCollection;

interface AllContacts
{
    /**
     * Get all contact list.
     *
     * @param \Illuminate\Foundation\Auth\User&\Haemanthus\Basement\Contracts\User $user
     *
     * @return \Spatie\LaravelData\DataCollection
     */
    public function all(Authenticatable $user): DataCollection;
}
