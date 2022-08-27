<?php

// @formatter:off
// phpcs:ignoreFile

namespace Haemanthus\Basement\Facades {
    class Basement extends \Haemanthus\Basement\Basement {}
}

namespace Haemanthus\Basement\Models
{
    class PrivateMessage extends \Eloquent
    {
    }
}

namespace {
    class Basement extends Haemanthus\Basement\Facades\Basement {}
}
