import Omit from 'lodash/omit'
import { User } from 'src/types/user.types'
import { SuccessResponse } from 'src/types/utils.type'
import http from 'src/utils/http'

interface BodyUpdateProfile extends Omit<User, '_id' | 'roles' | 'createdAt' | 'updatedAt' | 'email'> {
  password?: string
  newPassword?: string
}

const URL = '/user'
export const userApi = {
  getProfile() {
    return http.get<SuccessResponse<User>>('me')
  },
  updateProfile(body: BodyUpdateProfile) {
    return http.put<SuccessResponse<User>>(URL, body)
  },
  uploadAvatar(body: FormData) {
    return http.post<SuccessResponse<string>>(`${URL}/upload-avatar`, body, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
  }
}
