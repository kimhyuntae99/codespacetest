import './style.css'
import javascriptLogo from './javascript.svg'
import viteLogo from '/vite.svg'
import { setupCounter } from './counter.js'
import { initChatbot } from './chatbot.js'

document.querySelector('#app').innerHTML = `
  <div>
    <a href="https://vite.dev" target="_blank">
      <img src="${viteLogo}" class="logo" alt="Vite logo" />
    </a>
    <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript" target="_blank">
      <img src="${javascriptLogo}" class="logo vanilla" alt="JavaScript logo" />
    </a>
    <h1>Hello Vite!</h1>
    <div class="card">
      <button id="counter" type="button"></button>
    </div>

    <section id="chatbot" class="chatbot">
      <h2>진로·직업 추천 챗봇</h2>
      <div id="messages" class="messages"></div>
      <form id="chat-form" class="chat-form">
        <input id="user-input" type="text" placeholder="관심사·강점·희망 분야를 적거나 그냥 '추천해줘'라고 입력하세요" />
        <button id="send-btn" type="submit">Send</button>
      </form>
      <p class="note">This demo reads the API key from <code>import.meta.env.VITE_GPT_API_KEY</code>. Exposing keys client-side is insecure — see README.</p>
    </section>

  </div>
`

setupCounter(document.querySelector('#counter'))

// Initialize chatbot (reads import.meta.env.VITE_GPT_API_KEY internally)
initChatbot({
  messagesEl: document.querySelector('#messages'),
  formEl: document.querySelector('#chat-form'),
  inputEl: document.querySelector('#user-input'),
  sendBtn: document.querySelector('#send-btn')
})
