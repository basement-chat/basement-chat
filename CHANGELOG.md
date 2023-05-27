## [1.0.4](https://github.com/basement-chat/basement-chat/compare/v1.0.3...v1.0.4) (2023-05-27)


### Bug Fixes

* **config:** makes enums cacheable ([8b81475](https://github.com/basement-chat/basement-chat/commit/8b81475f2a42cdd720ccfffd0a4c272c74949fb7))

## [1.0.3](https://github.com/basement-chat/basement-chat/compare/v1.0.2...v1.0.3) (2023-05-27)


### Bug Fixes

* **api:** add basement prefix to api endpoints ([3ba83bf](https://github.com/basement-chat/basement-chat/commit/3ba83bfc611b9279b09dc990f08d7429519ae45a))
* **components:** add message sent time from user ([97a640e](https://github.com/basement-chat/basement-chat/commit/97a640e6d8c615a1a5b75ccbad533efacc206900))
* **components:** auto scroll to last message when new message received ([687be9a](https://github.com/basement-chat/basement-chat/commit/687be9a4ae4daa337974bd2cd4747cdd54563ca3))
* **components:** only apply tippy.js to data-title inside basement selector ([ecf8746](https://github.com/basement-chat/basement-chat/commit/ecf8746bc0df270c7d71633ca1dc92f64a3a542e))
* **components:** show go to last message only when messages not empty ([3d19513](https://github.com/basement-chat/basement-chat/commit/3d195136d8379c8b3b1cd11cd3254cb2d3f76857))
* **console:** fix return type error detected by phpstan ([27ecace](https://github.com/basement-chat/basement-chat/commit/27ecace967c400f16f5d9ad6f21fcddf8f977a82))
* **console:** install soketi with pusher ([90eaffa](https://github.com/basement-chat/basement-chat/commit/90eaffa5ba7d460ad8d8e87cf34df0daff6cf5ac))
* **console:** run migration after installing driver ([071dc94](https://github.com/basement-chat/basement-chat/commit/071dc9475993c098bade8b642a9b8ad06571a343))
* **css:** use sans font family for tippy ([9dc05c5](https://github.com/basement-chat/basement-chat/commit/9dc05c5316fe91244276d367e18e8ac4a0fc7227))
* **plugins:** better null safe handling when echo option is null ([2bf4de9](https://github.com/basement-chat/basement-chat/commit/2bf4de90a8012734fde37300c8d1e4aae88e8ef7))
* **tailwind:** add prefix selector to prevent style conflicts ([e85c804](https://github.com/basement-chat/basement-chat/commit/e85c8044b91b5b7c02a5fbe9a380d90155120ec3))
* **tailwind:** use tailwindcss form classes instead of global selector ([70b5e45](https://github.com/basement-chat/basement-chat/commit/70b5e45690129bf35bea62ca9a297e2570214482))
* use better block element selector naming ([abd4686](https://github.com/basement-chat/basement-chat/commit/abd46863c6eded17cba543eb5b9a2fbe0b9e9a23))
* **utils:** fix date format ([bfe64e6](https://github.com/basement-chat/basement-chat/commit/bfe64e61e0de1d5e2acecd24dc64c8c2fe5d449f))


### Performance Improvements

* **data:** cache resolved model to variable ([e9596ef](https://github.com/basement-chat/basement-chat/commit/e9596eff63e48819f49c206fbbd39c77210b4502))

## [1.0.2](https://github.com/basement-chat/basement-chat/compare/v1.0.1...v1.0.2) (2023-05-13)


### Bug Fixes

* **contacts:** add current account indicator ([c069e04](https://github.com/basement-chat/basement-chat/commit/c069e04df26604fc57d6d2996eacf16bf9c4bf4a))
* **private messages:** add sent message time tooltip ([ce136d0](https://github.com/basement-chat/basement-chat/commit/ce136d0e4f3b7b85b17edebb39300542d8a11abf))

## [1.0.1](https://github.com/basement-chat/basement-chat/compare/v1.0.0...v1.0.1) (2023-05-12)


### Bug Fixes

* add doc blocks and fix possible errors detected by phpstan ([7adafeb](https://github.com/basement-chat/basement-chat/commit/7adafeb7777822884ef77f92ce4c37f760038d11))
* **console:** update install description ([7ae5881](https://github.com/basement-chat/basement-chat/commit/7ae588153ba97c0552760660fe9f4178bcab4ea0))
* **console:** use unlocked pusher version ([4997777](https://github.com/basement-chat/basement-chat/commit/4997777087e260453053a3cdd8976746273a8b71))
* **events:** direct broadcast without using queue ([b6f7a04](https://github.com/basement-chat/basement-chat/commit/b6f7a04b258afb3a9a29e0c9bc22815372c654f2))
* replace spatie laravel data with laravel collection ([f2f9528](https://github.com/basement-chat/basement-chat/commit/f2f9528460b4cd9def21ac2999be7f7b36ea3f69))
* **views:** add sent hour information from sender ([44af2a0](https://github.com/basement-chat/basement-chat/commit/44af2a08f9b19079eedb70dd1c78637d15fe42a5))

# 1.0.0 (2023-05-11)

Initial release

# Changelog

All notable changes to `basement` will be documented in this file.
