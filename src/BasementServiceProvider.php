<?php

namespace Haemanthus\Basement;

use App\Models\User;
use Haemanthus\Basement\Actions\AllContacts;
use Haemanthus\Basement\Actions\AllPrivateMessages;
use Haemanthus\Basement\Actions\MarkPrivatesMessagesAsRead;
use Haemanthus\Basement\Actions\SendPrivateMessage;
use Haemanthus\Basement\Commands\BasementCommand;
use Haemanthus\Basement\Contracts\Basement as BasementContract;
use Haemanthus\Basement\Models\PrivateMessage;
use Haemanthus\Basement\Observers\PrivateMessageObserver;
use Haemanthus\Basement\Policies\PrivateMessagePolicy;
use Illuminate\Support\Facades\Gate;
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
     * Register the application's policies.
     *
     * @return void
     */
    protected function registerPolicies(): void
    {
        Gate::define('mark-as-read', [PrivateMessagePolicy::class, 'markAsRead']);
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

        $this->registerPolicies();

        Basement::useUserModel(config(key: 'basement.user_model', default: User::class));
        Basement::usePrivateMessageModel(PrivateMessage::class);

        Basement::allContactsUsing(AllContacts::class);
        Basement::allPrivateMessagesUsing(AllPrivateMessages::class);
        Basement::markPrivateMessagesAsReadUsing(MarkPrivatesMessagesAsRead::class);
        Basement::sendPrivateMessagesUsing(SendPrivateMessage::class);

        PrivateMessage::observe(PrivateMessageObserver::class);
    }
}
