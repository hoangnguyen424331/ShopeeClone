import type { Meta, StoryObj } from '@storybook/react'
import CartHeader from './CartHeader'

const meta = {
  title: 'Shopee/Components/CartHeader',
  component: CartHeader,
  parameters: {
    layout: 'fullscreen'
  },
  tags: ['autodocs']
} satisfies Meta<typeof CartHeader>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {}
}
