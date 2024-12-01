import { useMessages } from '@/utils/useMessages'
import { useEffect, useRef } from 'react'

interface Message {
  role: 'user' | 'system' | 'assistant'
  content: string
}

const MessagesList = () => {
  const { messages, isLoadingAnswer, streamingContent } = useMessages()
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    if (messagesEndRef.current && typeof messagesEndRef.current.scrollIntoView === 'function') {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages, streamingContent])

  return (
    <div className="max-w-3xl mx-auto pt-8 h-[calc(100vh-180px)] overflow-y-auto">
      {messages?.map((message: Message, i: number) => {
        const isUser = message.role === 'user'
        if (message.role === 'system') return null
        return (
          <div
            id={`message-${i}`}
            className={`flex mb-4 fade-up ${isUser ? 'justify-end' : 'justify-start'}`}
            key={`${i}-${message.content}`}
          >
            {!isUser && (
              <img
                src="https://www.teamsmart.ai/next-assets/team/ai.jpg"
                className="w-9 h-9 rounded-full border-2 border-cyan-500 glow-cyan"
                alt="avatar"
              />
            )}
            <div
              style={{ maxWidth: 'calc(100% - 45px)' }}
              className={`group relative px-3 py-2 rounded-lg ${
                isUser
                  ? 'mr-2 bg-gradient-to-r from-cyan-600 to-blue-700 text-white border border-cyan-400/30'
                  : 'ml-2 bg-gradient-to-r from-gray-800 to-gray-900 text-cyan-400 border border-cyan-900'
              }`}
            >
              {message.content.trim()}
            </div>
            {isUser && (
              <img
                src="https://www.teamsmart.ai/next-assets/profile-image.png"
                className="w-9 h-9 rounded-full border-2 border-blue-500 glow-blue"
                alt="avatar"
              />
            )}
          </div>
        )
      })}

      {streamingContent && (
        <div className="flex justify-start mb-4">
          <img
            src="https://www.teamsmart.ai/next-assets/team/ai.jpg"
            className="w-9 h-9 rounded-full"
            alt="avatar"
          />
          <div
            style={{ maxWidth: 'calc(100% - 45px)' }}
            className="group relative px-3 py-2 rounded-lg ml-2 bg-gradient-to-r from-gray-800 to-gray-900 text-cyan-400 border border-cyan-900"
          >
            {streamingContent}
          </div>
        </div>
      )}

      {isLoadingAnswer && !streamingContent && (
        <div className="flex justify-start mb-4">
          <div className="loader ml-2 p-2.5 px-4 bg-gray-800 border border-cyan-900 rounded-full space-x-1.5 flex justify-between items-center relative">
            <span className="block w-3 h-3 rounded-full bg-cyan-500 animate-pulse"></span>
            <span className="block w-3 h-3 rounded-full bg-cyan-500 animate-pulse delay-75"></span>
            <span className="block w-3 h-3 rounded-full bg-cyan-500 animate-pulse delay-150"></span>
          </div>
        </div>
      )}

      <div ref={messagesEndRef} />
    </div>
  )
}

export default MessagesList
