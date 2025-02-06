import type { Meta, StoryObj } from '@storybook/react'

import MainLayout from './MainLayout'
import ProductList from 'src/pages/ProductList'

const meta = {
  title: 'Shopee/Layout/MainLayout',
  component: MainLayout,
  parameters: {
    layout: 'fullscreen'
    // viewport: {
    //   defaultViewport: 'tablet',
    //   viewports: {
    //     tablet: { name: 'Tablet', styles: { width: '900px', height: '100%' } }
    //   }
    // }
  },
  tags: ['autodocs']
} satisfies Meta<typeof MainLayout>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {
    children: <ProductList />
  }
}

export const CustomPage: Story = {
  args: {
    children: 'Page Custom'
  }
}
