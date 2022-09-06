<?php

declare(strict_types=1);

namespace Haemanthus\Basement\Tests;

use Haemanthus\Basement\Tests\Fixtures\User;
use Illuminate\Database\Eloquent\Collection;

trait WithUsers
{
    /**
     * @var \Illuminate\Database\Eloquent\Collection<int,\Haemanthus\Basement\Tests\Fixtures\User>
     */
    protected Collection $users;

    protected function setUpUsers(): void
    {
        $this->users = new Collection();
    }

    protected function addUsers(int $count = 1): void
    {
        $users = User::factory()->count($count)->create();

        $this->users = $this->users->mergeRecursive($users);
    }
}
