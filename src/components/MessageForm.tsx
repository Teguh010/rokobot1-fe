import { Button, TextArea } from '@apideck/components'
import { useState } from 'react'
import { useMessages } from '@/utils/useMessages'
import { ChangeEvent } from 'react'
import { Icon } from '@iconify/react'

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
    <form onSubmit={handleSubmit} className="mt-4">
      <div className="relative border border-[#1E755C] bg-[#001a00]">
        <TextArea
          name="content"
          placeholder="Type command here..."
          rows={2}
          value={content}
          autoFocus
          className="w-full bg-transparent text-[#1E755C] border-0 focus:ring-0 placeholder-[#1E755C]/50"
          onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setContent(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault()
              handleSubmit()
            }
          }}
        />
        <div className="absolute right-2 bottom-2">
          <Button
            className="bg-[#66DCB7] p-1"
            type="submit"
            size="small"
            disabled={isLoadingAnswer}
          >
            <Icon icon="entypo:arrow-up" color="#030E07" width="20" height="20" />
          </Button>
        </div>
      </div>
    </form>
  )
}

export default MessageForm
