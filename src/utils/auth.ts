import Cookies from 'js-cookie'
import { User } from 'src/types/user.types'

export const localStorageEventTarget = new EventTarget()
export const cookieEventTarget = new EventTarget()

export const saveAccessTokenToCookie = (access_token: string) => {
  Cookies.set('access_token', access_token)
}

export const getAccessTokenFromCookie = () => {
  return Cookies.get('access_token') || ''
}

export const clearAccessTokenFromCookie = () => {
  Cookies.remove('access_token')
  const learCookieEvent = new Event('clearCookie')
  cookieEventTarget.dispatchEvent(learCookieEvent)
}

export const getProfileFromLs = () => {
  const result = localStorage.getItem('profile')
  return result ? JSON.parse(result) : null
}

export const setProfileToLs = (profile: User) => {
  localStorage.setItem('profile', JSON.stringify(profile))
}

export const clearProfileFromLs = () => {
  localStorage.removeItem('profile')
  const learLsEvent = new Event('clearLs')
  localStorageEventTarget.dispatchEvent(learLsEvent)
}
