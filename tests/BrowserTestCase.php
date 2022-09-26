<?php

declare(strict_types=1);

namespace BasementChat\Basement\Tests;

use BasementChat\Basement\Tests\Fixtures\User;
use Illuminate\Broadcasting\BroadcastServiceProvider;
use Illuminate\Contracts\View\View;
use Illuminate\Cookie\Middleware\EncryptCookies;
use Illuminate\Support\Facades\Broadcast;
use Illuminate\Support\Facades\Config;
use Illuminate\Support\Facades\File;
use Orchestra\Testbench\Dusk\Options;
use Orchestra\Testbench\Dusk\TestCase as OrchestraDuskTestCase;
use Orchestra\Testbench\Http\Middleware\VerifyCsrfToken;
use Symfony\Component\Process\Process;

class BrowserTestCase extends OrchestraDuskTestCase
{
    use BasementTestCaseEnvironment {
        BasementTestCaseEnvironment::setUp as setUpBasementEnvironment;
        BasementTestCaseEnvironment::getEnvironmentSetUp as getBasementEnvironmentSetUp;
        BasementTestCaseEnvironment::getPackageProviders as getBasementEnvironmentPackageProviders;
        BasementTestCaseEnvironment::defineRoutes as defineBasementEnvironmentRoutes;
    }

    /**
     * Setup the test environment.
     */
    public function setUp(): void
    {
        parent::setUp();

        $this->setUpBasementEnvironment();
        $this->defineDatabaseMigrations();
        $this->publishAssets();

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
        $this->defineRoutes($app['router']);
        $this->getBasementEnvironmentSetUp($app);

        Config::set(key: 'auth.providers.users.model', value: User::class);
        Config::set(key: 'sanctum.middleware.encrypt_cookies', value: EncryptCookies::class);
        Config::set(key: 'sanctum.middleware.verify_csrf_token', value: VerifyCsrfToken::class);
        Config::set(key: 'view.cache', value: false);
        Config::set(key: 'view.paths', value: [
            resource_path('views'),
            __DIR__ . '/../resources/views',
            __DIR__ . '/Fixtures',
        ]);
    }

    /**
     * Define routes setup.
     *
     * @param  \Illuminate\Routing\Router  $router
     */
    protected function defineRoutes($router): void
    {
        Broadcast::routes();

        $this->defineBasementEnvironmentRoutes($router);

        $router
            ->get(uri: '/dashboard', action: static fn (): View => view('dashboard'))
            ->middleware('web')
            ->name('dashboard');
    }

    /**
     * Get package providers.
     *
     * @param \Illuminate\Foundation\Application $app
     * @return array<class-string>
     */
    protected function getPackageProviders($app): array
    {
        return [
            ...$this->getBasementEnvironmentPackageProviders($app),
            BroadcastServiceProvider::class,
        ];
    }

    /**
     * Run command to bundled and publish public asset files.
     */
    protected function publishAssets(): void
    {
        $process = new Process(['npm', 'run', 'build']);
        $process->run();

        File::deleteDirectory(public_path('build'));
        File::delete(public_path('hot'));
        File::copyDirectory(directory: __DIR__ . '/../public', destination: public_path());
    }
}
