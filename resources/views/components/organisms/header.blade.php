<header
    {{ $attributes->merge([
        'class' =>
            'bm-grid bm-grid-cols-5 bm-border-b bm-border-gray-300 bm-p-3 bm-bg-blue-500 bm-text-white bm-rounded-t-md',
    ]) }}
>
    <h3
        {{ $title->attributes->merge([
            'class' => 'bm-font-bold bm-text-base bm-leading-tight bm-col-span-3',
        ]) }}>
        {{ $title }}
    </h3>

    <div
        {{ $buttons->attributes->merge([
            'class' => 'bm-flex bm-flex-row bm-gap-x-3 bm-justify-end bm-col-span-2',
        ]) }}>
        {{ $buttons }}
    </div>
</header>
