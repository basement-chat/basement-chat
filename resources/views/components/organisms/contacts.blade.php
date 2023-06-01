<div
    class="basement-contacts bm-relative bm-flex bm-h-full bm-w-full bm-flex-col bm-shadow-lg"
    data-url="{{ route('api.basement.contacts.index') }}"
    x-init="mount"
    x-data="basementContact"
    x-show="isContactOpened === true"
    x-modelable="unreadMessages"
    x-model="totalUnreadMessages"
    x-transition.scale.origin.left
    x-transition:enter.duration.500ms
>
    <x-basement::organisms.header class="bm-z-30">
        <x-slot:title>
            <x-basement::atoms.icons.fas-comments class="bm-my-1 bm-inline bm-w-4" /> Messaging
        </x-slot:title>

        <x-slot:buttons>
            <x-basement::atoms.buttons.header
                data-title="Mute notifications"
                x-show="isNotificationAllowed === true && hasNotificationPermission === true"
                x-on:click="isNotificationAllowed = false"
            >
                <x-basement::atoms.icons.fas-bell class="bm-m-auto bm-h-[0.9rem]" />
            </x-basement::atoms.buttons.header>

            <x-basement::atoms.buttons.header
                data-title="Please configure your browser to allow notifications"
                x-show="hasNotificationPermission === false"
                x-on:click="requestNotificationPermission"
            >
                <x-basement::atoms.icons.fas-exclamation-triangle class="bm-m-auto bm-h-[0.9rem]" />
            </x-basement::atoms.buttons.header>

            <x-basement::atoms.buttons.header
                data-title="Unmute notifications"
                x-show="isNotificationAllowed === false && hasNotificationPermission === true"
                x-on:click="isNotificationAllowed = true"
            >
                <x-basement::atoms.icons.fas-bell-slash class="bm-m-auto bm-h-[0.9rem]" />
            </x-basement::atoms.buttons.header>

            <x-basement::atoms.buttons.header-minimize x-on:click="isMinimized = true" />
        </x-slot:buttons>
    </x-basement::organisms.header>

    <x-basement::organisms.offline-state x-show="online === false" />

    <section
        class="bm-relative bm-flex bm-flex-grow bm-flex-col bm-overflow-auto bm-bg-white bm-px-3 bm-text-gray-900"
        x-show="isContactOpened"
        x-transition=""
    >

        <x-basement::molecules.form-group class="bm-relative bm-col-span-full bm-block bm-py-4">
            <x-slot:title>Search Contacts</x-slot:title>
            <x-slot:icon>
                <x-basement::atoms.icons.fas-search class="bm-h-[0.9rem] bm-text-gray-400" />
            </x-slot:icon>

            <x-basement::atoms.input
                class="basement-contacts__filter-contacts-input bm-pl-9"
                type="text"
                x-model="search"
                autocomplete="off"
                placeholder="Search Contacts"
            />
        </x-basement::molecules.form-group>

        <template
            x-for="contact in filteredContacts"
            :key="contact.id"
        >
            <div
                class="basement-contacts__user-container bm-grid bm-cursor-pointer bm-grid-cols-12 bm-items-center bm-gap-x-2 bm-border-t bm-border-gray-300 bm-px-2 bm-py-3 bm-transition hover:bm-bg-gray-100"
                x-bind:data-id="contact.id"
                x-on:click="updateReceiver(contact); isContactOpened = false; isMessageBoxOpened = true;"
            >

                <div
                    class="bm-relative bm-col-span-2"
                    x-bind:data-title="`${contact.name} is ${contact.isOnline === true ? 'online' : 'offline'}`"
                >

                    <img
                        class="bm-rounded-full"
                        x-bind:alt="contact.name"
                        x-bind:src="contact.avatar"
                    />

                    <span
                        class="basement-contacts__user-online-indicator bm-absolute bm-right-0 bm-top-0 bm-h-3 bm-w-3 bm-rounded-full"
                        x-bind:class="contact.isOnline === true ? 'bm-bg-green-400' : 'bm-bg-red-400'"
                    ></span>
                </div>

                <div class="bm-col-span-10">
                    <div class="bm-grid bm-grid-cols-4">
                        <h4 class="bm-col-span-3 bm-truncate bm-text-sm bm-font-bold bm-text-gray-900">
                            <span
                                x-text="(contact.id === {{ \Illuminate\Support\Facades\Auth::id() }} ? '(You) ' : '') + contact.name"
                                x-bind:data-title="contact.name"
                            ></span>
                        </h4>

                        <p
                            class="bm-col-span-1 bm-text-right bm-text-xs bm-font-semibold"
                            x-text="contact.lastPrivateMessage?.createdAt?.withinDifferenceDateFormat"
                            x-bind:data-title="contact.lastPrivateMessage?.createdAt?.withinDayDateTimeFormat"
                        ></p>
                    </div>

                    <div class="bm-grid bm-grid-cols-4">
                        <p class="bm-col-span-3 bm-truncate bm-text-sm">
                            <template x-if="contact.typing === false">
                                <span>
                                    <x-basement::atoms.icons.fas-reply
                                        class="bm-inline bm-w-3"
                                        x-show="contact.lastPrivateMessage?.receiverId === contact.id"
                                    />
                                    <span
                                        x-text="contact.lastPrivateMessage?.value"
                                        x-bind:data-title="contact.lastPrivateMessage?.value"
                                    ></span>
                                </span>
                            </template>
                            <template x-if="contact.typing === true">
                                <span x-bind:data-title="`${contact.name} is typing ...`">
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
                                </span>
                            </template>
                        </p>

                        <p class="bm-col-span-1 bm-text-right">
                            <span
                                class="basement-contacts__user-unread-messages-count bm-rounded-md bm-bg-blue-400 bm-px-1 bm-text-xs bm-font-bold bm-text-white"
                                x-show="contact.unreadMessages > 0"
                                x-text="contact.unreadMessages"
                                x-bind:data-title="`There are ${contact.unreadMessages} unread messages`"
                            ></span>
                        </p>
                    </div>
                </div>
            </div>
        </template>

        <p
            class="bm-text-center bm-text-sm bm-font-semibold bm-text-gray-600"
            x-show="filteredContacts.length === 0"
        >No contacts found</p>
    </section>
</div>
