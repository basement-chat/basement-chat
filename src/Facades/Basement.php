<?php

declare(strict_types=1);

namespace BasementChat\Basement\Facades;

use BasementChat\Basement\Contracts\Basement as BasementContract;
use Illuminate\Support\Facades\Facade;

/**
 * @mixin \BasementChat\Basement\Basement
 */
class Basement extends Facade
{
    /**
     * Get the registered name of the component.
     */
    protected static function getFacadeAccessor(): string
    {
        return BasementContract::class;
    }
}
