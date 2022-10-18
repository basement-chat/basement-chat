<?php

declare(strict_types=1);

namespace BasementChat\Basement\Support;

use BasementChat\Basement\Factories\SymfonyProcessFactory;
use Illuminate\Console\Command;

class InstallNodeDependency
{
    /**
     * Create a new pipe class instance.
     */
    public function __construct(
        protected SymfonyProcessFactory $process,
    ) {
    }

    /**
     * Install node modules dependencies.
     *
     * @param array<int,string> $dependencies
     */
    public function install(Command $command, array $dependencies, bool $dev = false): int
    {
        /** @var string $packageManager */
        $packageManager = $command->choice(question: 'Which package manager do you want to use?', choices: [
            'npm',
            'yarn',
            'pnpm',
        ]);

        return $this->process
            ->create(array_merge([
                $packageManager,
                'install',
                ...$dependencies,
            ], $dev === true ? ['--save-dev'] : []))
            ->setTimeout(null)
            ->run(static fn (string $type, string $data) => $command->getOutput()->write($data));
    }
}
