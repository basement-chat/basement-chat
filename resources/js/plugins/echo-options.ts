const container: HTMLDivElement = document.querySelector('.chat-box__container--main')!
const echoOptions: object = JSON.parse(container.getAttribute('data-echo-options')!)

export default echoOptions
