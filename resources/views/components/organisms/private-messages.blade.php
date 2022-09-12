<div
  x-data="basementPrivateChat"
  x-show="isMessageBoxOpened"
  x-on:update-receiver="updateReceiver($event)"
  x-transition.scale.origin.right
  x-transition:enter.duration.500ms
  class="bm-flex bm-flex-col bm-shadow-lg bm-w-full bm-h-full bm-relative">
  <x-basement::organisms.header class="bm-z-30">
    <x-slot name="title"
      x-bind:title="`${messageReceiver.name} is ${messageReceiver.is_online ? 'online' : 'offline'}`"
      class="bm-relative">
      <span x-text="messageReceiver.name"></span>&nbsp;
      <x-basement::atoms.icons.fas-circle class="bm-h-[0.75rem] bm-inline bm--mt-2" x-bind:class="messageReceiver.is_online ? 'bm-text-green-400' : 'bm-text-red-400'" />
    </x-slot>

    <x-slot name="buttons">
      <x-basement::atoms.buttons.header
        x-show="isMessageBoxOpened"
        x-on:click="isSearchMessagesOpened = !isSearchMessagesOpened"
        title="Search messages">
        <x-basement::atoms.icons.fas-search class="bm-h-[0.9rem] bm-m-auto" />
      </x-basement::atoms.buttons.header>

      <x-basement::atoms.buttons.header-minimize x-on:click="isMinimized = true"/>

      <x-basement::atoms.buttons.header
        x-on:click="isContactOpened = true; isMessageBoxOpened = false"
        title="Back to contact list">
        <x-basement::atoms.icons.fas-angle-left class="bm-h-[0.9rem] bm-m-auto" />
      </x-basement::atoms.buttons.header>
    </x-slot>
  </x-basement::organisms.header.index>

  <x-basement::organisms.offline-state wire:offline="" />

  <div
    x-transition=""
    x-show="isMessageInfoOpened"
    class="bm-absolute bm-w-full bm-h-full bm-z-20 bm-bg-white/70 bm-rounded-t-md bm-flex bm-flex-col bm-justify-center bm-items-center">
    <div
      x-on:click.outside="isMessageInfoOpened = false"
      class="bm-flex bm-flex-col bm-p-3 bm-gap-y-2 bm-bg-white bm-shadow-md bm-rounded-md bm-w-11/12 bm-text-gray-900 bm-border">
      <div class="bm-px-2 bm-flex bm-flex-col bm-gap-y-1">
        <p class="bm-font-semibold">
          <x-basement::atoms.icons.fas-check-double class="bm-text-blue-500 bm-w-[0.9rem] bm-inline" /> Read
        </p>
        <p x-text="messageInfo.seen_at_date ? `${messageInfo.seen_at_date} ${messageInfo.seen_at_hour}` : '-'" class="bm-text-gray-700"></p>
      </div>
      <hr>
      <div class="bm-px-2 bm-flex bm-flex-col bm-gap-y-1">
        <p class="bm-font-semibold">
          <x-basement::atoms.icons.fas-check-double class="bm-text-gray-500 bm-w-[0.9rem] bm-inline" /> Delivered
        </p>
        <p x-text="`${messageInfo.created_at_date} ${messageInfo.created_at_hour}`" class="bm-text-gray-700"></p>
      </div>
    </div>
  </div>

  <div
    wire:loading=""
    wire:target="showOlderMessages, showNewerMessages, search, updateReceiver"
    class="bm-absolute bm-w-full bm-h-full bm-z-20 bm-text-5xl bm-bg-white">
    <div
      class="bm-flex bm-justify-center bm-items-center bm-w-full bm-h-full">
      <x-basement::atoms.icons.fas-circle-notch class="bm-text-blue-500 bm-animate-spin bm-w-12" />
    </div>
  </div>

  <section
    x-data="mount(@this)"
    class="bm-flex bm-flex-grow bm-flex-col bm-justify-between bm-text-gray-900 bm-bg-white bm-overflow-y-auto">
    <div x-show="isMessageBoxOpened"">
      <x-basement::molecules.form-group
        x-transition=""
        x-show="isSearchMessagesOpened"
        x-on:click.outside="isSearchMessagesOpened = false"
        class="bm-absolute bm-left-0 bm-top-12 bm-p-2 bm-w-full bm-bg-white bm-rounded-lg bm-shadow-lg bm-text-gray-900 bm-z-10">

        <x-slot name="title">Search Messages</x-slot>
        <x-slot name="icon">
          <x-basement::atoms.icons.fas-search class="bm-text-gray-400 bm-h-[0.9rem] bm-ml-2" />
        </x-slot>

        <x-basement::atoms.input wire:model.debounce.500ms="search" class="bm-pl-9" type="text" placeholder="Search Messages" />
      </x-basement::molecules.form-group>
    </div>

    <div class="bm-overflow-y-auto bm-min-h-min bm-flex bm-flex-col-reverse bm-px-3 bm-grow">
      <div class="bm-flex bm-flex-col bm-gap-y-3 bm-my-3">
        <x-basement::atoms.buttons.primary
          x-show="isOlderMessagesExist"
          x-on:click="showOlderMessages()"
          class="bm-bg-gray-50 bm-border-b bm-border-gray-300 bm-py-2 bm--mx-3 bm--mt-3">
          See older messages
        </x-basement::atoms.buttons.primary>

        <template x-for="(groupMessages, index) in messages">
          <div class="bm-flex bm-flex-col bm-gap-y-3">
            <div class="bm-grid bm-grid-cols-5 bm-mt-2">
              <p x-text="index" class="bm-col-span-3 bm-col-start-2 bm-bg-yellow-100 bm-text-yellow-900 bm-text-sm bm-text-center bm-font-bold bm-py-1 bm-px-2 bm-rounded-lg"></p>
            </div>
            <template x-for="message in groupMessages">
              <div x-bind:class="message.sent_to === messageReceiver.id ? 'bm-flex-row-reverse' : 'bm-flex-row'" class="bm-flex bm-group bm-relative bm-mb-5">
                <div class="bm-max-w-[90%]">
                  <p
                    x-intersect.once="message.sent_by === messageReceiver.id && message.seen_at === null ? seenMessages.push(message.id) : ''"
                    x-text="message.value"
                    x-bind:class="message.sent_to === messageReceiver.id ? 'bm-bg-blue-100' : 'bm-bg-gray-100'"
                    class="bm-rounded-t-lg bm-py-1 bm-px-2 bm-break-words"></p>

                  <span
                    class="bm-bg-white bm-text-xs bm-font-bold bm-py-1 bm-px-2 bm-absolute bm-rounded-b-lg bm-shadow-md"
                    x-bind:title="`Sent at ${message.created_at_hour} ${message.created_at_date}`"
                    x-bind:class="message.sent_to === messageReceiver.id ? 'bm-right-0' : 'bm-left-0'">
                    <template x-if="message.sent_to === messageReceiver.id && message.seen_at">
                      <x-basement::atoms.icons.fas-check-double class="bm-text-blue-500 bm-w-3 bm-inline" />
                    </template>
                    <template x-if="message.sent_to === messageReceiver.id && !message.seen_at">
                      <x-basement::atoms.icons.fas-check-double class="bm-text-gray-500 bm-w-3 bm-inline" />
                    </template>
                    <span x-text="message.created_at_hour"></span>
                  </span>
                </div>

                <template x-if="message.sent_to === messageReceiver.id">
                  <div class="bm-w-[10%]">
                    <x-basement::atoms.buttons.secondary
                      x-on:click="isDialogOpened[message.id] = true"
                      title="Manage this message"
                      class="bm-w-full bm-h-full bm-text-gray-400 bm-hidden group-hover:bm-block">
                      <x-basement::atoms.icons.fas-ellipsis-v class="bm-inline bm-h-3" />
                    </x-basement::atoms.buttons.secondary>

                    <div class="bm-absolute bm-top-0 bm-bottom-0 bm-flex bm-flex-row bm-justify-center bm-items-center">
                      <ul
                        x-show="isDialogOpened[message.id]"
                        x-transition
                        x-on:click.outside="isDialogOpened[message.id] = false"
                        class="bm-bg-white bm-rounded-lg bm-border bm-shadow-lg bm-py-1 bm-w-16">
                        <li class="bm-border-gray-300">
                          <x-basement::atoms.buttons.secondary
                            x-on:click="isMessageInfoOpened = true; messageInfo = message"
                            title="Information about this message"
                            class="bm-py-1 bm-px-2 bm-w-full bm-text-center">
                            Info
                          </x-basement::atoms.buttons.secondary>
                        </li>
                      </ul>
                    </div>
                  </div>
                </template>
              </div>
            </template>
          </div>
        </template>

        <x-basement::atoms.buttons.primary
          x-show="isNewerMessagesExist"
          x-on:click="showNewerMessages()"
          class="bm-bg-gray-50 bm-border-t bm-border-gray-300 bm-py-2 bm--mx-3 bm--mb-3">
          See newer messages
        </x-basement::atoms.buttons.primary>
      </div>
    </div>
    <form
      x-on:submit.prevent="sendNewMessage()"
      class="bm-grid bm-grid-cols-8 bm-items-center bm-gap-x-2 bm-p-3 bm-border-t bm-relative">

      <x-basement::molecules.form-group class="bm-col-span-7">
        <x-slot name="title">Message</x-slot>
        <x-slot name="icon" wire:target="send" wire:loading.flex="">
          <x-basement::atoms.icons.fas-circle-notch class="bm-text-blue-500 bm-animate-spin bm-h-[0.9rem] bm-ml-2" />
        </x-slot>

        <x-basement::atoms.input
          wire:target="send"
          wire:loading.attr="disabled"
          wire:loading.class="bm-pl-9"
          x-model.lazy="newMessageValue"
          autocomplete="off"
          required=""
          aria-autocomplete="none"
          aria-required="true"
          type="text"
          placeholder="Message"
          maxlength="255" />
      </x-basement::molecules.form-group>

      <x-basement::atoms.buttons.primary type="submit" title="Send message" class="bm-col-span-1 bm-w-8 bm-h-full">
        <x-basement::atoms.icons.fas-paper-plane class="bm-text-blue-500 bm-h-4 bm-m-auto" />
      </x-basement::atoms.buttons.primary>
    </form>
  </section>
</div>
