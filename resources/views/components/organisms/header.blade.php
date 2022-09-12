<header {{ $attributes->merge([
  'class' => 'bm-flex bm-flex-none bm-flex-row bm-justify-between bm-border-b bm-border-gray-300 bm-p-3 bm-bg-blue-500 bm-text-white bm-rounded-t-md',
]) }}>
  <h3 {{ $title->attributes->merge([
    'class' => 'bm-font-bold bm-text-base bm-leading-tight',
  ]) }}>
    {{ $title }}
  </h3>

  <div {{ $buttons->attributes->merge([
    'class' => 'bm-flex bm-flex-row bm-gap-x-3',
  ]) }}>
    {{ $buttons }}
  </div>
</header>
