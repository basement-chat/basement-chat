<?php

declare(strict_types=1);

namespace BasementChat\Basement\Tests\Fixtures\Support;

use Illuminate\Console\Command;
use Symfony\Component\Process\Process;

class FakeSymfonyProcess extends Process
{
    public function run(callable $callback = null, array $env = []): int
    {
        $callback(self::OUT, str_replace(search: '\'', replace: '', subject: $this->getCommandLine()));

        return Command::SUCCESS;
    }
}
