import React from 'react'
import { Outlet } from 'react-router-dom'
import UserSideNav from '../../Components/UserSideNav'

// Sử dụng Outlet thì ko được dùng children
export default function UserLayout() {
  return (
    <div className='bg-neutral-100 py-16 text-sm text-gray-600'>
      <div className='container'>
        <div className='grid grid-cols-1 gap-6 md:grid-cols-12'>
          <div className='gird md:col-span-3 lg:col-span-2'>
            <UserSideNav />
          </div>
          <div className='grid md:col-span-9 lg:col-span-10'>
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  )
}
