<?php

namespace Haemanthus\Basement\Enums;

use Illuminate\Support\Str;
use Spatie\Enum\Enum;

/**
 * @method static self document()
 * @method static self text()
 */
class MessageType extends Enum
{
    /**
     * Change enum value when accessed.
     *
     * @return \Closure
     */
    protected static function values(): \Closure
    {
        return fn (string $type): string => Str::upper($type);
    }
}
