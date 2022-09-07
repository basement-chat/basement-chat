<?php

// @formatter:off
// phpcs:ignoreFile

namespace BasementChat\Basement\Contracts {
    /**
     * @property int $id
     * @property string|null $name
     * @property string $avatar
     *
     * @method static \Illuminate\Foundation\Auth\User&User addSelectLastPrivateMessageId(\Illuminate\Foundation\Auth\User&User $value)
     * @method static \Illuminate\Foundation\Auth\User&User addSelectUnreadMessages(\Illuminate\Foundation\Auth\User&User $value)
     */
    interface User {}
}

namespace BasementChat\Basement\Facades {
    class Basement extends \BasementChat\Basement\Basement {}
}

namespace BasementChat\Basement\Models
{
    class PrivateMessage extends \Eloquent
    {
    }
}

namespace Illuminate\Foundation\Auth {
    class User extends \Eloquent {}
}
