<?php

declare(strict_types=1);

namespace BasementChat\Basement\Pipes\InstallCommand;

use BasementChat\Basement\Console\InstallCommand;

class PublishFiles
{
    /**
     * The GitHub repository URL of this package
     */
    protected const GITHUB_REPOSITORY_URL = 'yusuftaufiq/basement';

    /**
     * Handles the last step of package installation.
     */
    public function __invoke(InstallCommand $request, \Closure $next): mixed
    {
        $request
            ->startWith(function (InstallCommand $command): void {
                $this->publishBasement($command);
                $this->publishLaravelWebsocket($command);
            })
            ->publishConfigFile()
            ->copyAndRegisterServiceProviderInApp()
            ->publishMigrations()
            ->askToRunMigrations()
            ->askToStarRepoOnGitHub(self::GITHUB_REPOSITORY_URL);

        $request->publish();

        return $next($request);
    }

    /**
     * Publish all Basement asset files.
     */
    protected function publishBasement(InstallCommand $command): void
    {
        $command->comment('Publishing assets...');

        $command->callSilently(command: 'vendor:publish', arguments: [
            '--tag' => 'basement-assets',
        ]);
    }

    /**
     * Publish Laravel Websockets config & migrations files.
     */
    protected function publishLaravelWebsocket(InstallCommand $command): void
    {
        if ($command->option('driver') === 'laravel-websockets') {
            $command->comment('Publishing Laravel Websockets config...');
            $command->callSilently(command: 'vendor:publish', arguments: [
                '--provider' => 'BeyondCode\LaravelWebSockets\WebSocketsServiceProvider',
                '--tag' => 'config',
            ]);

            $command->comment('Publishing Laravel Websockets migrations...');
            $command->callSilently(command: 'vendor:publish', arguments: [
                '--provider' => 'BeyondCode\LaravelWebSockets\WebSocketsServiceProvider',
                '--tag' => 'migrations',
            ]);
        }
    }
}
