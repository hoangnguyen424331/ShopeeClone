import HttpStatusCode from 'src/constants/httpStatusCode.enum'
import http from '../http'
import { describe, test, expect } from 'vitest'

describe('http axios', () => {
  test('Goi Api', async () => {
    const res = await http.get('products')
    console.log(res)
    expect(res.status).toBe(HttpStatusCode.Ok)
  })

  test('Auth Request', async () => {
    await http.post('/login', {
      email: 'vp3@gmail.com',
      password: '123456'
    })
    const res = await http.get('me')
    expect(res.status).toBe(HttpStatusCode.Ok)
  })
})
