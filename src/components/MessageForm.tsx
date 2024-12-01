import { Button, TextArea } from '@apideck/components'
import { useState } from 'react'
import { useMessages } from '@/utils/useMessages'
import { ChangeEvent } from 'react'

const MessageForm = () => {
  const [content, setContent] = useState('')
  const { addMessage, isLoadingAnswer } = useMessages()

  const handleSubmit = async (e?: React.FormEvent<HTMLFormElement>) => {
    e?.preventDefault()
    const messageContent = content.trim() // Store content in temporary variable
    if (!messageContent) return

    setContent('') // Clear input immediately

    try {
      await addMessage(messageContent) // Use stored content
    } catch (error) {
      console.error('Failed to send message:', error)
      setContent(messageContent) // Restore content if error occurs
    }
  }

  return (
    <form className="relative mx-auto max-w-3xl rounded-t-xl" onSubmit={handleSubmit}>
      <div className="h-[150px] rounded-t-xl backdrop-blur border-t border-l border-r border-cyan-500/20 bg-gray-900/90 p-5">
        <TextArea
          name="content"
          placeholder="Enter your message here..."
          rows={3}
          value={content}
          autoFocus
          className="!p-3 text-cyan-400 border-0 ring-1 ring-cyan-500/30 focus:ring-cyan-500/50 focus:outline-none bg-gray-800/80 backdrop-blur placeholder-cyan-700"
          onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setContent(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault()
              handleSubmit()
            }
          }}
        />
        <div className="absolute right-9 bottom-[50px]">
          <div className="flex space-x-3">
            <Button
              className="bg-cyan-600 hover:bg-cyan-700 text-white border border-cyan-400/30"
              type="submit"
              size="small"
              disabled={isLoadingAnswer}
            >
              Send
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-4 h-4 ml-1"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5"
                />
              </svg>
            </Button>
          </div>
        </div>
      </div>
    </form>
  )
}

export default MessageForm
