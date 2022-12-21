import { SuccessResponse } from 'src/types/utils.type'
import http from 'src/utils/http'
import { Product, ProductList, ProductListConfig } from './../types/product.types'

const URL = '/products'

export const productApi = {
  getProducts(params: ProductListConfig) {
    return http.get<SuccessResponse<ProductList>>(URL, { params })
  },
  getProductDetail(id: string) {
    return http.get<SuccessResponse<Product>>(`${URL}/${id}`)
  }
}
