import type { Meta, StoryObj } from '@storybook/react'

import { userEvent, within, expect } from '@storybook/test'
import Login from 'src/pages/Login/Login'

const meta: Meta<typeof Login> = {
  title: 'Shopee/Form/LoginForm',
  component: Login,
  parameters: {
    layout: 'fullscreen'
  }
}

export default meta
type Story = StoryObj<typeof Login>

export const EmptyForm: Story = {}

export const FilledForm: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)

    await userEvent.type(canvas.getByPlaceholderText('Email'), 'nguyen424331@gmail.com')

    await userEvent.type(canvas.getByPlaceholderText('Password'), '1231234')

    await userEvent.click(canvas.getByRole('button'))

    const successMessage = await canvas.findByText(
      'Everything is perfect. Your account is ready and we should probably get you started!'
    )
    expect(successMessage).toBeInTheDocument()
  }
}
