<?php

// @formatter:off
// phpcs:ignoreFile

namespace Haemanthus\Basement\Contracts {
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

namespace Haemanthus\Basement\Facades {
    class Basement extends \Haemanthus\Basement\Basement {}
}

namespace Haemanthus\Basement\Models
{
    class PrivateMessage extends \Eloquent
    {
    }
}

namespace Illuminate\Foundation\Auth {
    class User extends \Eloquent {}
}
