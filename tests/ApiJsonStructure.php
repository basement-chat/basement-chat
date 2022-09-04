<?php

declare(strict_types=1);

namespace Haemanthus\Basement\Tests;

trait ApiJsonStructure
{
    /**
     * @var array<string>
     */
    protected array $contactStructure = [
        'id',
        'name',
        'avatar',
        'last_private_message',
        'unread_messages',
    ];

    /**
     * @var array<array<string>>
     */
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

    /**
     * @var array<string>
     */
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
