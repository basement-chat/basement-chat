<?php

use BasementChat\Basement\Broadcasting\ContactChannel;
use Illuminate\Support\Facades\Broadcast;

Broadcast::channel(channel: 'basement.contacts', callback: ContactChannel::class);
