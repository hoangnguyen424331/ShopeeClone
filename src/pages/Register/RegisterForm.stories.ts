import { userEvent, within } from '@storybook/test'

import { Meta, StoryObj } from '@storybook/react/*'
import Register from 'src/pages/Register/Register'

const meta: Meta<typeof Register> = {
  title: 'Shopee/Form/RegisterForm',
  component: Register,
  parameters: {
    layout: 'fullscreen'
  }
}

export default meta
type Story = StoryObj<typeof Register>

export const FilledForm: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)

    await userEvent.type(canvas.getByPlaceholderText('Email'), 'huanvan3@gmail.com', {
      delay: 100
    })

    await userEvent.type(canvas.getByPlaceholderText('Password'), 'password123', {
      delay: 100
    })

    await userEvent.type(canvas.getByPlaceholderText('Confirm Password'), 'password123', {
      delay: 100
    })

    await userEvent.click(canvas.getByRole('button', { name: /đăng ký/i }))
  }
}
