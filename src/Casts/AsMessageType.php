<?php

namespace Haemanthus\Basement\Casts;

use Haemanthus\Basement\Enums\MessageType;
use Illuminate\Contracts\Database\Eloquent\CastsAttributes;
use Spatie\LaravelData\Casts\Cast;
use Spatie\LaravelData\Support\DataProperty;

class AsMessageType implements Cast, CastsAttributes
{
    /**
     * Cast the given value to message type enum.
     *
     * @param \Spatie\LaravelData\Support\DataProperty $property
     * @param mixed $value
     * @return \Haemanthus\Basement\Enums\MessageType
     */
    public function cast(DataProperty $property, mixed $value): MessageType
    {
        if ($value instanceof MessageType) {
            return $value;
        }

        if (is_string($value) || is_int($value)) {
            return MessageType::from($value);
        }

        return MessageType::text();
    }

    /**
     * Transform the attribute from the underlying model values.
     *
     * @param  \Illuminate\Database\Eloquent\Model  $model
     * @param  string  $key
     * @param  string|int  $value
     * @param  array  $attributes
     * @return \Haemanthus\Basement\Enums\MessageType
     */
    public function get($model, string $key, mixed $value, array $attributes): MessageType
    {
        return MessageType::from($value);
    }

    /**
     * Transform the attribute to its underlying model values.
     *
     * @param  \Illuminate\Database\Eloquent\Model  $model
     * @param  string  $key
     * @param  \Haemanthus\Basement\Enums\MessageType  $value
     * @param  array  $attributes
     * @return string
     */
    public function set($model, string $key, mixed $value, array $attributes): string
    {
        return (string) $value->value;
    }
}
