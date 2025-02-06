import type { Meta, StoryObj } from '@storybook/react'
import { reactRouterParameters } from 'storybook-addon-remix-react-router'

import ProductDetail from './ProductDetail'

const meta = {
  title: 'Shopee/Pages/ProductDetail',
  component: ProductDetail,
  parameters: {
    layout: 'fullscreen'
  },
  tags: ['autodocs']
} satisfies Meta<typeof ProductDetail>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  parameters: {
    reactRouter: reactRouterParameters({
      location: {
        pathParams: {
          nameId:
            'Mã-FADI5K245-giảm-5K-đơn-0đ-Áo-thun-tay-lỡ-Gấu194-unisex-form-rộng-trơn-chữ-vải-coton-mềm-mịn-co-dãn-4-chiều--GAU1994-i-60ad061d2fb52902585972af'
        }
      },
      routing: { path: '/users/:nameId' }
    })
  }
}
