<?php

namespace Haemanthus\Basement\Casts;

use Haemanthus\Basement\Enums\MessageType;
use Spatie\LaravelData\Casts\Cast;
use Spatie\LaravelData\Support\DataProperty;

class MessageTypeCast implements Cast
{
    /**
     * Cast the given value.
     *
     * @param \Spatie\LaravelData\Support\DataProperty $property
     * @param mixed $value
     * @return \Haemanthus\Basement\Enums\MessageType
     */
    public function cast(DataProperty $property, mixed $value): MessageType
    {
        return MessageType::from($value);
    }
}
