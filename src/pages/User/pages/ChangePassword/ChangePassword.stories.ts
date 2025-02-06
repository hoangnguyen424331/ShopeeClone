import type { Meta, StoryObj } from '@storybook/react'

import { userEvent, within, expect } from '@storybook/test'
import ChangePassword from 'src/pages/User/pages/ChangePassword/ChangePassword'

const meta: Meta<typeof ChangePassword> = {
  title: 'Shopee/Form/ChangePasswordForm',
  component: ChangePassword,
  parameters: {
    layout: 'fullscreen'
  }
}

export default meta
type Story = StoryObj<typeof ChangePassword>

export const EmptyForm: Story = {}

export const FilledForm: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)

    await userEvent.type(canvas.getByPlaceholderText('Mật khẩu cũ'), '12341234')

    await userEvent.type(canvas.getByPlaceholderText('Mật khẩu mới'), '123123')

    await userEvent.type(canvas.getByPlaceholderText('Nhập lại mật khẩu'), '123123')

    await userEvent.click(canvas.getByRole('button'))

    const successMessage = await canvas.findByText('Cập nhật thông tin thành công')
    expect(successMessage).toBeInTheDocument()
  }
}
