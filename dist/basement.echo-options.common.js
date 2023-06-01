'use strict';

const container = document.querySelector('.basement-chat-box');
const echoOptions = JSON.parse(container?.getAttribute('data-echo-options') ?? '{}');

module.exports = echoOptions;
//# sourceMappingURL=basement.echo-options.common.js.map
