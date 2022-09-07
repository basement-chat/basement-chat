<?php

declare(strict_types=1);

namespace Haemanthus\Basement\Tests;

use BeyondCode\DumpServer\DumpServerServiceProvider;
use Haemanthus\Basement\BasementServiceProvider;
use Haemanthus\Basement\Contracts\Migration;
use Haemanthus\Basement\Tests\Fixtures\User;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Http\Response;
use Laravel\Sanctum\SanctumServiceProvider;
use Orchestra\Testbench\TestCase as Orchestra;
use Spatie\LaravelData\LaravelDataServiceProvider;

class TestCase extends Orchestra
{
    /**
     * Setup the test environment.
     */
    protected function setUp(): void
    {
        parent::setUp();

        Factory::guessFactoryNamesUsing(
            static fn (string $modelName) => 'Haemanthus\\Basement\\Database\\Factories\\' . class_basename($modelName) . 'Factory'
        );
    }

    /**
     * Define routes setup.
     *
     * @param  \Illuminate\Routing\Router  $router
     */
    protected function defineRoutes($router): void
    {
        $router->get(uri: 'login', action: static fn (): Response => response())->name('login');
    }

    /**
     * Define environment setup.
     *
     * @param \Illuminate\Foundation\Application $app
     */
    public function getEnvironmentSetUp($app): void
    {
        config()->set('basement.user_model', User::class);
        config()->set('database.default', 'testing');

        collect([
            include __DIR__ . '/../database/migrations/create_users_table.php.stub',
            include __DIR__ . '/../database/migrations/create_private_messages_table.php.stub',
        ])->each(static function (Migration $migration): void {
            $migration->up();
        });
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
            LaravelDataServiceProvider::class,
            DumpServerServiceProvider::class,
            SanctumServiceProvider::class,
        ];
    }
}
