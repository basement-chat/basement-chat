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
            ->startWith(static function (InstallCommand $command): void {
                $command->comment('Publishing assets...');
                $command->callSilently(command: 'vendor:publish', arguments: [
                    '--tag' => 'basement-assets',
                ]);
            })
            ->publishConfigFile()
            ->copyAndRegisterServiceProviderInApp()
            ->publishMigrations()
            ->askToRunMigrations()
            ->askToStarRepoOnGitHub(self::GITHUB_REPOSITORY_URL);

        $request->publish();

        return $next($request);
    }
}
