<?php

declare(strict_types=1);

namespace Haemanthus\Basement\Casts;

use Haemanthus\Basement\Enums\MessageType;
use Illuminate\Contracts\Database\Eloquent\CastsAttributes;
use Spatie\LaravelData\Casts\Cast;
use Spatie\LaravelData\Support\DataProperty;

class AsMessageType implements Cast, CastsAttributes
{
    /**
     * Cast the given value to message type enum.
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
     * @param  string|int  $value
     * @param  array<model-property<\Haemanthus\Basement\Models\PrivateMessage>,mixed>  $attributes
     */
    public function get(mixed $model, string $key, mixed $value, array $attributes): MessageType
    {
        return MessageType::from($value);
    }

    /**
     * Transform the attribute to its underlying model values.
     *
     * @param  \Illuminate\Database\Eloquent\Model  $model
     * @param  \Haemanthus\Basement\Enums\MessageType  $value
     * @param  array<model-property<\Haemanthus\Basement\Models\PrivateMessage>,mixed>  $attributes
     */
    public function set(mixed $model, string $key, mixed $value, array $attributes): string
    {
        return (string) $value->value;
    }
}
