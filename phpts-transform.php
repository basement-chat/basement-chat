<?php

use BasementChat\Basement\Support\TypeScriptTransformer\DataTypeScriptTransformer;
use Spatie\TypeScriptTransformer\Collectors\DefaultCollector;
use Spatie\TypeScriptTransformer\Formatters\PrettierFormatter;
use Spatie\TypeScriptTransformer\Transformers\SpatieEnumTransformer;
use Spatie\TypeScriptTransformer\TypeScriptTransformer;
use Spatie\TypeScriptTransformer\TypeScriptTransformerConfig;
use Spatie\TypeScriptTransformer\Writers\TypeDefinitionWriter;

require_once __DIR__ . '/vendor/autoload.php';

$config = TypeScriptTransformerConfig::create()
    ->autoDiscoverTypes(__DIR__ . '/src')
    ->outputFile(__DIR__ . '/resources/js/basement.d.ts')
    ->collectors([DefaultCollector::class])
    ->transformers([DataTypeScriptTransformer::class, SpatieEnumTransformer::class])
    ->writer(TypeDefinitionWriter::class)
    ->formatter(PrettierFormatter::class)
    ->transformToNativeEnums()
    ->defaultTypeReplacements([
        \Illuminate\Support\Carbon::class => 'string',
    ]);

TypeScriptTransformer::create($config)->transform();
