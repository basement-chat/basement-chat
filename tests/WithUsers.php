<?php

declare(strict_types=1);

namespace BasementChat\Basement\Tests;

use BasementChat\Basement\Tests\Fixtures\Models\User;
use Illuminate\Database\Eloquent\Collection;

trait WithUsers
{
    /**
     * @var \Illuminate\Database\Eloquent\Collection<int,\BasementChat\Basement\Tests\Fixtures\Models\User>
     */
    protected Collection $users;

    /**
     * Initialize the default value for the $users class property.
     */
    protected function setUpUsers(): void
    {
        $this->users = new Collection();
    }

    /**
     * Add new users to the database and append to the $users class property.
     */
    protected function addUsers(int $count = 1): void
    {
        $users = User::factory()->count($count)->create();

        $this->users = $this->users->mergeRecursive($users);
    }
}
