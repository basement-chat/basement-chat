<?php

namespace Haemanthus\Basement\Commands;

use Illuminate\Console\Command;

class BasementCommand extends Command
{
    public $signature = 'basement';

    public $description = 'My command';

    public function handle(): int
    {
        $this->comment('All done');

        return self::SUCCESS;
    }
}
