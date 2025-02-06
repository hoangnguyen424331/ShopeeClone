import type { Meta, StoryObj } from '@storybook/react'
import Button from './Button'
import { fn } from '@storybook/test'

const meta = {
  title: 'Shopee/Components/Button',
  component: Button,
  parameters: {
    layout: 'centered',
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      expanded: false,
      sort: 'alpha'
    },
    docs: {
      description: {
        story: 'Đây là một mô tả cho story cụ thể.'
      }
    },
    // backgrounds: {
    //   default: 'light',
    //   values: [
    //     { name: 'light', value: '#123123' },
    //     { name: 'dark', value: '#000000' }
    //   ]
    // },
    a11y: {
      element: '#root', // Chỉ định phần tử để kiểm tra khả năng truy cập
      manual: false // Tự động kiểm tra
    },
    options: {
      showPanel: false,
      panelPosition: 'bottom'
    }
  },
  tags: ['autodocs'], //stable
  args: {
    children: 'Button',
    size: 'medium',
    className: 'flex h-10 w-52 items-center justify-center bg-red-500 text-sm uppercase text-white',
    onClick: fn()
  }
} satisfies Meta<typeof Button>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {
    ...meta.args,
    className: `${meta.args.className} hover:bg-red-600`
  }
}

export const LoadingButton: Story = {
  args: {
    isLoading: true,
    ...meta.args
  }
}

export const DisableButton: Story = {
  args: {
    disabled: true,
    ...meta.args,
    className: `${meta.args.className} opacity-50`
  }
}
