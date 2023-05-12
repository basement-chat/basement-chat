<?php

declare(strict_types=1);

namespace BasementChat\Basement\Contracts;

use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Support\Collection;

interface AllContacts
{
    /**
     * Get all contact list.
     *
     * @param \Illuminate\Foundation\Auth\User&\BasementChat\Basement\Contracts\User $user
     *
     * @return \Illuminate\Support\Collection<int,\BasementChat\Basement\Data\ContactData>
     */
    public function all(Authenticatable $user): Collection;
}
