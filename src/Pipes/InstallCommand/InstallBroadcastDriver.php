<?php

declare(strict_types=1);

namespace BasementChat\Basement\Pipes\InstallCommand;

use BasementChat\Basement\Console\InstallCommand;
use Illuminate\Console\Command;
use Symfony\Component\Process\PhpExecutableFinder;
use Symfony\Component\Process\Process;

class InstallBroadcastDriver
{
    /**
     * The install package command.
     */
    protected InstallCommand $command;

    /**
     * List of supported broadcast drivers.
     *
     * @var array<string,array>
     */
    protected array $drivers = [
        'pusher' => ['pusher/pusher-php-server'],
        'ably' => ['ably/ably-php'],
        'laravel-websockets' => [
            'beyondcode/laravel-websockets',
            /**
             * Locked to pusher/pusher-php-server:7.0.2, due to having problems with newer versions.
             *
             * @see https://github.com/beyondcode/laravel-websockets/issues/1041
             */
            'pusher/pusher-php-server:7.0.2',
        ],
        'other' => [],
    ];

    /**
     * Handle broadcast driver installation.
     */
    public function __invoke(InstallCommand $request, \Closure $next): mixed
    {
        $this->command = $request;

        /** @var string $driver */
        $driver = $this->command->option('driver');
        $availableDrivers = collect($this->drivers)->keys();

        if ($availableDrivers->contains($driver) === false) {
            $choices = $availableDrivers
                ->map(static fn (string $availableDriver): string => "[{$availableDriver}]")
                ->join(', ');

            $this->command->error("Your choice of driver must be one of the following: {$choices}");

            return Command::INVALID;
        }

        if ($driver !== 'other') {
            $this->installDependencies($this->drivers[$driver]);
        }

        return $next($this->command);
    }

    /**
     * Install composer dependencies.
     *
     * @param array<int,string> $newDependencies
     */
    protected function installDependencies(array $newDependencies): void
    {
        $composer = $this->command->option('composer');
        $packageManager = match ($composer) {
            'global' => ['composer'],
            default => [$this->phpBinary(), $composer],
        };

        (new Process([...$packageManager, 'require', ...$newDependencies]))
            ->setTimeout(null)
            ->run(fn (string $type, string $data) => $this->command->getOutput()->write($data));
    }

    /**
     * Get the path to the appropriate PHP binary.
     */
    protected function phpBinary(): string
    {
        $php = (new PhpExecutableFinder())->find(false);

        return $php === false ? 'php' : $php;
    }
}
