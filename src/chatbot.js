// Simple chatbot module that calls OpenAI Chat Completions API from the browser.
// WARNING: calling the API from the browser exposes your API key to users.
// Read the README and set VITE_GPT_API_KEY in your local .env only for quick testing.

const OPENAI_ENDPOINT = 'https://api.openai.com/v1/chat/completions'

function appendMessage(container, role, text) {
  const msg = document.createElement('div')
  msg.className = 'message ' + role
  msg.textContent = (role === 'user' ? 'You: ' : 'Bot: ') + text
  container.appendChild(msg)
  container.scrollTop = container.scrollHeight
}

async function callOpenAI(key, userPrompt, onProgress) {
  if (!key) throw new Error('Missing API key')

  const body = {
    model: 'gpt-3.5-turbo',
    messages: [
      { role: 'system', content: 'You are a helpful assistant that recommends dinner menus. Keep suggestions concise and include one vegetarian and one quick option.' },
      { role: 'user', content: userPrompt }
    ],
    temperature: 0.8,
    max_tokens: 300
  }

  const res = await fetch(OPENAI_ENDPOINT, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${key}`
    },
    body: JSON.stringify(body)
  })

  if (!res.ok) {
    const txt = await res.text()
    throw new Error(`OpenAI error ${res.status}: ${txt}`)
  }

  const data = await res.json()
  // Safest: grab the assistant reply
  const reply = data?.choices?.[0]?.message?.content
  return reply || 'Sorry, I could not generate a suggestion.'
}

export function initChatbot(dom) {
  const { messagesEl, formEl, inputEl, sendBtn } = dom
  const key = import.meta.env.VITE_OPENAI_API_KEY

  if (!messagesEl || !formEl || !inputEl) {
    console.warn('Chatbot: missing DOM elements')
    return
  }

  // Initial greeting (career guidance)
  appendMessage(messagesEl, 'bot', '안녕하세요! 진로·직업 추천을 도와드릴게요. 관심사, 성향(예: 야외/사무), 잘하는 과목, 희망 진로 분야가 있으면 알려주세요. 모르겠으면 그냥 "추천해줘"라고 입력하세요.')

  formEl.addEventListener('submit', async (e) => {
    e.preventDefault()
    const text = inputEl.value.trim()
    if (!text) return

    appendMessage(messagesEl, 'user', text)
    inputEl.value = ''

    const loadingMsg = document.createElement('div')
    loadingMsg.className = 'message bot loading'
    loadingMsg.textContent = 'Bot: 생각중...'
    messagesEl.appendChild(loadingMsg)
    messagesEl.scrollTop = messagesEl.scrollHeight

    try {
      if (!key) {
        throw new Error('API key not found. Set VITE_GPT_API_KEY in your .env file and restart dev server.')
      }
      const prompt = `사용자 요청: ${text}\n당신은 고등학생의 진로·직업 상담을 돕는 조언자입니다. 아래 형식으로 최대 5개의 적합한 직업(또는 진로)을 추천하세요. 각 항목에는 (1) 직업명, (2) 추천 이유(학생의 입력과의 연결), (3) 진학/자격/필요 경로(예: 관련 전공 또는 자격증), (4) 준비 시작을 위한 2-3단계의 실용적 조언을 포함하세요. 마지막에 추가로 참고할만한 학습 리소스(한두 개)도 제안하세요.`
      const reply = await callOpenAI(key, prompt)
      loadingMsg.remove()
      appendMessage(messagesEl, 'bot', reply)
    } catch (err) {
      loadingMsg.remove()
      appendMessage(messagesEl, 'bot', `에러: ${err.message}`)
      console.error(err)
    }
  })
}
