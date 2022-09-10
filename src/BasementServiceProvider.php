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
use BasementChat\Basement\View\Components\ChatBox;
use Illuminate\Support\Facades\Blade;
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
            ->hasMigration('2022_09_08_020534_create_private_messages_table')
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

        $this->configurePublishableFiles();
        $this->configureModels();
        $this->configureActions();
        $this->configureRouteModelBindings();
        $this->configureBladeComponents();
    }

    /**
     * Configure the list of publishable files.
     */
    protected function configurePublishableFiles(): void
    {
        if ($this->app->runningInConsole() === false) {
            return;
        }

        $this->publishes(paths: [
            __DIR__ . '/../public' => public_path(),
        ], groups: 'basement-public-dir');

        $this->publishes(paths: [
            __DIR__ . '/../resources/css' => resource_path('vendor/basement/css'),
            __DIR__ . '/../resources/js' => resource_path('vendor/basement/js'),
            __DIR__ . '/../resources/views' => resource_path('vendor/basement/views'),
        ], groups: 'basement-assets');
    }

    /**
     * Configure models used by the package.
     */
    protected function configureModels(): void
    {
        Basement::useUserModel(config(key: 'basement.user_model', default: User::class));
        Basement::usePrivateMessageModel(PrivateMessage::class);

        PrivateMessage::observe(PrivateMessageObserver::class);
    }

    /**
     * Configure how the application actions are resolved.
     */
    protected function configureActions(): void
    {
        Basement::allContactsUsing(AllContacts::class);
        Basement::allPrivateMessagesUsing(AllPrivateMessages::class);
        Basement::markPrivateMessagesAsReadUsing(MarkPrivatesMessagesAsRead::class);
        Basement::sendPrivateMessagesUsing(SendPrivateMessage::class);
    }

    /**
     * Configure how parameters in the controller application are resolved.
     */
    protected function configureRouteModelBindings(): void
    {
        Route::bind('contact', static fn (string|int $value) => Basement::newUserModel()->findOrFail($value));
    }

    /**
     * Register the package blade view components.
     */
    protected function configureBladeComponents(): void
    {
        $this->loadViewsFrom(__DIR__ . '/../resources/views', 'basement');

        Blade::component('basement::chat-box', ChatBox::class);
    }
}
