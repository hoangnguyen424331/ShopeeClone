import { describe, test, expect } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import matchers from '@testing-library/jest-dom/matchers'
import App from './App'
import { BrowserRouter, MemoryRouter } from 'react-router-dom'
import { path } from './constants/path'

export const renderWithRouter = ({ route = '/' } = {}) => {
  window.history.pushState({}, 'test page', route)
  return {
    user: userEvent.setup(),
    ...render(<App />, { wrapper: BrowserRouter })
  }
}

expect.extend(matchers)

describe('App', () => {
  test('App render và chuyển trang', async () => {
    const { user } = renderWithRouter()
    /*
    waitFor sẽ run callback 1 vài lần
    cho đến khi hết timeout hoặc expect pass
    số lần run phụ thuộc vào timeout và interval
    mặ định timeout = 1000ms và interval = 50ms
    */
    await waitFor(() => {
      expect(document.querySelector('title')?.textContent).toBe('Shopee Clone')
    })

    //chuyển trang login
    await user.click(screen.getByText(/Đăng nhập/i))
    await waitFor(() => {
      expect(screen.queryByText('Bạn chưa có tài khoản?')).toBeInTheDocument()
    })
  })

  test('Page not found', async () => {
    renderWithRouter({ route: '/bad/route' })
    await waitFor(() => {
      expect(screen.queryByText('404')).toBeInTheDocument()
    })
  })

  test('Page register', async () => {
    renderWithRouter({ route: path.register })
    await waitFor(() => {
      expect(screen.queryByText(/Bạn đã có tài khoản?/i)).toBeInTheDocument()
    })
  })
})
