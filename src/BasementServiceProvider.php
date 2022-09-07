<?php

declare(strict_types=1);

namespace BasementChat\Basement;

use App\Models\User;
use BasementChat\Basement\Actions\AllContacts;
use BasementChat\Basement\Actions\AllPrivateMessages;
use BasementChat\Basement\Actions\MarkPrivatesMessagesAsRead;
use BasementChat\Basement\Actions\SendPrivateMessage;
use BasementChat\Basement\Commands\BasementCommand;
use BasementChat\Basement\Contracts\Basement as BasementContract;
use BasementChat\Basement\Models\PrivateMessage;
use BasementChat\Basement\Observers\PrivateMessageObserver;
use Illuminate\Support\Facades\Route;
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
            ->hasRoute('api')
            ->hasCommand(BasementCommand::class);
    }

    /**
     * Register any application services.
     */
    public function register(): void
    {
        parent::register();

        $this->app->singleton(abstract: BasementContract::class, concrete: static fn (): Basement => new Basement());
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        parent::boot();

        Basement::useUserModel(config(key: 'basement.user_model', default: User::class));
        Basement::usePrivateMessageModel(PrivateMessage::class);

        Basement::allContactsUsing(AllContacts::class);
        Basement::allPrivateMessagesUsing(AllPrivateMessages::class);
        Basement::markPrivateMessagesAsReadUsing(MarkPrivatesMessagesAsRead::class);
        Basement::sendPrivateMessagesUsing(SendPrivateMessage::class);

        PrivateMessage::observe(PrivateMessageObserver::class);

        $this->registerRouteModelBindings();
    }

    /**
     * Register the application's route model bindings.
     */
    protected function registerRouteModelBindings(): void
    {
        Route::bind('contact', static fn (string|int $value) => Basement::newUserModel()->findOrFail($value));
    }
}
