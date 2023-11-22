"use client";
import React, { useState } from 'react';
import { Menu, Badge } from 'antd';
import logo from "../../../public/images/logo2.png";
import avatar from "../../../public/images/avatar.png";
import Image from "next/image";
import { Settings } from '@mui/icons-material';
import {
  MailOutlined,
  AppstoreOutlined,
  SettingOutlined,
  BellOutlined,
} from '@ant-design/icons';
import './colored.css'
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import { useOwnerSideBarContext } from '../../components/context/ownersidebar';
const OwnerAppHeader = () => {
  const router=useRouter()
  const [current, setCurrent] = useState('logo');

  const { isCollabsled2, setIsCollabsled2, isClosed2,

    setIClosed2, setIsUserLogedIn2,isUserLogedIn2} = useOwnerSideBarContext();
  
  const handleLogout=()=>{
    typeof window !== 'undefined' ?window.localStorage.removeItem("token"): null;
    typeof window !== 'undefined' ? window.localStorage.removeItem("restaurantId"): null;
router.push('/admin')
toast.success("loged out")
setIsUserLogedIn(false)
  }
  const items = [
    {
      key: 'logo',
      icon: <Image src={logo} width={70} height={50} />,
    },
  ];

  const adminOptions = [
    {
      label: <h6 onClick={handleLogout} className='mt-2'>Log out</h6>,
      key: 'logout',
    }
  ];

  const onClick = (e) => {
    console.log('click ', e);
    setCurrent(e.key);
  };

  return (
    <Menu onClick={onClick} selectedKeys={[current]} mode="horizontal" className='pt-2'>
      {isUserLogedIn2&&items.map((item) => (
        <Menu.Item key={item.key} icon={item.icon} disabled={item.disabled}>
          {item.label}
        </Menu.Item>
      ))}
      <Menu.SubMenu className='ms-auto' key="admin" icon={<Image src={avatar} width={40} height={40}  className='mt-4'/>} title="Admin">
        {adminOptions.map((option) => (
          <Menu.Item key={option.key} icon={option.icon}>
            {option.label}
          </Menu.Item>
        ))}
      </Menu.SubMenu>
     
    </Menu>
  );
};

export default OwnerAppHeader;
