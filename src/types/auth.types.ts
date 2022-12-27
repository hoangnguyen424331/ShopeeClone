import { User } from './user.types'
import { SuccessResponse } from './utils.type'

export type AuthResponse = SuccessResponse<{
  access_token: string
  refresh_token: string
  expires_refresh_token: string
  expires: string
  user: User
}>

export type RefreshTokenResponse = SuccessResponse<{ access_token: string }>
