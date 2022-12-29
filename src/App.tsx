import useRouteElements from './useRouteElements'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useContext, useEffect } from 'react'
import { cookieEventTarget, localStorageEventTarget } from './utils/auth'
import { AppContext, AppProvider } from './contexts/app.context'
import ErrorBoundary from './components/ErrorBoundary'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { HelmetProvider } from 'react-helmet-async'

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 0
    }
  }
})

function App() {
  const { reset } = useContext(AppContext)
  const routeElements = useRouteElements()

  useEffect(() => {
    localStorageEventTarget.addEventListener('clearLs', () => {
      reset()
    })
    cookieEventTarget.addEventListener('clearCookie', () => {
      reset()
    })
    return () => {
      localStorageEventTarget.removeEventListener('clearLs', reset)
      cookieEventTarget.removeEventListener('clearCookie', reset)
    }
  }, [reset])

  return (
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
        <AppProvider>
          <ErrorBoundary>
            {routeElements}
            <ToastContainer />
          </ErrorBoundary>
        </AppProvider>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </HelmetProvider>
  )
}

export default App
