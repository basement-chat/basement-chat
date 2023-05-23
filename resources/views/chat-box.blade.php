<div class="chat-box__container--wrapper">
  <div
    x-ref="basementChatBox"
    x-data="basementChatBox"
    x-bind:class="isMinimized === true ? '' : '!bm-w-[22rem] bm-max-w-[90vw] !bm-h-[32rem] bm-max-h-full bm-pt-6'"
    data-echo-options="{{ json_encode($echoOptions) }}"
    @class([
      'chat-box__container--main bm-h-14 bm-w-14 bm-fixed bm-transition-all bm-duration-500 bm-z-10',
      'bm-bottom-3 bm-left-3' => \BasementChat\Basement\Enums\ChatBoxPosition::bottomLeft()->equals($position),
      'bm-bottom-3 bm-right-3' => \BasementChat\Basement\Enums\ChatBoxPosition::bottomRight()->equals($position),
    ])>

    <button
      x-on:click="isMinimized = false"
      x-bind:class="isMinimized === true ? '' : 'bm-hidden'"
      x-bind:data-title="totalUnreadMessages === 0 ? 'Open chat box' : `There are ${totalUnreadMessages} unread messages`"
      class="chat-box__button--open bm-w-full bm-h-full bm-rounded-full bm-text-blue-500 bm-border bm-bg-white bm-transition bm-duration-500 hover:bm-text-white hover:bm-bg-blue-500 bm-shadow-lg">
      <template x-if="totalUnreadMessages === 0">
        <x-basement::atoms.icons.far-comments class="bm-w-10 bm-h-auto bm-m-auto" />
      </template>
      <template x-if="totalUnreadMessages > 0">
        <span x-text="totalUnreadMessages > 99 ? '99+' : totalUnreadMessages" class="bm-font-extrabold bm-text-xl bm-animate-pulse"></span>
      </template>
    </button>

    <div x-bind:class="isMinimized === true ? '' : '!bm-block'" class="bm-hidden bm-h-full bm-w-full">
      <x-basement::organisms.contacts />
      <x-basement::organisms.private-messages />
    </div>
  </div>
</div>
