<?php

namespace Haemanthus\Basement;

use App\Models\User;
use Haemanthus\Basement\Actions\AllContact;
use Haemanthus\Basement\Commands\BasementCommand;
use Haemanthus\Basement\Contracts\Basement as BasementContract;
use Haemanthus\Basement\Models\PrivateMessage;
use Haemanthus\Basement\Observers\PrivateMessageObserver;
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
            ->hasMigration('create_private_messages_table')
            ->hasCommand(BasementCommand::class);
    }

    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
        parent::register();

        $this->app->singleton(abstract: BasementContract::class, concrete: fn (): Basement => new Basement());
    }

    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot()
    {
        parent::boot();

        Basement::useUserModel(config(key: 'basement.user_model', default: User::class));
        Basement::usePrivateMessageModel(PrivateMessage::class);

        Basement::allContactUsing(AllContact::class);

        PrivateMessage::observe(PrivateMessageObserver::class);
    }
}
