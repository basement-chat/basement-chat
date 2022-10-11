<div
  x-data="basementPrivateChat"
  x-show="isMessageBoxOpened"
  x-transition.scale.origin.right=""
  x-transition:enter.duration.500ms=""
  data-url="{{ route('api.contacts.private-messages.index', ['contact' => ':contact']) }}"
  data-batch-request-url="{{ route('api.private-messages.updates') }}"
  data-user-id="{{ \Illuminate\Support\Facades\Auth::id() }}"
  class="private-message__container--main bm-flex bm-flex-col bm-shadow-lg bm-w-full bm-h-full bm-relative">
  <x-basement::organisms.header class="bm-z-30">
    <x-slot:title class="bm-relative bm-flex bm-flex-row bm-space-x-2">
      <p
        x-text="receiver?.name"
        x-bind:data-title="`${receiver?.name} is ${receiver?.isOnline === true ? 'online' : 'offline'}`"
        class="bm-overflow-hidden bm-text-ellipsis bm-whitespace-nowrap bm-max-w-[90%]"></p>
      <x-basement::atoms.icons.fas-circle
        x-bind:class="receiver?.isOnline === true ? 'bm-text-green-400' : 'bm-text-red-400'"
        class="bm-h-[0.75rem]" />
    </x-slot>

    <x-slot:buttons>
      <x-basement::atoms.buttons.header
        x-show="isMessageBoxOpened"
        x-on:click="isSearchOpened = !isSearchOpened"
        data-title="Search messages">
        <x-basement::atoms.icons.fas-search class="bm-h-[0.9rem] bm-m-auto" />
      </x-basement::atoms.buttons.header>

      <x-basement::atoms.buttons.header-minimize x-on:click="isMinimized = true"/>

      <x-basement::atoms.buttons.header
        x-on:click="isContactOpened = true; isMessageBoxOpened = false"
        data-title="Back to contact list">
        <x-basement::atoms.icons.fas-angle-left class="bm-h-[0.9rem] bm-m-auto" />
      </x-basement::atoms.buttons.header>
    </x-slot>
  </x-basement::organisms.header.index>

  <x-basement::organisms.offline-state x-show="online === false" />

  <div
    x-show="isInfoBoxOpened === true"
    x-transition=""
    class="bm-absolute bm-w-full bm-h-full bm-z-20 bm-bg-white/70 bm-rounded-t-md bm-flex bm-flex-col bm-justify-center bm-items-center">
    <div
      x-on:click.outside="isInfoBoxOpened = false"
      class="bm-flex bm-flex-col bm-p-3 bm-gap-y-2 bm-bg-white bm-shadow-md bm-rounded-md bm-w-11/12 bm-text-gray-900 bm-border">
      <div class="bm-px-2 bm-flex bm-flex-col bm-gap-y-1">
        <p class="bm-font-semibold">
          <x-basement::atoms.icons.fas-check-double class="bm-text-blue-500 bm-w-[0.9rem] bm-inline" /> Read
        </p>
        <p x-text="selectedMessage?.readAt?.date !== null ? `${selectedMessage?.readAt?.withinDayDateTimeFormat}` : '-'" class="bm-text-gray-700"></p>
      </div>
      <hr>
      <div class="bm-px-2 bm-flex bm-flex-col bm-gap-y-1">
        <p class="bm-font-semibold">
          <x-basement::atoms.icons.fas-check-double class="bm-text-gray-500 bm-w-[0.9rem] bm-inline" /> Delivered
        </p>
        <p x-text="`${selectedMessage?.createdAt?.withinDayDateTimeFormat}`" class="bm-text-gray-700"></p>
      </div>
    </div>
  </div>

  <div
    x-show="isLoading === true"
    class="bm-absolute bm-w-full bm-h-full bm-z-20 bm-text-5xl bm-bg-white">
    <div
      class="bm-flex bm-justify-center bm-items-center bm-w-full bm-h-full">
      <x-basement::atoms.icons.fas-circle-notch class="bm-text-blue-500 bm-animate-spin bm-w-12" />
    </div>
  </div>

  <section
    class="bm-flex bm-flex-grow bm-flex-col bm-justify-between bm-text-gray-900 bm-bg-white bm-overflow-y-auto">
    <div x-show="isMessageBoxOpened"">
      <x-basement::molecules.form-group
        x-transition=""
        x-show="isSearchOpened"
        x-on:click.outside="isSearchOpened = false"
        class="bm-absolute bm-left-0 bm-top-12 bm-p-2 bm-w-full bm-bg-white bm-rounded-lg bm-shadow-lg bm-text-gray-900 bm-z-10">

        <x-slot:title>Search Messages</x-slot>
        <x-slot:icon>
          <x-basement::atoms.icons.fas-search class="bm-text-gray-400 bm-h-[0.9rem] bm-ml-2" />
        </x-slot>

        <x-basement::atoms.input
          x-model.debounce.1000ms="searchKeyword"
          x-on:keyup.debounce.1100ms="mount"
          autocomplete="off"
          class="bm-pl-9"
          type="text"
          placeholder="Search Messages" />
      </x-basement::molecules.form-group>
    </div>

    <div class="bm-overflow-y-auto bm-min-h-min bm-flex bm-flex-col bm-px-3 bm-grow">
      <div class="bm-flex bm-flex-col bm-gap-y-3 bm-my-3">
        <x-basement::atoms.buttons.primary
          x-show="urlShowMore !== null"
          x-on:click="mountMore"
          class="private-message__button--load-more bm-bg-gray-50 bm-border-b bm-border-gray-300 bm-py-2 bm--mx-3 bm--mt-3">
          <span x-show="isLoadingShowMore === false">Load more messages</span>
          <x-basement::atoms.icons.fas-circle-notch
            x-show="isLoadingShowMore === true"
            class="bm-text-blue-500 bm-animate-spin bm-h-6 bm-mx-auto" />
        </x-basement::atoms.buttons.primary>

        <template x-for="messages in groupedMessages">
          <div class="bm-flex bm-flex-col bm-gap-y-3">
            <div class="bm-grid bm-grid-cols-5 bm-mt-2">
              <p x-text="messages[0].createdAt.withinDateFormat" class="bm-col-span-3 bm-col-start-2 bm-bg-yellow-100 bm-text-yellow-900 bm-text-sm bm-text-center bm-font-bold bm-py-1 bm-px-2 bm-rounded-lg"></p>
            </div>
            <template x-for="message in messages">
              <div class="bm-flex bm-flex-col">
                <div
                  x-show="unreadMessageCursor === message.id"
                  class="bm-bg-gray-50 bm-text-center bm-font-semibold bm-text-blue-500 bm-border-b bm-rounded-b-lg bm-border-gray-300 bm--mx-3 bm-py-1 bm-mb-3 bm-mt-1">
                  Unread Messages
                </div>
                <div x-bind:class="message.receiverId === receiver.id ? 'bm-flex-row-reverse bm-mb-5' : 'bm-flex-row'" class="bm-flex bm-group bm-relative">
                  <div class="bm-max-w-[90%]">
                    <p
                      x-intersect.once="seeMessage(message)"
                      x-text="message.value"
                      x-bind:class="message.receiverId === receiver.id ? 'bm-bg-blue-100 bm-rounded-l-lg' : 'bm-bg-gray-100 bm-rounded-r-lg'"
                      x-bind:data-id="message.id"
                      class="private-message__text--value bm-rounded-t-lg bm-py-1 bm-px-2 bm-break-words"></p>

                    <template x-if="message.receiverId === receiver.id">
                      <span
                        x-bind:data-title="`Sent at ${message.createdAt.withinDateTimeFormat}`"
                        data-tippy-placement="left"
                        class="bm-bg-white bm-text-xs bm-font-bold bm-py-1 bm-px-2 bm-absolute bm-rounded-b-lg bm-shadow-md bm-right-0">
                        <x-basement::atoms.icons.fas-check-double
                          x-bind:class="message.readAt.date !== null ? 'bm-text-blue-500' : 'bm-text-gray-500'"
                          class="bm-w-3 bm-inline" />
                      </span>
                    </template>
                  </div>

                  <template x-if="message.receiverId === receiver.id">
                    <div class="bm-w-[10%]">
                      <x-basement::atoms.buttons.secondary
                        x-on:click.debounce.10ms="messageIdWithOpenDialog = message.id"
                        data-title="Manage this message"
                        class="bm-w-full bm-h-full bm-text-gray-400 bm-hidden group-hover:bm-block">
                        <x-basement::atoms.icons.fas-ellipsis-v class="bm-inline bm-h-3" />
                      </x-basement::atoms.buttons.secondary>

                      <div class="bm-absolute bm-top-0 bm-bottom-0 bm-flex bm-flex-row bm-justify-center bm-items-center">
                        <ul
                          x-show="messageIdWithOpenDialog === message.id"
                          x-transition=""
                          x-on:click.outside="messageIdWithOpenDialog = null"
                          class="bm-bg-white bm-rounded-lg bm-border bm-shadow-lg bm-py-1 bm-w-16">
                          <li class="bm-border-gray-300">
                            <x-basement::atoms.buttons.secondary
                              x-on:click="isInfoBoxOpened = true; selectedMessage = message"
                              data-title="Information about this message"
                              class="bm-py-1 bm-px-2 bm-w-full bm-text-center">
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
      </div>
    </div>

    <div
      x-show="isLastMessageShown === true"
      x-transition=""
      class="bm-absolute bm-bottom-[4.5rem] bm-right-6">
      <button
        x-on:click="scrollToLastMessage"
        class="bm-rounded-full bm-text-blue-500 bm-border bm-bg-white bm-p-2 bm-relative hover:bm-brightness-90 bm-transition bm-duration-500">
        <x-basement::atoms.icons.fas-angle-down
          data-title="Go to the last message"
          class="bm-h-5 bm-w-5" />

        <div class="bm-absolute bm-bottom-7 bm-left-0 bm-right-0 bm-text-center">
          <span
            x-show="receiver?.unreadMessages > 0"
            x-bind:data-title="`There are ${receiver?.unreadMessages} unread messages`"
            x-text="receiver?.unreadMessages"
            class="bm-rounded-xl bm-text-white bm-border bm-bg-blue-500 bm-font-bold bm-text-sm bm-px-1">
          </span>
        </div>
      </button>
    </div>

    <form
      x-show="searchKeyword.trim() === ''"
      x-on:submit.prevent="sendNewMessage"
      class="bm-grid bm-grid-cols-8 bm-items-center bm-gap-x-2 bm-p-3 bm-border-t bm-relative">

      <x-basement::molecules.form-group class="bm-col-span-7">
        <x-slot:title>Message</x-slot>
        <x-slot:icon x-show="isLoadingSentMessage === true">
          <x-basement::atoms.icons.fas-circle-notch class="bm-text-blue-500 bm-animate-spin bm-h-[0.9rem] bm-ml-2" />
        </x-slot>

        <x-basement::atoms.input
          x-bind:disabled="isLoadingSentMessage === true"
          x-bind:class="isLoadingSentMessage === true ? 'bm-pl-9' : ''"
          x-model.lazy="newMessageValue"
          class="private-message__input--message-value"
          autocomplete="off"
          required=""
          aria-autocomplete="none"
          aria-required="true"
          type="text"
          placeholder="Message"
          maxlength="255" />
      </x-basement::molecules.form-group>

      <x-basement::atoms.buttons.primary
        x-bind:disabled="isLoadingSentMessage === true"
        type="submit"
        data-title="Send message"
        class="private-message__button--send bm-col-span-1 bm-w-8 bm-h-full">
        <x-basement::atoms.icons.fas-paper-plane class="bm-text-blue-500 bm-h-4 bm-m-auto" />
      </x-basement::atoms.buttons.primary>
    </form>
  </section>
</div>
