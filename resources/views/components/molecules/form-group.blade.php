<label {{ $attributes }}>
    <span class="bm-sr-only">{{ $title }}</span>
    <span
        {{ $icon->attributes->merge(['class' => 'bm-absolute bm-inset-y-0 bm-left-0 bm-flex bm-items-center bm-pl-4']) }}
    >
        {{ $icon }}
    </span>

    {{ $slot }}
</label>
