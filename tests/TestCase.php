<?php

declare(strict_types=1);

namespace BasementChat\Basement\Tests;

use Illuminate\Support\Facades\Config;
use Orchestra\Testbench\TestCase as OrchestraTestCase;

class TestCase extends OrchestraTestCase
{
    use BasementTestCaseEnvironment {
        BasementTestCaseEnvironment::getEnvironmentSetUp as getBasementEnvironmentSetUp;
    }

    /**
     * Define environment setup.
     *
     * @param \Illuminate\Foundation\Application $app
     */
    public function getEnvironmentSetUp($app): void
    {
        $this->getBasementEnvironmentSetUp($app);

        Config::set(key: 'database.default', value: 'testing');
    }
}
