<?php

declare(strict_types=1);

namespace BasementChat\Basement\Console;

use BasementChat\Basement\Pipes\InstallCommand\InstallBroadcastDriver;
use BasementChat\Basement\Pipes\InstallCommand\InstallNodeDependencies;
use BasementChat\Basement\Pipes\InstallCommand\PublishFiles;
use Illuminate\Console\Command;
use Illuminate\Pipeline\Pipeline;
use Spatie\LaravelPackageTools\Commands\InstallCommand as LaravelPackageToolsInstallCommand;
use Spatie\LaravelPackageTools\Package;
use Symfony\Component\Console\Input\InputOption;

class InstallCommand extends LaravelPackageToolsInstallCommand
{
    /**
     * The console command description.
     */
    protected string $consoleDescription = 'Install the Basement package';

    /**
     * The console command options.
     */
    protected array $consoleOptions = [
        [
            'name' => 'driver',
            'mode' => InputOption::VALUE_REQUIRED,
            'description' => 'The server-side broadcasting driver that should be installed ([pusher], [ably], [laravel-websockets], or [other])',
            'default' => 'pusher',
        ],
        [
            'name' => 'with-node-deps',
            'description' => "Add node module dependencies to package.json devDependencies. This will be helpful if the app doesn't use the available basement asset bundle.",
        ],
        [
            'name' => 'composer',
            'mode' => InputOption::VALUE_REQUIRED,
            'description' => 'Absolute path to the Composer binary which should be used to install packages',
            'default' => 'global',
        ],
    ];

    /**
     * Create a new console command instance.
     */
    public function __construct()
    {
        $package = (new Package())->name('basement');

        parent::__construct($package);
        $this->setSignature();
    }

    /**
     * Execute the console command.
     */
    public function handle(): int
    {
        /** @var \Illuminate\Pipeline\Pipeline $pipeline */
        $pipeline = app(Pipeline::class);

        /** @var int|self $result */
        $result = $pipeline
            ->send($this)
            ->through([
                InstallBroadcastDriver::class,
                InstallNodeDependencies::class,
                PublishFiles::class,
            ])
            ->thenReturn();

        return $result instanceof self ? Command::SUCCESS : $result;
    }

    /**
     * Run handle function on parent class to publish files.
     */
    public function publish(): void
    {
        parent::handle();
    }

    /**
     * Set console command signature.
     */
    protected function setSignature(): void
    {
        $this->setDescription($this->consoleDescription);

        collect($this->consoleOptions)->each(fn (array $option) => $this->addOption(
            name: $option['name'],
            shortcut: $option['shortcut'] ?? null,
            mode: $option['mode'] ?? null,
            description: $option['description'] ?? '',
            default: $option['default'] ?? null,
        ));
    }
}
