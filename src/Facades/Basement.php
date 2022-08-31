<?php

namespace Haemanthus\Basement\Facades;

use Haemanthus\Basement\Contracts\Basement as BasementContract;
use Illuminate\Support\Facades\Facade;

/**
 * @mixin \Haemanthus\Basement\Basement
 */
class Basement extends Facade
{
    /**
     * Get the registered name of the component.
     *
     * @return string
     */
    protected static function getFacadeAccessor(): string
    {
        return BasementContract::class;
    }
}
