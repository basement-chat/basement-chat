<div {{ $attributes->merge([
  'class' => 'bm-absolute bm-w-full bm-h-full bm-z-20 bm-text-5xl bm-bg-white bm-rounded-t-md',
]) }}>
  <div class="bm-flex bm-flex-col bm-justify-center bm-items-center bm-h-full bm-w-full bm-gap-y-1">
    <x-basement::atoms.icons.fas-times-circle class="bm-text-red-500 bm-py-2 bm-w-12" />
    <p class="bm-text-xl bm-font-semibold bm-text-gray-900">You are now offline</p>
    <p class="bm-text-base bm-text-gray-700">Please check your connection.</p>
  </div>
</div>
