<div class="basement">
    <div
        data-echo-options="{{ json_encode($echoOptions) }}"
        x-ref="basementChatBox"
        x-data="basementChatBox"
        x-bind:class="isMinimized === true ? '' : '!bm-w-[22rem] bm-max-w-[90vw] !bm-h-[32rem] bm-max-h-full bm-pt-6'"
        @class([
            'basement-chat-box bm-h-14 bm-w-14 bm-fixed bm-transition-all bm-duration-500 bm-z-10',
            'bm-bottom-3 bm-left-3' => \BasementChat\Basement\Enums\ChatBoxPosition::bottomLeft()->equals(
                $position),
            'bm-bottom-3 bm-right-3' => \BasementChat\Basement\Enums\ChatBoxPosition::bottomRight()->equals(
                $position),
        ])
    >

        <button
            class="basement-chat-box__open-button bm-h-full bm-w-full bm-rounded-full bm-border bm-bg-white bm-text-blue-500 bm-shadow-lg bm-transition bm-duration-500 hover:bm-bg-blue-500 hover:bm-text-white"
            x-on:click="isMinimized = false"
            x-bind:class="isMinimized === true ? '' : 'bm-hidden'"
            x-bind:data-title="totalUnreadMessages === 0 ? 'Open chat box' : `There are ${totalUnreadMessages} unread messages`"
        >
            <template x-if="totalUnreadMessages === 0">
                <x-basement::atoms.icons.far-comments class="bm-m-auto bm-h-auto bm-w-10" />
            </template>
            <template x-if="totalUnreadMessages > 0">
                <span
                    class="bm-animate-pulse bm-text-xl bm-font-extrabold"
                    x-text="totalUnreadMessages > 99 ? '99+' : totalUnreadMessages"
                ></span>
            </template>
        </button>

        <div
            class="bm-hidden bm-h-full bm-w-full"
            x-bind:class="isMinimized === true ? '' : '!bm-block'"
        >
            <x-basement::organisms.contacts />
            <x-basement::organisms.private-messages />
        </div>
    </div>
</div>
