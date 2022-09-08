<?php

declare(strict_types=1);

namespace BasementChat\Basement\Tests;

use Illuminate\Support\Facades\Config;
use Orchestra\Testbench\Dusk\Options;
use Orchestra\Testbench\Dusk\TestCase as OrchestraDuskTestCase;

class DuskTestCase extends OrchestraDuskTestCase
{
    use BasementTestCaseEnvironment {
        BasementTestCaseEnvironment::setUp as setUpBasementEnvironment;
        BasementTestCaseEnvironment::getEnvironmentSetUp as getBasementEnvironmentSetUp;
    }

    /**
     * Setup the test environment.
     */
    public function setUp(): void
    {
        parent::setUp();

        $this->setUpBasementEnvironment();

        Options::withoutUI();
        Options::addArgument('--no-sandbox');
    }

    /**
     * Define environment setup.
     *
     * @param \Illuminate\Foundation\Application $app
     */
    public function getEnvironmentSetUp($app): void
    {
        $this->getBasementEnvironmentSetUp($app);

        Config::set(key: 'database.default', value: 'sqlite');

        $this->defineRoutes($app['router']);
    }
}
