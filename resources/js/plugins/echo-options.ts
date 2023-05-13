const container: HTMLDivElement = document.querySelector('.chat-box__container--main')!
const echoOptions = JSON.parse(container.getAttribute('data-echo-options')!) as object

export default echoOptions
