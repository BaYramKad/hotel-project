import React from 'react'

import { Link } from 'react-router-dom'
import { UserOutlined } from '@ant-design/icons'
import { Avatar } from 'antd'

import headerStyle from './header.module.scss'
import logo from '../../images/logo.png'

export default function Header() {
return (
    <header className={headerStyle.header}>
          <img src={logo} alt='logotype' />
        <div>
          <Avatar size={30} icon={<UserOutlined />} />
              <Link to='/login'>Log out</Link>
        </div>
    </header>
  )
}
