import React from 'react'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import Button from 'src/components/Button'
import Input from 'src/components/Input'

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm()

  const onSubmit = handleSubmit((data) => {
    console.log(data)
  })

  return (
    <div className='bg-orange'>
      <div className='container'>
        <div className='grid grid-cols-1 py-12 lg:mr-10 lg:grid-cols-5 lg:py-32'>
          <div className='lg:col-span-2 lg:col-start-4'>
            <form className='rounded bg-white p-10 shadow-sm' onSubmit={onSubmit}>
              <p className='text-2xl'>Đăng nhập</p>
              <Input name='email' type='email' className='mt-8' placeholder='Email' />
              <Input
                name='password'
                type='password'
                className='mt-2'
                classNameEye='absolute right-[5px] h-5 w-5 cursor-pointer top-[12px]'
                placeholder='Password'
                autoComplete='on'
              />
              <div className='mt-3'>
                <Button
                  type='submit'
                  className='flex w-full justify-center bg-orange py-4 px-2 text-center uppercase text-white hover:bg-red-600'
                >
                  Đăng nhập
                </Button>
              </div>
              <div className='mt-3 flex items-center justify-center'>
                <span className='mr-1 text-gray-400'>Bạn chưa có tài khoản?</span>
                <Link to='/register' className='text-red-400'>
                  Đăng ký
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
