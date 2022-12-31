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
                    ID： {staff.id}
                    <br />
                    名前： {staff.name}
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
                  <MenuItem icon={<TimeIcon />} onClick={() => router.replace('/form')}>
                    勤怠入力
                  </MenuItem>
                  <MenuItem icon={<ViewIcon />}  onClick={() => router.replace('/log')}>
                    勤怠履歴確認
                  </MenuItem>
                  <MenuItem icon={<ArrowBackIcon />} onClick={handleLogout}>
                    ログアウト
                  </MenuItem>
                </MenuList>
              </Menu>

              {/* ドロワー */}
              {/* <Button ref={btnRef} p={0} bg={"inherit"} onClick={onOpen}>
                <HamburgerIcon w={8} h={8} />
              </Button>
              <Drawer
                isOpen={isOpen}
                placement='right'
                onClose={onClose}
                finalFocusRef={btnRef}
              >
                <DrawerOverlay />
                <DrawerContent>
                  <DrawerHeader borderBottomWidth='1px'>佐藤 太郎さん</DrawerHeader>
                  <DrawerBody>
                  </DrawerBody>
                </DrawerContent>
              </Drawer> */}
            </>
          )}

        </div>
      </header>
    </>
  )
}