<?php

declare(strict_types=1);

namespace BasementChat\Basement\Contracts;

use Illuminate\Foundation\Auth\User as Authenticatable;
use Spatie\LaravelData\DataCollection;

interface AllContacts
{
    /**
     * Get all contact list.
     *
     * @param \Illuminate\Foundation\Auth\User&\BasementChat\Basement\Contracts\User $user
     */
    public function all(Authenticatable $user): DataCollection;
}
