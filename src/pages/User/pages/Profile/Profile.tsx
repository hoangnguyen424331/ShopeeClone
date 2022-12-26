import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation, useQuery } from '@tanstack/react-query'
import React, { useContext, useEffect } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import { userApi } from 'src/apis/user.api'
import Button from 'src/components/Button'
import DateSelect from 'src/components/DateSelect'
import Input from 'src/components/Input'
import InputNumber from 'src/components/InputNumber'
import { AppContext } from 'src/contexts/app.context'
import { setProfileToLs } from 'src/utils/auth'
import { userSchema, UserSchema } from 'src/utils/rules'

type FormData = Pick<UserSchema, 'name' | 'address' | 'phone' | 'date_of_birth' | 'avatar'>

const profileSchema = userSchema.pick(['name', 'address', 'phone', 'date_of_birth', 'avatar'])

export default function Profile() {
  const { data: dataProfile, refetch } = useQuery({
    queryKey: ['profile'],
    queryFn: userApi.getProfile
  })
  const profile = dataProfile?.data.data

  const updateProfileMutation = useMutation(userApi.updateProfile)

  const { setProfile } = useContext(AppContext)

  const {
    register,
    control,
    handleSubmit,
    setValue,
    formState: { errors }
  } = useForm<FormData>({
    // set 1 lần duy nhất khi component render
    defaultValues: {
      name: '',
      address: '',
      phone: '',
      avatar: '',
      // năm tháng 1===0 ngày
      date_of_birth: new Date(1990, 0, 1)
    },
    resolver: yupResolver(profileSchema)
  })

  useEffect(() => {
    if (profile) {
      setValue('name', profile.name)
      setValue('address', profile.address)
      setValue('phone', profile.phone)
      setValue('avatar', profile.avatar)
      setValue('date_of_birth', profile.date_of_birth ? new Date(profile.date_of_birth) : new Date(1990, 0, 1))
    }
  }, [profile, setValue])

  const onSubmit = handleSubmit(async (data) => {
    const res = await updateProfileMutation.mutateAsync({
      ...data,
      date_of_birth: data.date_of_birth?.toISOString()
    })
    setProfile(res.data.data)
    setProfileToLs(res.data.data)
    refetch()
    toast.success(res.data.message)
  })

  return (
    <div className='pd-20 rounded-sm bg-white px-7 shadow'>
      <div className='border-b border-b-gray-200 py-6'>
        <p className='mb-2 text-lg font-medium capitalize'>Hồ Sơ Của Tôi</p>
        <span className='text-fray-700 text-sm'>Quản lý thông tin hồ sơ để bảo mật tài khoản</span>
      </div>
      <div className='mt-8 flex flex-col-reverse md:flex-grow md:items-start'>
        <form className='mt-8 flex w-full flex-col-reverse md:flex-row md:items-start' onSubmit={onSubmit}>
          <div className='mt-6 flex-grow md:mt-0 md:pr-12'>
            <div className='flex flex-col flex-wrap sm:flex-row'>
              <div className='truncate pt-3 capitalize sm:w-[20%] sm:text-right'>Email</div>
              <div className='sm:w-[80%] sm:pl-5'>
                <div className='pt-3 text-gray-700'>{profile?.email}</div>
              </div>
            </div>
            <div className='mt-4 flex flex-col flex-wrap sm:flex-row'>
              <div className='truncate pt-3 capitalize sm:w-[20%] sm:text-right'>Tên đăng nhập</div>
              <div className='sm:w-[80%] sm:pl-5'>
                <Input
                  register={register}
                  name='name'
                  placeholder='Tên đăng nhập'
                  errorMessage={errors.name?.message}
                  classNameInput='w-full rounded-sm border border-gray-300 px-3 py-2 outline-none focus:border-gray-500 focus:shadow-sm'
                />
              </div>
            </div>

            <div className='mt-4 flex flex-col flex-wrap sm:flex-row'>
              <div className='truncate pt-3 capitalize sm:w-[20%] sm:text-right'>Số điện thoại</div>
              <div className='sm:w-[80%] sm:pl-5'>
                <Controller
                  control={control}
                  name='phone'
                  render={({ field }) => (
                    <InputNumber
                      classNameInput='p-1 w-full outline-none border border-gray-300 focus:border-gray-500 rounded-sm focus:shadow-sm'
                      placeholder='Số điện thoại'
                      type='text'
                      className='grow'
                      {...field}
                      name='phone'
                      onChange={(event) => {
                        field.onChange(event)
                      }}
                      classNameError={errors.phone?.message}
                    />
                  )}
                />
              </div>
            </div>

            <div className='mt-4 flex flex-col flex-wrap sm:flex-row'>
              <div className='truncate pt-3 capitalize sm:w-[20%] sm:text-right'>Địa chỉ</div>
              <div className='sm:w-[80%] sm:pl-5'>
                <Input
                  register={register}
                  name='address'
                  placeholder='Địa chỉ của bạn'
                  errorMessage={errors.address?.message}
                  classNameInput='w-full rounded-sm border border-gray-300 px-3 py-2 outline-none focus:border-gray-500 focus:shadow-sm'
                />
              </div>
            </div>

            <div className='mt-4 flex flex-col flex-wrap sm:flex-row'>
              <div className='truncate pt-3 capitalize sm:w-[20%] sm:text-right'>Ngày sinh</div>
              <Controller
                control={control}
                name='date_of_birth'
                render={({ field }) => (
                  <DateSelect
                    errorMessage={errors.date_of_birth?.message}
                    value={field.value}
                    onChange={(value) => field.onChange(value)}
                  />
                )}
              />
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
          <div className='flex justify-center md:border-l md:border-l-gray-200'>
            <div className='flex flex-col items-center'>
              <div className='my-5 h-24 w-24'>
                <img src='' alt='image_profile' className='h-full w-full rounded-full object-cover' />
              </div>
              <input className='hidden' type='file' accept='.jpg,.jpeg,.png' />
              <button
                type='button'
                className='flex h-10 items-center justify-end rounded-sm border bg-white px-6 text-sm text-gray-600 shadow-sm'
              >
                Chọn ảnh
              </button>
              <div className='mt-3 text-gray-400'>
                <div>Dụng lượng file tối đa 1 MB</div>
                <div>Định dạng:.JPEG, .PNG</div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}
