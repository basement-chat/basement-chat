<?php

declare(strict_types=1);

namespace Haemanthus\Basement\Enums;

use Illuminate\Support\Str;
use Spatie\Enum\Enum;

/**
 * @method static self adventurer()
 * @method static self adventurerNeutral()
 * @method static self avataaars()
 * @method static self bigEars()
 * @method static self bigEarsNeutral()
 * @method static self bigSmile()
 * @method static self bottts()
 * @method static self croodles()
 * @method static self croodlesNeutral()
 * @method static self identicon()
 * @method static self initials()
 * @method static self micah()
 * @method static self miniavs()
 * @method static self openPeeps()
 * @method static self personas()
 * @method static self pixelArt()
 * @method static self pixelArtNeutral()
 */
class AvatarStyle extends Enum
{
    /**
     * Change enum value when accessed.
     */
    protected static function values(): \Closure
    {
        return static fn (string $avatar): string => Str::kebab($avatar);
    }
}
