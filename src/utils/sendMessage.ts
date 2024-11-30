import { ChatCompletionRequestMessage } from 'openai'
import { sleep } from './streamingUtils'

export const sendMessage = async (
  messages: ChatCompletionRequestMessage[],
  onStream: (content: string) => void
) => {
  try {
    const response = await fetch('/api/createMessage', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ messages })
    })

    const reader = response.body?.getReader()
    if (!reader) return

    const decoder = new TextDecoder()
    let done = false
    while (!done) {
      const { done: isDone, value } = await reader.read()
      done = isDone
      if (done) break

      const chunk = decoder.decode(value)
      const lines = chunk.split('\n')
      for (const line of lines) {
        if (line.startsWith('data: ')) {
          const data = line.slice(6)
          try {
            const parsed = JSON.parse(data)
            await sleep(30)
            onStream(parsed.content)
          } catch (error) {
            console.error('Error parsing chunk:', error)
          }
        }
      }
    }
  } catch (error) {
    console.log(error)
  }
}
