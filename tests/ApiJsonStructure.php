<?php

namespace Haemanthus\Basement\Tests;

trait ApiJsonStructure
{
    protected array $contactStructure = [
        'id',
        'name',
        'avatar',
        'last_private_message',
        'unread_messages',
    ];

    protected array $paginationStructure = [
        'links' => [
            'first',
            'last',
            'prev',
            'next',
        ],
        'meta' => [
            'path',
            'per_page',
            'next_cursor',
            'prev_cursor',
        ],
    ];

    protected array $privateMessageStructure = [
        'id',
        'receiver_id',
        'sender_id',
        'type',
        'value',
        'created_at',
        'read_at',
    ];
}
