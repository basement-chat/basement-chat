<button
    {{ $attributes->merge([
        'type' => 'button',
        'class' => 'hover:bm-bg-gray-100 bm-transition bm-duration-500 bm-text-blue-500 bm-font-bold bm-rounded-lg',
    ]) }}
>
    {{ $slot }}
</button>
