import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation } from '@tanstack/react-query'
import omit from 'lodash/omit'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import { userApi } from 'src/apis/user.api'
import Button from 'src/components/Button'
import Input from 'src/components/Input'
import { ErrorResponse } from 'src/types/utils.type'
import { userSchema, UserSchema } from 'src/utils/rules'
import { isAxiosUnprocessableEntity } from 'src/utils/utils'

type FormData = Pick<UserSchema, 'password' | 'new_password' | 'confirm_password'>

const changePassSchema = userSchema.pick(['password', 'new_password', 'confirm_password'])

export default function ChangePass() {
  const changePassMutation = useMutation(userApi.updateProfile)
  const {
    register,
    handleSubmit,
    setError,
    reset,
    formState: { errors }
  } = useForm<FormData>({
    defaultValues: {
      password: '',
      new_password: '',
      confirm_password: ''
    },
    resolver: yupResolver(changePassSchema)
  })

  const onSubmit = handleSubmit((data) => {
    changePassMutation.mutateAsync(omit(data, ['confirm_password']), {
      onSuccess: (data) => {
        toast.success(data.data.message)
        reset()
      },
      onError: (error) => {
        if (isAxiosUnprocessableEntity<ErrorResponse<Omit<FormData, 'confirm_password'>>>(error)) {
          const formError = error.response?.data.data
          if (formError) {
            Object.keys(formError).forEach((key) => {
              setError(key as keyof Omit<FormData, 'confirm_password'>, {
                message: formError[key as keyof Omit<FormData, 'confirm_password'>],
                type: 'Server'
              })
            })
          }
        }
      }
    })
  })

  return (
    <div className='pd-20 rounded-sm bg-white px-7 shadow'>
      <div className='border-b border-b-gray-200 py-6'>
        <p className='mb-2 text-lg font-medium capitalize'>Đổi mật khẩu</p>
        <span className='text-fray-700 text-sm'>Quản lý thông tin hồ sơ để bảo mật tài khoản</span>
      </div>
      <div className='mt-8 flex flex-col-reverse md:flex-grow md:items-start'>
        <form className='mt-8 w-[90%]' onSubmit={onSubmit}>
          <div className='mt-6 flex-grow md:mt-0 md:pr-12'>
            <div className='mt-4 flex flex-col flex-wrap sm:flex-row'>
              <div className='truncate pt-3 capitalize sm:w-[20%] sm:text-right'>Mật khẩu cũ</div>
              <div className='sm:w-[80%] sm:pl-5'>
                <Input
                  register={register}
                  name='password'
                  placeholder='Mật khẩu cũ'
                  type='password'
                  errorMessage={errors.password?.message}
                  className='relative'
                  classNameInput='w-full rounded-sm border border-gray-300 px-3 py-2 outline-none focus:border-gray-500 focus:shadow-sm'
                />
              </div>
            </div>

            <div className='mt-4 flex flex-col flex-wrap sm:flex-row'>
              <div className='truncate pt-3 capitalize sm:w-[20%] sm:text-right'>Mật khẩu mới</div>
              <div className='sm:w-[80%] sm:pl-5'>
                <Input
                  register={register}
                  name='new_password'
                  placeholder='Mật khẩu mới'
                  type='password'
                  errorMessage={errors.new_password?.message}
                  className='relative'
                  classNameInput='w-full rounded-sm border border-gray-300 px-3 py-2 outline-none focus:border-gray-500 focus:shadow-sm'
                />
              </div>
            </div>

            <div className='mt-4 flex flex-col flex-wrap sm:flex-row'>
              <div className='truncate pt-3 capitalize sm:w-[20%] sm:text-right'>Nhập lại mật khẩu mới</div>
              <div className='sm:w-[80%] sm:pl-5'>
                <Input
                  register={register}
                  name='confirm_password'
                  type='password'
                  placeholder='Nhập lại mật khẩu'
                  errorMessage={errors.confirm_password?.message}
                  className='relative'
                  classNameInput='w-full rounded-sm border border-gray-300 px-3 py-2 outline-none focus:border-gray-500 focus:shadow-sm'
                />
              </div>
            </div>

            <div className='my-2 flex flex-col flex-wrap sm:flex-row sm:py-4'>
              <div className='truncate pt-3 capitalize sm:w-[20%] sm:text-right' />
              <div className='sm:w-[80%] sm:pl-5'>
                <Button
                  className='flex h-9 items-center rounded-sm bg-orange px-5 text-center text-sm text-white hover:bg-orange/80'
                  type='submit'
                >
                  Lưu
                </Button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}
