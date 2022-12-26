import useRouteElements from './useRouteElements'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useContext, useEffect } from 'react'
import { cookieEventTarget, localStorageEventTarget } from './utils/auth'
import { AppContext } from './contexts/app.context'

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
    <div>
      {routeElements}
      <ToastContainer />
    </div>
  )
}

export default App
