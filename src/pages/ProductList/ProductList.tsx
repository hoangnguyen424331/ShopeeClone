import { useQuery } from '@tanstack/react-query'
import React from 'react'
import { productApi } from 'src/apis/product.api'
import useQueryParams from 'src/hooks/useQueryParam'
import { ProductListConfig } from 'src/types/product.types'
import AsideFilter from './components/AsideFilter'
import Product from './components/Product'
import SortProductList from './components/SortProductList'

export default function ProductList() {
  const queryParams = useQueryParams()

  const { data: productsData } = useQuery({
    queryKey: ['products', queryParams],
    queryFn: () => {
      return productApi.getProducts(queryParams as ProductListConfig)
    }
  })

  return (
    <div className='bg-gray-200 py-6'>
      <div className='container'>
        <div className='grid grid-cols-12 gap-6'>
          <div className='col-span-3'>
            <AsideFilter />
          </div>
          <div className='col-span-9'>
            <SortProductList />
            <div className='mt-6 grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5'>
              {productsData?.data.data.products.map((product) => (
                <div key={product._id}>
                  <Product product={product} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
