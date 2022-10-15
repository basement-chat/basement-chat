<?php

declare(strict_types=1);

namespace BasementChat\Basement\Pipes\InstallCommand;

use BasementChat\Basement\Console\InstallCommand;
use Illuminate\Support\Facades\File;
use Symfony\Component\Process\Process;

class InstallNodeDependencies
{
    /**
     * The install package command.
     */
    protected InstallCommand $command;

    /**
     * List of required node module dev dependencies.
     *
     * @var array<string,string>
     */
    protected array $dependencies = [
        '@alpinejs/intersect' => '^3.10.3',
        'alpinejs' => '^3.10.3',
        'axios' => '^0.27.2',
        'laravel-echo' => '^1.14.0',
        'postcss-import' => '^15.0.0',
        'pusher-js' => '^7.4.0',
    ];

    /**
     * Handle node dev dependencies installation.
     */
    public function __invoke(InstallCommand $request, \Closure $next): mixed
    {
        $this->command = $request;

        if ($this->command->option('with-node-deps') === true) {
            $instalImmediately = $this->askToInstallDependencies();

            if ($instalImmediately === false) {
                $this->addDependencies($this->dependencies);
            }
        }

        return $next($this->command);
    }

    /**
     * Add given packages to the "package.json" file.
     *
     * @param array<string,string> $newDependencies
     */
    protected function addDependencies(array $newDependencies): void
    {
        $path = base_path('package.json');

        /** @var array<string,mixed> $file */
        $file = match (File::exists(base_path('package.json'))) {
            true => json_decode(json: File::get($path), associative: true),
            default => [],
        };
        $packages = collect($file);

        /** @var array<string,string> $devDependencies */
        $devDependencies = $packages->get('devDependencies');
        $mergedDependencies = collect($devDependencies)
            ->merge($newDependencies)
            ->sortKeys();

        $packages['devDependencies'] = $mergedDependencies;

        File::put(path: $path, contents: json_encode(
            $packages,
            JSON_UNESCAPED_SLASHES | JSON_PRETTY_PRINT,
        ) . PHP_EOL);
    }

    /**
     * Ask user if want to install dependencies.
     */
    protected function askToInstallDependencies(): bool
    {
        $confirm = $this->command->confirm('Would you like to install node module dependencies now?');

        if ($confirm === false) {
            return false;
        }

        $packageManager = $this->command->choice(question: 'Which package manager do you want to use?', choices: [
            'npm',
            'yarn',
            'pnpm',
        ]);

        $dependencies = collect($this->dependencies)
            ->map(static fn (string $version, string $dependency): string => "{$dependency}@{$version}");

        (new Process([$packageManager, 'install', '-D', ...$dependencies]))
            ->setTimeout(null)
            ->run(fn (string $type, string $data) => $this->command->getOutput()->write($data));

        return true;
    }
}
