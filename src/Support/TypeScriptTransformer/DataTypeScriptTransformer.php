<?php

declare(strict_types=1);

namespace Haemanthus\Basement\Support\TypeScriptTransformer;

use Spatie\LaravelData\Support\TypeScriptTransformer\DataTypeScriptTransformer as SpatieTypeScriptTransformer;
use Spatie\TypeScriptTransformer\Structures\MissingSymbolsCollection;

class DataTypeScriptTransformer extends SpatieTypeScriptTransformer
{
    /**
     * @param \ReflectionClass<\Spatie\LaravelData\Data|\Spatie\Enum\Enum> $class
     */
    protected function transformProperties(
        \ReflectionClass $class,
        MissingSymbolsCollection $missingSymbols
    ): string {
        return array_reduce($this->resolveProperties($class), function (
            string $carry,
            \ReflectionProperty $property
        ) use ($missingSymbols): string {
            $type = $this->reflectionToType($property, $missingSymbols, ...$this->typeProcessors());

            if ($type === null || $this->isPropertyLazy($property)) {
                return $carry;
            }

            $transformed = $this->typeToTypeScript(
                type: $type,
                missingSymbolsCollection: $missingSymbols,
                currentClass: $property->getDeclaringClass()->getName()
            );

            return "{$carry}{$property->getName()}: {$transformed};" . PHP_EOL;
        }, '');
    }
}
