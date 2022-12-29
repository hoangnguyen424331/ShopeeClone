import useRouteElements from './useRouteElements'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useContext, useEffect } from 'react'
import { cookieEventTarget, localStorageEventTarget } from './utils/auth'
import { AppContext } from './contexts/app.context'
import ErrorBoundary from './components/ErrorBoundary'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { HelmetProvider } from 'react-helmet-async'

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
      <ErrorBoundary>
        {routeElements}
        <ToastContainer />
      </ErrorBoundary>
      <ReactQueryDevtools initialIsOpen={false} />
    </HelmetProvider>
  )
}

export default App
