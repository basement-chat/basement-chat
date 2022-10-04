<?php

declare(strict_types=1);

namespace BasementChat\Basement\Tests;

use BasementChat\Basement\BasementServiceProvider;
use BasementChat\Basement\Tests\Fixtures\User;
use BeyondCode\DumpServer\DumpServerServiceProvider;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Http\Response;
use Illuminate\Routing\Router;
use Illuminate\Support\Facades\Config;
use Laravel\Sanctum\SanctumServiceProvider;
use Spatie\LaravelData\LaravelDataServiceProvider;

class BasementTestCaseEnvironment
{
    /**
     * @return array<class-string>
     */
    public static function getPackageProviders(): array
    {
        return [
            BasementServiceProvider::class,
            DumpServerServiceProvider::class,
            LaravelDataServiceProvider::class,
            SanctumServiceProvider::class,
        ];
    }

    public static function setConfigurations(): void
    {
        Config::set(key: 'basement.user_model', value: User::class);
    }

    public static function setFactories(): void
    {
        Factory::guessFactoryNamesUsing(
            static fn (string $modelName) => 'BasementChat\\Basement\\Database\\Factories\\' . class_basename($modelName) . 'Factory'
        );
    }

    public static function setRoutes(Router $router): void
    {
        $router
            ->get(uri: '/login', action: static fn (): Response => response(
                'This is a fake login page, intended for testing'
            ))
            ->name('login');
    }
}
