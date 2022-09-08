<?php

declare(strict_types=1);

namespace BasementChat\Basement\Tests;

use BasementChat\Basement\Tests\Fixtures\User;
use Illuminate\Support\Facades\Config;
use Orchestra\Testbench\TestCase as OrchestraTestCase;

class TestCase extends OrchestraTestCase
{
    use BasementTestCaseEnvironment;

    /**
     * Define environment setup.
     *
     * @param \Illuminate\Foundation\Application $app
     */
    public function getEnvironmentSetUp($app): void
    {
        Config::set(key: 'basement.user_model', value: User::class);
        Config::set(key: 'database.default', value: 'testing');
    }
}
