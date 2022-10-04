<div
  x-init="mount"
  x-data="basementContact"
  x-show="isContactOpened === true"
  x-transition.scale.origin.left
  x-transition:enter.duration.500ms
  data-url="{{ route('api.contacts.index') }}"
  class="contact__container--main bm-flex bm-flex-col bm-shadow-lg bm-w-full bm-h-full bm-relative">
  <x-basement::organisms.header class="bm-z-30">
    <x-slot:title>
      <x-basement::atoms.icons.fas-comments class="bm-w-4 bm-my-1 bm-inline" /> Messaging
    </x-slot>

    <x-slot:buttons>
      <x-basement::atoms.buttons.header
        x-show="isNotificationAllowed === true && hasNotificationPermission === true"
        x-on:click="isNotificationAllowed = false"
        title="Mute notifications">
        <x-basement::atoms.icons.fas-bell class="bm-h-[0.9rem] bm-m-auto" />
      </x-basement::atoms.buttons.header>

      <x-basement::atoms.buttons.header
        x-show="hasNotificationPermission === false"
        x-on:click="requestNotificationPermission"
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
    x-show="isContactOpened"
    x-transition=""
    class="bm-flex bm-flex-grow bm-flex-col bm-overflow-auto bm-px-3 bm-text-gray-900 bm-bg-white bm-relative">

    <x-basement::molecules.form-group class="bm-col-span-full bm-relative bm-block bm-py-4">
      <x-slot:title>Search Contacts</x-slot>
      <x-slot:icon>
        <x-basement::atoms.icons.fas-search class="bm-text-gray-400 bm-h-[0.9rem]" />
      </x-slot>

      <x-basement::atoms.input
        x-model="search"
        autocomplete="off"
        class="contact__input--filter bm-pl-9"
        type="text"
        placeholder="Search Contacts" />
    </x-basement::molecules.form-group>

    <template x-for="contact in filteredContacts" :key="contact.id">
      <div
        x-bind:data-id="contact.id"
        x-on:click="updateReceiver(contact); isContactOpened = false; isMessageBoxOpened = true;"
        class="contact__container--user-box bm-grid bm-grid-cols-12 bm-items-center bm-gap-x-2 bm-border-t bm-border-gray-300 bm-py-3 bm-px-2 bm-cursor-pointer hover:bm-bg-gray-100 bm-transition">

        <div
          x-bind:title="`${contact.name} is ${contact.isOnline === true ? 'online' : 'offline'}`"
          class="bm-col-span-2 bm-relative">

          <img
            x-bind:alt="contact.name"
            x-bind:src="contact.avatar"
            class="bm-rounded-full"
          />

          <span
            x-bind:class="contact.isOnline === true ? 'bm-bg-green-400' : 'bm-bg-red-400'"
            class="contact__container--online-indicator bm-top-0 bm-right-0 bm-absolute bm-w-3 bm-h-3 bm-rounded-full"></span>

        </div>

        <div class="bm-col-span-10">
          <div class="bm-grid bm-grid-cols-4">
            <h4 x-text="contact.name" x-bind:title="contact.name" class="bm-text-sm bm-font-bold bm-text-gray-900 bm-col-span-3 bm-truncate"></h4>

            <p
              x-text="contact.lastPrivateMessage?.createdAtHighlight"
              x-bind:title="contact.lastPrivateMessage?.createdAtFullDate"
              class="bm-col-span-1 bm-font-semibold bm-text-xs bm-text-right"></p>
          </div>

          <div class="bm-grid bm-grid-cols-4">
            <p
              class="bm-col-span-3 bm-text-sm bm-truncate">
              <x-basement::atoms.icons.fas-reply x-show="contact.lastPrivateMessage?.receiverId === contact.id" class="bm-inline bm-w-3" />
              <span x-text="contact.lastPrivateMessage?.value" x-bind:title="contact.lastPrivateMessage?.value"></span>
            </p>

            <p class="bm-col-span-1 bm-text-right">
              <span
                x-show="contact.unreadMessages > 0"
                x-text="contact.unreadMessages"
                x-bind:title="`There are ${contact.unreadMessages} unread messages`"
                class="bm-bg-blue-400 bm-text-white bm-font-bold bm-text-xs bm-rounded-md bm-px-1"></span>
            </p>
          </div>
        </div>

      </div>
    </template>

    <p x-show="filteredContacts.length === 0" class="bm-text-sm bm-text-center bm-font-semibold bm-text-gray-600">No contacts found</p>
  </section>
</div>
