<div
  x-data="basementContact"
  x-show="isContactOpened === true"
  x-transition.scale.origin.left
  x-transition:enter.duration.500ms
  class="bm-flex bm-flex-col bm-shadow-lg bm-w-full bm-h-full bm-relative">
  <x-basement::organisms.header class="bm-z-30">
    <x-slot name="title">
      <x-basement::atoms.icons.fas-comments class="bm-w-4 bm-my-1 bm-inline" /> Messaging
    </x-slot>

    <x-slot name="buttons">
      <x-basement::atoms.buttons.header
        x-show="isNotificationAllowed === true && hasNotificationPermission === true"
        x-on:click="isNotificationAllowed = false"
        title="Mute notifications">
        <x-basement::atoms.icons.fas-bell class="bm-h-[0.9rem] bm-m-auto" />
      </x-basement::atoms.buttons.header>

      <x-basement::atoms.buttons.header
        x-show="hasNotificationPermission === false"
        x-on:click="requestNotificationPermission()"
        title="Please configure your browser to allow notifications">
        <x-basement::atoms.icons.fas-exclamation-triangle class="bm-h-[0.9rem] bm-m-auto" />
      </x-basement::atoms.buttons.header>

      <x-basement::atoms.buttons.header
        x-show="isNotificationAllowed === false && hasNotificationPermission === true"
        x-on:click="isNotificationAllowed = true"
        title="Unmute notifications">
        <x-basement::atoms.icons.fas-bell-slash class="bm-h-[0.9rem] bm-m-auto" />
      </x-basement::atoms.buttons.header>

      <x-basement::atoms.buttons.header-minimize x-on:click="isMinimized = true"/>
    </x-slot>
  </x-basement::organisms.header.index>

  <x-basement::organisms.offline-state x-show="online === false" />

  <section
    x-data="await mount('{{ route('api.contacts.index') }}')"
    x-show="isContactOpened"
    x-transition=""
    class="bm-flex bm-flex-grow bm-flex-col bm-overflow-auto bm-px-3 bm-text-gray-900 bm-bg-white bm-relative">

    <x-basement::molecules.form-group class="bm-col-span-full bm-relative bm-block bm-py-4">
      <x-slot name="title">Search Contacts</x-slot>
      <x-slot name="icon">
        <x-basement::atoms.icons.fas-search class="bm-text-gray-400 bm-h-[0.9rem]" />
      </x-slot>

      <x-basement::atoms.input x-model="search" class="bm-pl-9" type="text" placeholder="Search Contacts" />
    </x-basement::molecules.form-group>

    <template x-for="contact in filteredContacts" :key="contact.id">
      <div
        x-on:click="updateReceiver(contact); isContactOpened = false; isMessageBoxOpened = true;"
        class="bm-grid bm-grid-cols-12 bm-items-center bm-gap-x-2 bm-border-t bm-border-gray-300 bm-py-3 bm-px-2 bm-cursor-pointer hover:bm-bg-gray-100 bm-transition">

        <div
          x-bind:title="`${contact.name} is ${contact.is_online === true ? 'online' : 'offline'}`"
          class="bm-col-span-2 bm-relative">

          <img
            x-bind:alt="contact.name"
            x-bind:src="contact.avatar"
            class="bm-rounded-full"
          />

          <span
            dusk="contact__container--online-indicator"
            x-bind:class="contact.is_online === true ? 'bm-bg-green-400' : 'bm-bg-red-400'"
            class="bm-top-0 bm-right-0 bm-absolute bm-w-3 bm-h-3 bm-rounded-full"></span>

        </div>

        <div class="bm-col-span-10">
          <div class="bm-grid bm-grid-cols-4">
            <h4 x-text="contact.name" class="bm-text-sm bm-font-bold bm-text-gray-900 bm-col-span-3"></h4>

            <p
              x-text="contact.latest_message_created_at_highlight"
              x-bind:title="contact.latest_message_created_at_locale"
              class="bm-col-span-1 bm-font-semibold bm-text-xs bm-text-right"></p>
          </div>

          <div class="bm-grid bm-grid-cols-4">
            <p
              class="bm-col-span-3 bm-text-sm bm-break-words bm-flex bm-flex-row bm-space-x-1">
              <x-basement::atoms.icons.fas-reply x-show="contact.latest_message_sent_to === contact.id" class="bm-h-[0.9rem] bm-my-auto" />
              <span x-text="contact.latest_message_value_highlight" x-bind:title="contact.latest_message_value"></span>
            </p>

            <p class="bm-col-span-1 bm-text-right">
              <span
                x-show="contact.count_unread_messages > 0"
                x-text="contact.count_unread_messages"
                class="bm-bg-blue-400 bm-text-white bm-font-bold bm-text-xs bm-rounded-md bm-px-1"></span>
            </p>
          </div>
        </div>

      </div>
    </template>

    <p x-show="filteredContacts.length === 0" class="bm-text-sm bm-text-center bm-font-semibold bm-text-gray-600">No contacts found</p>
  </section>
</div>
