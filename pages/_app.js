import '../styles/globals.css'
import { createContext, useEffect, useState } from 'react'
import { useRouter } from "next/router";
import { ChakraProvider, useDisclosure, useToast,Button } from '@chakra-ui/react'
import Header from '../components/header';

export const GlobalState = createContext()

function MyApp({ Component, pageProps }) {
  const [staff, setStaff] = useState(null)
  const [toastValue, setToastValue] = useState(null)
  const { isOpen, onOpen, onClose } = useDisclosure()
  const router = useRouter()
  const toast = useToast()

  const value = {
    staff,
    setStaff,
    toastValue,
    setToastValue,
    isOpen, 
    onOpen, 
    onClose
  }

  // セッションの判定をしてステートの変更をする
  useEffect(() => {
    let id = sessionStorage.getItem("id")
    let name = sessionStorage.getItem("name")

    // 認証していない場合
    if(!id) {
      // /login以外へのアクセス：/loginへリダイレクト
      if(router.pathname !== "/login") {
        router.replace("/login")
        // トースト表示
      }
    }

    // 認証している場合、直接アクセス用にステート管理
    if(id) {
      setStaff({id, name}) // ステート変更
      // /loginへのアクセス：formへリダイレクト
      if(router.pathname === "/login") {
        router.replace("/form")
        // トースト表示
      }
    }
  }, [])

  // トースト
  useEffect(() => {
    if(toastValue) {
      toast({
        position: 'top',
        title: toastValue.title,
        description: toastValue.description,
        status: toastValue.status,
        duration: 3000,
        isClosable: true,
      })
    }
  }, [toastValue])

  return (
    <GlobalState.Provider value={value}>
      <ChakraProvider>
        <Header />
        <Component {...pageProps} />
      </ChakraProvider>
    </GlobalState.Provider>
  )
}

export default MyApp
