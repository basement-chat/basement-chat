<?php

use Illuminate\Support\Facades\Broadcast;

Broadcast::channel('basement.contacts', fn ($user) => $user);
