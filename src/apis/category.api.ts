import { Category } from 'src/types/category.types'
import { SuccessResponse } from 'src/types/utils.type'
import http from 'src/utils/http'

const URL = '/categories'

export const categoryApi = {
  getCategories() {
    return http.get<SuccessResponse<Category[]>>(URL)
  }
}
