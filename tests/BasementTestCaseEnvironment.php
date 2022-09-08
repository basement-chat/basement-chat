<?php

namespace BasementChat\Basement\Tests;

use BasementChat\Basement\BasementServiceProvider;
use BeyondCode\DumpServer\DumpServerServiceProvider;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Http\Response;
use Laravel\Sanctum\SanctumServiceProvider;
use Spatie\LaravelData\LaravelDataServiceProvider;

trait BasementTestCaseEnvironment
{
    /**
     * Setup the test environment.
     */
    public function setUp(): void
    {
        parent::setUp();

        Factory::guessFactoryNamesUsing(
            static fn (string $modelName) => 'BasementChat\\Basement\\Database\\Factories\\' . class_basename($modelName) . 'Factory'
        );
    }

    /**
     * Define database migrations.
     */
    protected function defineDatabaseMigrations(): void
    {
        /** @var \Orchestra\Testbench\TestCase $this */

        $this->loadLaravelMigrations();
        $this->loadMigrationsFrom(__DIR__ . '/../database/migrations');
    }

    /**
     * Define routes setup.
     *
     * @param  \Illuminate\Routing\Router  $router
     */
    protected function defineRoutes($router): void
    {
        $router->get(
            uri: '/',
            action: static fn (): Response => response('Hello World'),
        )->name('login');

        $router->get(
            uri: '/login',
            action: static fn (): Response => response('This is a fake login page, intended for testing'),
        )->name('login');
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
            BasementServiceProvider::class,
            DumpServerServiceProvider::class,
            LaravelDataServiceProvider::class,
            SanctumServiceProvider::class,
        ];
    }
}
