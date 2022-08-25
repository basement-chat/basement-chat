<?php

namespace Haemanthus\Basement\Tests;

use Haemanthus\Basement\BasementServiceProvider;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Database\Migrations\Migration;
use Orchestra\Testbench\TestCase as Orchestra;
use Spatie\LaravelData\LaravelDataServiceProvider;

class TestCase extends Orchestra
{
    /**
     * Setup the test environment.
     *
     * @return void
     */
    protected function setUp(): void
    {
        parent::setUp();

        Factory::guessFactoryNamesUsing(
            fn (string $modelName) => 'Haemanthus\\Basement\\Database\\Factories\\' . class_basename($modelName) . 'Factory'
        );
    }

    /**
     * Get package providers.
     *
     * @param \Illuminate\Foundation\Application $app
     * @return array
     */
    protected function getPackageProviders($app): array
    {
        return [
            BasementServiceProvider::class,
            LaravelDataServiceProvider::class,
        ];
    }

    /**
     * Define environment setup.
     *
     * @param \Illuminate\Foundation\Application $app
     * @return void
     */
    public function getEnvironmentSetUp($app): void
    {
        config()->set('database.default', 'testing');

        $migrations = collect([
            include __DIR__ . '/../database/migrations/create_users_table.php.stub',
            include __DIR__ . '/../database/migrations/create_private_messages_table.php.stub',
        ])->each(function (Migration $migration): void {
            $migration->up();
        });
    }
}
