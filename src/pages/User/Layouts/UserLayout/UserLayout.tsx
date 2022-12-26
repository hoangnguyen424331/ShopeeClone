import React from 'react'
import { Outlet } from 'react-router-dom'
import UserSideNav from '../../Components/UserSideNav'

// Sử dụng Outlet thì ko được dùng children
export default function UserLayout() {
  return (
    <div>
      <UserSideNav />
      <Outlet />
    </div>
  )
}
