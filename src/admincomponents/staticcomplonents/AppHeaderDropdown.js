"use client"
import React from 'react'
import {
  CAvatar,
  CBadge,
  CDropdown,
  CDropdownDivider,
  CDropdownHeader,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
} from '@coreui/react'
import {
  cilBell,
  cilCreditCard,
  cilCommentSquare,
  cilEnvelopeOpen,
  cilFile,
  cilLockLocked,
  cilSettings,
  cilTask,
  cilUser,
} from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import logo from '../../../public/images/logo.png'
import Image from 'next/image'
import avatar from'../../../public/images/avatar.png';
import { useRouter } from 'next/navigation'
import { toast } from 'react-toastify'
import { useSideBarContext } from '../../components/context/sidebar'
import Link from 'next/link'
const AppHeaderDropdown = () => {
const router=useRouter()
const { isCollabsled, setIsCollabsled, isClosed,
  setIClosed, setIsUserLogedIn,isUserLogedIn} = useSideBarContext();
  const handleLogout=()=>{
    typeof window !== 'undefined' ?window.localStorage.removeItem("token"): null;
    typeof window !== 'undefined' ? window.localStorage.removeItem("restaurantId"): null;
router.push('/admin')
toast.success("loged out")
setIsUserLogedIn(false)
  }

  const user={
    role:"admin"
  }
  return (
    <CDropdown variant="nav-item">
      <CDropdownToggle placement="bottom-end" className="" caret={false}>
       <CAvatar  size="lg" > 
       <Image src={avatar} width={`50px`} height={`100px`} className='rounded-circle '/>
       </CAvatar>
       
      </CDropdownToggle>
      <CDropdownMenu className="pt-0" placement="bottom-end">
        <CDropdownHeader className="bg-light fw-semibold py-2">Admin</CDropdownHeader>
       {user&&user.role==='admin'?( <>
      
        <CDropdownHeader className="bg-light fw-semibold py-2">Settings</CDropdownHeader>
        <CDropdownItem >
          <CIcon icon={cilUser} className="me-2" />
         <Link href='/admin/profile'>
         Profile
         </Link>
        </CDropdownItem>
       
        
      </>):""}
        <CDropdownDivider />
        <CDropdownItem  onClick={handleLogout} style={{cursor:'pointer'}}>
          <CIcon icon={cilLockLocked} className="me-2"  />
          Log out
        </CDropdownItem>
      </CDropdownMenu>
    </CDropdown>
  )
}

export default AppHeaderDropdown