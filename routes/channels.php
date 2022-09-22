<?php

declare(strict_types=1);

use BasementChat\Basement\Broadcasting\ContactChannel;
use BasementChat\Basement\Broadcasting\ContactsChannel;
use Illuminate\Support\Facades\Broadcast;

Broadcast::channel(channel: 'basement.contacts', callback: ContactsChannel::class);
Broadcast::channel(channel: 'basement.contacts.{id}', callback: ContactChannel::class);
