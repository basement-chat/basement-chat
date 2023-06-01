<div
    class="basement-private-messages bm-relative bm-flex bm-h-full bm-w-full bm-flex-col bm-shadow-lg"
    data-url="{{ route('api.basement.contacts.private-messages.index', ['contact' => ':contact']) }}"
    data-batch-request-url="{{ route('api.basement.private-messages.updates') }}"
    data-currently-typing-url="{{ route('api.basement.contacts.currently-typing', ['contact' => ':contact']) }}"
    data-user-id="{{ \Illuminate\Support\Facades\Auth::id() }}"
    x-data="basementPrivateChat"
    x-show="isMessageBoxOpened"
    x-transition.scale.origin.right=""
    x-transition:enter.duration.500ms=""
>
    <x-basement::organisms.header class="bm-z-30">
        <x-slot:title class="bm-relative bm-flex bm-flex-row bm-space-x-2">
            <p
                class="bm-max-w-[90%] bm-overflow-hidden bm-text-ellipsis bm-whitespace-nowrap"
                x-text="receiver?.name"
                x-bind:data-title="`${receiver?.name} is ${receiver?.isOnline === true ? 'online' : 'offline'}`"
            ></p>
            <x-basement::atoms.icons.fas-circle
                class="bm-h-[0.75rem]"
                x-bind:class="receiver?.isOnline === true ? 'bm-text-green-400' : 'bm-text-red-400'"
            />
        </x-slot:title>

        <x-slot:buttons>
            <x-basement::atoms.buttons.header
                data-title="Search messages"
                x-show="isMessageBoxOpened"
                x-on:click="isSearchOpened = !isSearchOpened"
            >
                <x-basement::atoms.icons.fas-search class="bm-m-auto bm-h-[0.9rem]" />
            </x-basement::atoms.buttons.header>

            <x-basement::atoms.buttons.header-minimize x-on:click="isMinimized = true" />

            <x-basement::atoms.buttons.header
                data-title="Back to contact list"
                x-on:click="isContactOpened = true; isMessageBoxOpened = false"
            >
                <x-basement::atoms.icons.fas-angle-left class="bm-m-auto bm-h-[0.9rem]" />
            </x-basement::atoms.buttons.header>
        </x-slot:buttons>
    </x-basement::organisms.header>

    <x-basement::organisms.offline-state x-show="online === false" />

    <div
        class="bm-absolute bm-z-20 bm-flex bm-h-full bm-w-full bm-flex-col bm-items-center bm-justify-center bm-rounded-t-md bm-bg-white/70"
        x-show="isInfoBoxOpened === true"
        x-transition=""
    >
        <div
            class="bm-flex bm-w-11/12 bm-flex-col bm-gap-y-2 bm-rounded-md bm-border bm-bg-white bm-p-3 bm-text-gray-900 bm-shadow-md"
            x-on:click.outside="isInfoBoxOpened = false"
        >
            <div class="bm-flex bm-flex-col bm-gap-y-1 bm-px-2">
                <p class="bm-font-semibold">
                    <x-basement::atoms.icons.fas-check-double class="bm-inline bm-w-[0.9rem] bm-text-blue-500" />
                    Read
                </p>
                <p
                    class="bm-text-gray-700"
                    x-text="selectedMessage?.readAt?.date !== null ? `${selectedMessage?.readAt?.withinDayDateTimeFormat}` : '-'"
                ></p>
            </div>
            <hr>
            <div class="bm-flex bm-flex-col bm-gap-y-1 bm-px-2">
                <p class="bm-font-semibold">
                    <x-basement::atoms.icons.fas-check-double class="bm-inline bm-w-[0.9rem] bm-text-gray-500" />
                    Delivered
                </p>
                <p
                    class="bm-text-gray-700"
                    x-text="`${selectedMessage?.createdAt?.withinDayDateTimeFormat}`"
                ></p>
            </div>
        </div>
    </div>

    <div
        class="bm-absolute bm-z-20 bm-h-full bm-w-full bm-bg-white bm-text-5xl"
        x-show="isLoading === true"
    >
        <div class="bm-flex bm-h-full bm-w-full bm-items-center bm-justify-center">
            <x-basement::atoms.icons.fas-circle-notch class="bm-w-12 bm-animate-spin bm-text-blue-500" />
        </div>
    </div>

    <section
        class="bm-flex bm-flex-grow bm-flex-col bm-justify-between bm-overflow-y-auto bm-bg-white bm-text-gray-900">
        <div x-show="isMessageBoxOpened"">
            <x-basement::molecules.form-group
                class="bm-absolute bm-left-0 bm-top-12 bm-z-10 bm-w-full bm-rounded-lg bm-bg-white bm-p-2 bm-text-gray-900 bm-shadow-lg"
                x-transition=""
                x-show="isSearchOpened"
                x-on:click.outside="isSearchOpened = false"
            >

                <x-slot:title>Search Messages</x-slot:title>
                <x-slot:icon>
                    <x-basement::atoms.icons.fas-search class="bm-ml-2 bm-h-[0.9rem] bm-text-gray-400" />
                </x-slot:icon>

                <x-basement::atoms.input
                    class="bm-pl-9"
                    type="text"
                    x-model.debounce.1000ms="searchKeyword"
                    x-on:keyup.debounce.1100ms="mount"
                    autocomplete="off"
                    placeholder="Search Messages"
                />
            </x-basement::molecules.form-group>
        </div>

        <div class="bm-flex bm-min-h-min bm-grow bm-flex-col bm-overflow-y-auto bm-px-3">
            <div class="bm-my-3 bm-flex bm-flex-col bm-gap-y-3">
                <x-basement::atoms.buttons.primary
                    class="basement-private-messages__load-more-messages-button bm--mx-3 bm--mt-3 bm-border-b bm-border-gray-300 bm-bg-gray-50 bm-py-2"
                    x-show="urlShowMore !== null"
                    x-on:click="mountMore"
                >
                    <span x-show="isLoadingShowMore === false">Load more messages</span>
                    <x-basement::atoms.icons.fas-circle-notch
                        class="bm-mx-auto bm-h-6 bm-animate-spin bm-text-blue-500"
                        x-show="isLoadingShowMore === true"
                    />
                </x-basement::atoms.buttons.primary>

                <template x-for="messages in groupedMessages">
                    <div class="bm-flex bm-flex-col bm-gap-y-3">
                        <div class="bm-mt-2 bm-grid bm-grid-cols-5">
                            <p
                                class="bm-col-span-3 bm-col-start-2 bm-rounded-lg bm-bg-yellow-100 bm-px-2 bm-py-1 bm-text-center bm-text-sm bm-font-bold bm-text-yellow-900"
                                x-text="messages[0].createdAt.withinDateFormat"
                            ></p>
                        </div>
                        <template x-for="message in messages">
                            <div class="bm-flex bm-flex-col">
                                <div
                                    class="bm--mx-3 bm-mb-3 bm-mt-1 bm-rounded-b-lg bm-border-b bm-border-gray-300 bm-bg-gray-50 bm-py-1 bm-text-center bm-font-semibold bm-text-blue-500"
                                    x-show="unreadMessageCursor === message.id"
                                >
                                    Unread Messages
                                </div>
                                <div
                                    class="bm-group bm-relative bm-mb-5 bm-flex"
                                    x-bind:class="message.receiverId === receiver.id ? 'bm-flex-row-reverse' :
                                        'bm-flex-row'"
                                >
                                    <div class="bm-max-w-[90%]">
                                        <p
                                            class="basement-private-messages__message-value bm-break-words bm-rounded-t-lg bm-px-2 bm-py-1"
                                            x-intersect.once="seeMessage(message)"
                                            x-text="message.value"
                                            x-bind:class="message.receiverId === receiver.id ?
                                                'bm-bg-blue-100 bm-rounded-l-lg' :
                                                'bm-bg-gray-100 bm-rounded-r-lg'"
                                            x-bind:data-id="message.id"
                                        ></p>

                                        <template x-if="message.receiverId === receiver.id">
                                            <div
                                                class="bm-absolute bm-right-0 bm-flex bm-space-x-1 bm-rounded-b-lg bm-bg-white bm-px-2 bm-py-1 bm-text-xs bm-font-bold bm-shadow-md"
                                                data-tippy-placement="left"
                                                x-bind:data-title="`Sent at ${message.createdAt.withinDateTimeFormat}`"
                                            >
                                                <x-basement::atoms.icons.fas-check-double
                                                    class="bm-inline bm-w-3"
                                                    x-bind:class="message.readAt.date !== null ? 'bm-text-blue-500' :
                                                        'bm-text-gray-500'"
                                                />
                                                <span x-text="message.createdAt.withinTimeFormat"></span>
                                            </div>
                                        </template>
                                        <template x-if="message.receiverId !== receiver.id">
                                            <span
                                                class="bm-absolute bm-left-0 bm-rounded-b-lg bm-bg-white bm-px-2 bm-py-1 bm-text-xs bm-font-bold bm-shadow-md"
                                                data-tippy-placement="right"
                                                x-bind:data-title="`Sent at ${message.createdAt.withinDateTimeFormat}`"
                                                x-text="message.createdAt.withinTimeFormat"
                                            >
                                            </span>
                                        </template>
                                    </div>

                                    <template x-if="message.receiverId === receiver.id">
                                        <div class="bm-w-[10%]">
                                            <x-basement::atoms.buttons.secondary
                                                class="bm-hidden bm-h-full bm-w-full bm-text-gray-400 group-hover:bm-block"
                                                data-title="Manage this message"
                                                x-on:click.debounce.10ms="messageIdWithOpenDialog = message.id"
                                            >
                                                <x-basement::atoms.icons.fas-ellipsis-v class="bm-inline bm-h-3" />
                                            </x-basement::atoms.buttons.secondary>

                                            <div
                                                class="bm-absolute bm-bottom-0 bm-top-0 bm-flex bm-flex-row bm-items-center bm-justify-center">
                                                <ul
                                                    class="bm-w-16 bm-rounded-lg bm-border bm-bg-white bm-py-1 bm-shadow-lg"
                                                    x-show="messageIdWithOpenDialog === message.id"
                                                    x-transition=""
                                                    x-on:click.outside="messageIdWithOpenDialog = null"
                                                >
                                                    <li class="bm-border-gray-300">
                                                        <x-basement::atoms.buttons.secondary
                                                            class="bm-w-full bm-px-2 bm-py-1 bm-text-center"
                                                            data-title="Information about this message"
                                                            x-on:click="isInfoBoxOpened = true; selectedMessage = message"
                                                        >
                                                            Info
                                                        </x-basement::atoms.buttons.secondary>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </template>
                                </div>
                            </div>
                        </template>
                    </div>
                </template>
                <template x-if="receiver?.typing === true">
                    <div class="bm-flex bm-flex-col">
                        <div class="bm-group bm-relative bm-flex bm-flex-row">
                            <p
                                class="bm-rounded-r-lg bm-rounded-t-lg bm-bg-gray-100 bm-px-2 bm-py-1"
                                x-bind:data-title="`${receiver?.name} is typing ...`"
                            >
                                <span
                                    class="bm-inline-block bm-h-1 bm-w-1 bm-animate-bounce bm-rounded-full bm-bg-gray-900"
                                ></span>
                                <span
                                    class="bm-inline-block bm-h-1 bm-w-1 bm-animate-bounce bm-rounded-full bm-bg-gray-900"
                                    style="animation-delay: 0.2s"
                                ></span>
                                <span
                                    class="bm-inline-block bm-h-1 bm-w-1 bm-animate-bounce bm-rounded-full bm-bg-gray-900"
                                    style="animation-delay: 0.4s"
                                ></span>
                            </p>
                        </div>
                    </div>
                </template>
            </div>
        </div>

        <div
            x-show="isLastMessageShown === false && messages.length> 0"
            x-transition=""
            class="bm-absolute bm-bottom-[4.5rem] bm-right-6"
        >
            <button
                class="bm-relative bm-rounded-full bm-border bm-bg-white bm-p-2 bm-text-blue-500 bm-transition bm-duration-500 hover:bm-brightness-90"
                x-on:click="scrollToLastMessage"
            >
                <x-basement::atoms.icons.fas-angle-down
                    class="bm-h-5 bm-w-5"
                    data-title="Go to the last message"
                />

                <div class="bm-absolute bm-bottom-7 bm-left-0 bm-right-0 bm-text-center">
                    <span
                        class="bm-rounded-xl bm-border bm-bg-blue-500 bm-px-1 bm-text-sm bm-font-bold bm-text-white"
                        x-show="receiver?.unreadMessages > 0"
                        x-bind:data-title="`There are ${receiver?.unreadMessages} unread messages`"
                        x-text="receiver?.unreadMessages"
                    >
                    </span>
                </div>
            </button>
        </div>

        <form
            class="bm-relative bm-grid bm-grid-cols-8 bm-items-center bm-gap-x-2 bm-border-t bm-p-3"
            x-show="searchKeyword.trim() === ''"
            x-on:submit.prevent="sendNewMessage"
        >

            <x-basement::molecules.form-group class="bm-col-span-7">
                <x-slot:title>Message</x-slot:title>
                <x-slot:icon x-show="isLoadingSentMessage === true">
                    <x-basement::atoms.icons.fas-circle-notch
                        class="bm-ml-2 bm-h-[0.9rem] bm-animate-spin bm-text-blue-500"
                    />
                </x-slot:icon>

                <x-basement::atoms.input
                    class="basement-private-messages__new-message-input"
                    type="text"
                    aria-autocomplete="none"
                    aria-required="true"
                    x-bind:disabled="isLoadingSentMessage === true"
                    x-bind:class="isLoadingSentMessage === true ? 'bm-pl-9' : ''"
                    x-model="newMessageValue"
                    x-on:keydown.throttle.1000ms="currentlyTyping"
                    autocomplete="off"
                    required=""
                    placeholder="Message"
                    maxlength="255"
                />
            </x-basement::molecules.form-group>

            <x-basement::atoms.buttons.primary
                class="basemment-private-messages__send-new-message-button-button bm-col-span-1 bm-h-full bm-w-8"
                data-title="Send message"
                type="submit"
                x-bind:disabled="isLoadingSentMessage === true"
            >
                <x-basement::atoms.icons.fas-paper-plane class="bm-m-auto bm-h-4 bm-text-blue-500" />
            </x-basement::atoms.buttons.primary>
        </form>
    </section>
</div>
