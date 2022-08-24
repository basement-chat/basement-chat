<?php

namespace Haemanthus\Basement\Facades;

use Haemanthus\Basement\Contracts\Basement as BasementContract;
use Illuminate\Support\Facades\Facade;

/**
 * @see \Haemanthus\Basement\Basement
 */
class Basement extends Facade
{
    protected static function getFacadeAccessor(): string
    {
        return BasementContract::class;
    }
}
