<?php

namespace Haemanthus\Basement\Commands;

use Illuminate\Console\Command;

class BasementCommand extends Command
{
    public string $signature = 'basement';

    public string $description = 'My command';

    public function handle(): int
    {
        $this->comment('All done');

        return self::SUCCESS;
    }
}
