import { render, screen } from '@testing-library/react'
import App from '@/pages/index'

beforeAll(() => {
  // Mock scrollIntoView
  window.HTMLElement.prototype.scrollIntoView = jest.fn()
})

describe('App', () => {
  it('renders the chat interface', () => {
    render(<App />)

    // Test untuk elemen-elemen yang benar-benar ada di halaman
    expect(screen.getByPlaceholderText('Enter your message here...')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Send' })).toBeInTheDocument()
    expect(screen.getByAltText('avatar')).toBeInTheDocument()
  })
})
