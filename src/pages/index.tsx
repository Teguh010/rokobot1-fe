import MessageForm from '@/components/MessageForm'
import MessagesList from '@/components/MessageList'
import { NextPage } from 'next'
import { MessagesProvider } from '@/utils/useMessages'
import Layout from '../components/Layout'

const IndexPage: NextPage = () => {
  return (
    <MessagesProvider>
      <Layout>
        <div className="flex flex-col h-full">
          <div className="flex-1">
            <MessagesList />
          </div>
          <div>
            <MessageForm />
          </div>
        </div>
      </Layout>
    </MessagesProvider>
  )
}

export default IndexPage
