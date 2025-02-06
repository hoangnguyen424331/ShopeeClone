import type { Meta, StoryObj } from '@storybook/react'

import ProductList from 'src/pages/ProductList/ProductList'

const meta = {
  title: 'Shopee/Pages/ProductList',
  component: ProductList,
  parameters: {
    layout: 'fullscreen'
  },
  tags: ['autodocs']
} satisfies Meta<typeof ProductList>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {}
