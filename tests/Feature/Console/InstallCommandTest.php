<?php

namespace BasementChat\Basement\Tests\Feature\Console;

use BasementChat\Basement\Factories\SymfonyProcessFactory;
use BasementChat\Basement\Tests\Fixtures\Factories\FakeSymfonyProcessFactory;
use BasementChat\Basement\Tests\TestCase;
use Illuminate\Support\Facades\File;

class InstallCommandTest extends TestCase
{
    /**
     * Setup the test environment.
     */
    public function setUp(): void
    {
        parent::setUp();

        $this->app->bind(SymfonyProcessFactory::class, FakeSymfonyProcessFactory::class);
    }

    /**
     * @test
     */
    public function itShouldBeAbleToPublishFilesWhenInstallingApp(): void
    {
        $this
            ->artisan('basement:install app')
            ->assertSuccessful()
            ->expectsOutputToContain('Publishing [basement-config] assets.')
            ->expectsOutputToContain('Publishing [basement-migrations] assets.')
            ->expectsOutputToContain('Publishing [basement-assets] assets.')
            ->expectsConfirmation('Would you like to run the migrations now?')
            ->expectsConfirmation(
                'Do you want to install the broadcast driver? You can also do this later by calling <options=bold>basement:install --tag=driver</>.'
            );

        $this->assertFileExists(config_path('basement.php'));
        $this->assertCount(expectedCount: 1, haystack: File::files(database_path('migrations')));
        $this->assertFileExists(public_path('vendor/basement/basement.bundle.min.css'));
        $this->assertFileExists(public_path('vendor/basement/basement.bundle.min.js'));
        $this->assertFileExists(public_path('vendor/basement/basement.bundle.min.js.map'));

        File::deleteDirectory(public_path('vendor/basement'));
        File::cleanDirectory(database_path('migrations'));
        File::delete(config_path('basement.php'));
    }

    /**
     * @test
     */
    public function itShouldFailIfTheGivenCommandIsNotAvailable(): void
    {
        $this
            ->artisan('basement:install fooBar')
            ->expectsOutput('The installation type should be one of following options (app, driver, frontend_deps)')
            ->assertFailed();
    }

    /**
     * @test
     */
    public function itShouldCallComposerInstallCommandWhenInstallingDriver(): void
    {
        $this
            ->artisan('basement:install driver')
            ->assertSuccessful()
            ->expectsChoice(question: 'Please choose the broadcast driver you want to use', answer: 'pusher', answers: [
                'pusher',
                'ably',
                'laravel-websockets',
                'soketi',
            ])
            ->expectsOutputToContain('composer require pusher/pusher-php-server')
            ->expectsOutputToContain('Broadcast driver pusher has been installed!');
    }

    /**
     * @test
     */
    public function itShouldCallNpmInstallCommandWhenInstallingFrontendDeps(): void
    {
        $this
            ->artisan('basement:install frontend_deps')
            ->assertSuccessful()
            ->expectsChoice(question: 'Which package manager do you want to use?', answer: 'npm', answers: [
                'npm',
                'yarn',
                'pnpm',
            ])
            ->expectsOutputToContain('npm install')
            ->expectsOutputToContain('Frontend dependencies has been installed!');
    }
}
