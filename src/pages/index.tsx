import MessageForm from '@/components/MessageForm'
import MessagesList from '@/components/MessageList'
import { NextPage } from 'next'
import { MessagesProvider } from '@/utils/useMessages'
import Layout from '../components/Layout'

const IndexPage: NextPage = () => {
  return (
    <MessagesProvider>
      <Layout>
        <MessagesList />
        <div>
          <MessageForm />
        </div>
      </Layout>
    </MessagesProvider>
  )
}

export default IndexPage
