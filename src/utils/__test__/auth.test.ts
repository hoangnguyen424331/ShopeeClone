const access_token = 'abc'
const refresh_token = 'abcd'
const profile =
  '{"_id":"63a0384e6d7c62034084f184","roles":["User"],"email":"vp3@gmail.com","createdAt":"2022-12-19T10:09:18.978Z","updatedAt":"2022-12-27T03:23:09.806Z","__v":0,"date_of_birth":"1999-11-13T17:00:00.000Z","address":"NGO QUYEN","name":"Nguyen","phone":"0902132751","avatar":"69c625d1-601e-4e7d-882f-6d1cbd797bea.png"}'

// toEqual: kiểm tra giá trị trong object giống nhau còn toBe thì không

import Cookies from 'js-cookie'
import { describe, it, expect } from 'vitest'
import { getRefreshTokenFromCookie, saveAccessTokenToCookie, setProfileToLs, setRefreshTokenToCookie } from '../auth'

describe('saveAccessTokenToCookie', () => {
  it('access_token được set vào cookie', () => {
    saveAccessTokenToCookie(access_token)
    expect(Cookies.get('access_token')).toBe(access_token)
  })
})

describe('setRefreshTokenToCookie', () => {
  it('access_token được set vào cookie', () => {
    setRefreshTokenToCookie(refresh_token)
    expect(getRefreshTokenFromCookie()).toBe(refresh_token)
  })
})

describe('setProfileFromLs', () => {
  it('profile được set vào local storage', () => {
    setProfileToLs(profile as any)
    expect(JSON.parse(localStorage.getItem('profile') as any)).equals(profile)
  })
})
