<?php

declare(strict_types=1);

namespace BasementChat\Basement\Commands;

use Illuminate\Console\Command;

class BasementCommand extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    public $signature = 'basement';

    /**
     * The console command description.
     *
     * @var string
     */
    public $description = 'My command';

    /**
     * Execute the console command.
     */
    public function handle(): int
    {
        $this->comment('All done');

        return self::SUCCESS;
    }
}
