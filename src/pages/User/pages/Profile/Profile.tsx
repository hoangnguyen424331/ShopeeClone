import React from 'react'
import Button from 'src/components/Button'
import Input from 'src/components/Input'

export default function Profile() {
  return (
    <div className='pd-20 rounded-sm bg-white px-7 shadow'>
      <div className='border-b border-b-gray-200 py-6'>
        <p className='mb-2 text-lg font-medium capitalize'>Hồ Sơ Của Tôi</p>
        <span className='text-fray-700 text-sm'>Quản lý thông tin hồ sơ để bảo mật tài khoản</span>
      </div>
      <div className='mt-8 flex flex-col-reverse md:flex-grow md:items-start'>
        <form className='mt-8 flex w-full flex-col-reverse md:flex-row md:items-start'>
          <div className='mt-6 flex-grow md:mt-0 md:pr-12'>
            <div className='flex flex-col flex-wrap sm:flex-row'>
              <div className='truncate pt-3 capitalize sm:w-[20%] sm:text-right'>Email</div>
              <div className='sm:w-[80%] sm:pl-5'>
                <div className='pt-3 text-gray-700'>Nguyen@gmail.com</div>
              </div>
            </div>
            <div className='mt-4 flex flex-col flex-wrap sm:flex-row'>
              <div className='truncate pt-3 capitalize sm:w-[20%] sm:text-right'>Tên đăng nhập</div>
              <div className='sm:w-[80%] sm:pl-5'>
                <Input classNameInput='w-full rounded-sm border border-gray-300 px-3 py-2 outline-none focus:border-gray-500 focus:shadow-sm' />
              </div>
            </div>

            <div className='mt-4 flex flex-col flex-wrap sm:flex-row'>
              <div className='truncate pt-3 capitalize sm:w-[20%] sm:text-right'>Số điện thoại</div>
              <div className='sm:w-[80%] sm:pl-5'>
                <Input classNameInput='w-full rounded-sm border border-gray-300 px-3 py-2 outline-none focus:border-gray-500 focus:shadow-sm' />
              </div>
            </div>

            <div className='mt-4 flex flex-col flex-wrap sm:flex-row'>
              <div className='truncate pt-3 capitalize sm:w-[20%] sm:text-right'>Địa chỉ</div>
              <div className='sm:w-[80%] sm:pl-5'>
                <Input classNameInput='w-full rounded-sm border border-gray-300 px-3 py-2 outline-none focus:border-gray-500 focus:shadow-sm' />
              </div>
            </div>

            <div className='mt-4 flex flex-col flex-wrap sm:flex-row'>
              <div className='truncate pt-3 capitalize sm:w-[20%] sm:text-right'>Ngày sinh</div>
              <div className='sm:flex sm:w-[80%] sm:pl-5'>
                <select className='mr-1 h-10 w-[32%] rounded-sm border border-gray-300 px-3 py-2' />

                <select className='mr-1 h-10 w-[32%] rounded-sm border border-gray-300 px-3 py-2' />

                <select className='h-10 w-[32%] rounded-sm border border-gray-300 px-3 py-2' />
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
        <div className='flex justify-center md:border-l md:border-l-gray-200'>
          <div className='flex flex-col items-center'>
            <div className='my-5 h-24 w-24'>
              <img src='' alt='image_profile' className='h-full w-full rounded-full object-cover' />
            </div>
            <input className='hidden' type='file' accept='.jpg,.jpeg,.png' />
            <button className='flex h-10 items-center justify-end rounded-sm border bg-white px-6 text-sm text-gray-600 shadow-sm'>
              Chọn ảnh
            </button>
            <div className='mt-3 text-gray-400'>
              <div>Dụng lượng file tối đa 1 MB</div>
              <div>Định dạng:.JPEG, .PNG</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
