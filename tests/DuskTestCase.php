<?php

declare(strict_types=1);

namespace BasementChat\Basement\Tests;

use BasementChat\Basement\Tests\Fixtures\User;
use Illuminate\Support\Facades\Config;
use Orchestra\Testbench\Dusk\Options;
use Orchestra\Testbench\Dusk\TestCase as OrchestraDuskTestCase;

class DuskTestCase extends OrchestraDuskTestCase
{
    use BasementTestCaseEnvironment {
        BasementTestCaseEnvironment::setUp as setUpBasementTestCaseEnvironment;
    }

    /**
     * Setup the test environment.
     */
    public function setUp(): void
    {
        parent::setUp();

        $this->setUpBasementTestCaseEnvironment();

        Options::withoutUI();
    }

    /**
     * Define environment setup.
     *
     * @param \Illuminate\Foundation\Application $app
     */
    public function getEnvironmentSetUp($app): void
    {
        Config::set(key: 'basement.user_model', value: User::class);
        Config::set(key: 'database.default', value: 'sqlite');

        $this->defineRoutes($app['router']);
    }
}
