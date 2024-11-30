import { NextApiRequest, NextApiResponse } from 'next'
import { SYSTEM_MESSAGE } from '@/utils/constants'

export default async function createMessage(req: NextApiRequest, res: NextApiResponse) {
  const { messages } = req.body
  const apiKey = process.env.OPENAI_API_KEY
  const url = 'https://api.openai.com/v1/chat/completions'

  const conversationHistory = [SYSTEM_MESSAGE, ...messages]

  const body = JSON.stringify({
    messages: conversationHistory,
    model: 'gpt-4o-mini',
    stream: true
  })

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`
      },
      body
    })

    if (!response.body) {
      throw new Error('Response body is null')
    }

    res.writeHead(200, {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache, no-transform',
      Connection: 'keep-alive'
    })

    const reader = response.body.getReader()
    const decoder = new TextDecoder()

    let streaming = true
    while (streaming) {
      const { done, value } = await reader.read()
      if (done) {
        streaming = false
        break
      }

      const chunk = decoder.decode(value)
      const lines = chunk.split('\n')
      for (const line of lines) {
        if (line.startsWith('data: ')) {
          const data = line.slice(6)
          if (data === '[DONE]') {
            res.end()
            return
          }

          try {
            const parsed = JSON.parse(data)
            const content = parsed.choices[0]?.delta?.content || ''
            res.write(`data: ${JSON.stringify({ content })}\n\n`)
          } catch (error) {
            console.error('Error parsing chunk:', error)
          }
        }
      }
    }
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message })
    } else {
      res.status(500).json({ error: 'An unknown error occurred' })
    }
  }
}
