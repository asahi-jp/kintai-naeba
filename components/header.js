import { useContext, useRef } from 'react'
import Link from 'next/link';
import { useRouter } from "next/router";
import { GlobalState } from '../pages/_app'
import {
  useDisclosure,
  Box,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverArrow,
  PopoverCloseButton,
  Avatar, 
  AvatarBadge, 
  AvatarGroup,
  Button,
  IconButton,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
} from '@chakra-ui/react'
import { 
  HamburgerIcon,
  TimeIcon,
  ChevronDownIcon, 
  ViewIcon, 
  ArrowBackIcon 
} from '@chakra-ui/icons'
import { BiLogOut } from "react-icons/bi";

export default function Header() {
  const { staff, setStaff, setToastValue } = useContext(GlobalState)
  const router = useRouter();
  const { isOpen, onOpen, onClose } = useDisclosure()
  const btnRef = useRef()

  const handleLogo = () => {
    if(staff) router.push("/form")
  }

  // ログアウト処理
  const handleLogout = () => {
    setStaff(null)
    sessionStorage.removeItem("id")
    sessionStorage.removeItem("name")
    setToastValue({
      title: "ログアウトしました",
      description: "",
      status: "success"
    })
    router.replace("/login")
  }

  return (
    <>
      <header className="border-b flex justify-between items-center px-3 py-3">
        <div className="font-bold text-lg pointer">
          <button onClick={handleLogo}>苗場勤怠</button>
        </div>
        <div className='flex items-center gap-5'>
          {/* プロフィール */}
          <Popover mr={2}>
            <PopoverTrigger>
              <Button p={0} rounded={50}>
                <Avatar size='md'>
                  <AvatarBadge boxSize='1.25em' bg={staff ? "green.500" : "tomato"}/>
                </Avatar>
              </Button>
            </PopoverTrigger>
            <PopoverContent>
              <PopoverArrow />
              <PopoverBody>
                {staff ? (
                  <>
                    <table>
                      <tbody>
                        <tr>
                          <th>自分のID：</th>
                          <td>{staff.id}</td>
                        </tr>
                        <tr>
                          <th>スタッフ名：</th>
                          <td>{staff.name}</td>
                        </tr>
                      </tbody>
                    </table>
                  </>
                ) : "ログインしていません"}
              </PopoverBody>
            </PopoverContent>
          </Popover>
          {/* メニュー */}
          {staff && (
            <>
              <Menu>
                <MenuButton
                  px={4}
                  py={2}
                  transition='all 0.2s'
                  borderRadius='md'
                  borderWidth='1px'
                  _hover={{ bg: 'gray.400' }}
                  _expanded={{ bg: 'blue.400' }}
                  _focus={{ boxShadow: 'outline' }}
                >
                  メニュー <ChevronDownIcon />
                </MenuButton>
                <MenuList>
                  <MenuItem icon={<TimeIcon fontSize="20" />} onClick={() => router.replace('/form')}>
                    勤怠入力
                  </MenuItem>
                  <MenuItem icon={<ViewIcon fontSize="20" />} onClick={() => router.replace('/log')}>
                    勤怠履歴確認
                  </MenuItem>
                  <MenuItem icon={<BiLogOut fontSize="20" />} onClick={handleLogout}>
                    ログアウト
                  </MenuItem>
                </MenuList>
              </Menu>
            </>
          )}
        </div>
      </header>
    </>
  )
}