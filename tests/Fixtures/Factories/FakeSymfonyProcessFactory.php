<?php

declare(strict_types=1);

namespace BasementChat\Basement\Tests\Fixtures\Factories;

use BasementChat\Basement\Factories\SymfonyProcessFactory;
use BasementChat\Basement\Tests\Fixtures\Support\FakeSymfonyProcess;

class FakeSymfonyProcessFactory extends SymfonyProcessFactory
{
    /**
     * Create a new Symfony Process instance.
     *
     * @param array<int,string> $command
     */
    public function create(array $command): FakeSymfonyProcess
    {
        return new FakeSymfonyProcess($command);
    }
}
