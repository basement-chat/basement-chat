<?php

namespace Haemanthus\Basement;

use Haemanthus\Basement\Commands\BasementCommand;
use Spatie\LaravelPackageTools\Package;
use Spatie\LaravelPackageTools\PackageServiceProvider;

class BasementServiceProvider extends PackageServiceProvider
{
    public function configurePackage(Package $package): void
    {
        /*
         * This class is a Package Service Provider
         *
         * More info: https://github.com/spatie/laravel-package-tools
         */
        $package
            ->name('basement')
            ->hasConfigFile()
            ->hasViews()
            ->hasMigration('create_basement_table')
            ->hasCommand(BasementCommand::class);
    }
}
