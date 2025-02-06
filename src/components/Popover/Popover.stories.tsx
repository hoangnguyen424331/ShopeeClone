import type { Meta, StoryObj } from '@storybook/react'
import Button from 'src/components/Button'

import Popover from 'src/components/Popover/Popover'

const meta = {
  title: 'Shopee/Components/Popover',
  component: Popover,
  parameters: {
    layout: 'centered'
  },
  tags: ['autodocs'],
  args: { className: 'ml-6 flex cursor-pointer items-center py-1 hover:text-white/70', initialOpen: true },
  render: ({ children, ...args }) => (
    <Popover {...args}>
      <Button className='flex h-10 w-52 items-center justify-center bg-red-500 text-sm uppercase text-white'>
        {children}
      </Button>
    </Popover>
  )
} satisfies Meta<typeof Popover>

export default meta
type Story = StoryObj<typeof meta>

export const CustomPopover: Story = {
  args: {
    children: 'Popover',
    renderPopover: (
      <div className='relative rounded-sm border border-gray-200 bg-white shadow-md'>
        <div className='flex flex-col py-2 pr-28 pl-3'>
          <button className='py-2 px-3 text-left hover:text-orange'>Tiếng Việt</button>
          <button className='mt-2 py-2 px-3 text-left hover:text-orange'>English</button>
        </div>
      </div>
    )
  }
}
