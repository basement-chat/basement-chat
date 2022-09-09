<?php

declare(strict_types=1);

namespace BasementChat\Basement\Tests;

use BasementChat\Basement\Tests\Fixtures\User;
use Illuminate\Cookie\Middleware\EncryptCookies;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Config;
use Orchestra\Testbench\Dusk\Options;
use Orchestra\Testbench\Dusk\TestCase as OrchestraDuskTestCase;
use Orchestra\Testbench\Http\Middleware\VerifyCsrfToken;

class BrowserTestCase extends OrchestraDuskTestCase
{
    use BasementTestCaseEnvironment {
        BasementTestCaseEnvironment::setUp as setUpBasementEnvironment;
        BasementTestCaseEnvironment::getEnvironmentSetUp as getBasementEnvironmentSetUp;
        BasementTestCaseEnvironment::defineRoutes as defineRoutesBasementEnvironment;
    }

    /**
     * Setup the test environment.
     */
    public function setUp(): void
    {
        parent::setUp();

        $this->setUpBasementEnvironment();
        $this->defineDatabaseMigrations();

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

        Config::set(key: 'auth.providers.users.model', value: User::class);
        Config::set(key: 'sanctum.middleware.encrypt_cookies', value: EncryptCookies::class);
        Config::set(key: 'sanctum.middleware.verify_csrf_token', value: VerifyCsrfToken::class);
        Config::set(key: 'view.paths', value: [
            resource_path('views'),
            __DIR__ . '/../resources/views',
            __DIR__ . '/Fixtures',
        ]);

        $this->defineRoutes($app['router']);
    }

    /**
     * Define routes setup.
     *
     * @param  \Illuminate\Routing\Router  $router
     */
    protected function defineRoutes($router): void
    {
        $this->defineRoutesBasementEnvironment($router);

        $router
            ->get(uri: '/dashboard', action: static fn () => dump(Auth::user()))
            ->middleware('web')
            ->name('dashboard');
    }
}
