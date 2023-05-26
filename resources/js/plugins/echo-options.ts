const container = document.querySelector('.basement-chat-box')
const echoOptions = JSON.parse(container?.getAttribute('data-echo-options') ?? '{}') as object

export default echoOptions
