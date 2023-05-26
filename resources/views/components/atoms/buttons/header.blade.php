<button
    {{ $attributes->merge([
        'class' => 'hover:bm-bg-gray-100 hover:bm-text-blue-500 bm-duration-500 bm-transition bm-rounded-lg bm-w-6',
    ]) }}
>
    {{ $slot }}
</button>
