<div
  x-ref="basementChatBox"
  x-data="basementChatBox"
  x-bind:class="isMinimized === true ? '' : '!bm-w-[22rem] bm-max-w-[90vw] !bm-h-[32rem]'"
  data-echo-options="{{ json_encode($echoOptions) }}"
  @class([
    'chat-box__container--main bm-h-14 bm-w-14 bm-fixed bm-transition-all bm-duration-500 bm-z-10',
    'bm-bottom-3 bm-left-3' => \BasementChat\Basement\Enums\ChatBoxPosition::bottomLeft()->equals($position),
    'bm-bottom-3 bm-right-3' => \BasementChat\Basement\Enums\ChatBoxPosition::bottomRight()->equals($position),
  ])>

  <button
    title="Open chat box"
    x-on:click="isMinimized = false"
    x-bind:class="isMinimized === true ? '' : 'bm-hidden'"
    class="chat-box__button--open bm-w-full bm-h-full bm-rounded-full bm-text-blue-500 bm-border bm-bg-white bm-transition bm-duration-500 hover:bm-text-white hover:bm-bg-blue-500 bm-shadow-lg">
    <x-basement::atoms.icons.far-comments class="bm-w-10 bm-h-auto bm-m-auto" />
  </button>

  <div x-bind:class="isMinimized === true ? '' : '!bm-block'" class="bm-hidden bm-h-full bm-w-full">
    <x-basement::organisms.contacts />
    <x-basement::organisms.private-messages />
  </div>
</div>
