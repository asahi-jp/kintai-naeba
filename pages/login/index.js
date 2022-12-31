import { useEffect, useState, useContext } from "react"
import { GlobalState } from "../_app";
import { useRouter } from "next/router";
import { 
  VStack,
  Heading,
  FormControl, 
  FormLabel, 
  FormErrorMessage,
  Input,
  InputGroup,
  InputRightElement,
  InputLeftElement,
  Button,
  Spinner
} from '@chakra-ui/react';
import { AtSignIcon } from "@chakra-ui/icons";
import { AiOutlineUser } from "react-icons/ai";
import { useForm } from "react-hook-form";

// モック
// import { getAuthDataMock } from "../../libs/getMocks"
// let postData = getAuthDataMock()

export default function Index() {
  const { setStaff, setToastValue } = useContext(GlobalState)
  const router = useRouter();
  const [show, setShow] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const {
    handleSubmit,
    register,
    reset,
    formState: {errors}
  } = useForm()

  // パスワード表示切替
  const handleClick = () => setShow(!show)

  // 送信ボタンクリック時
  const onSubmit = handleSubmit(async (data) => {
    // ローディング表示
    setIsLoading(true)

    let result = await pushData(data)

    setIsLoading(false)

    // セッションを追加してリダイレクト
    if(result.status === "ok") {
      sessionStorage.setItem("id", result.data.id)
      sessionStorage.setItem("name", result.data.name)
      setStaff({
        id: result.data.id,
        name: result.data.name,
      })
      setToastValue({
        title: "ログインが完了しました",
        description: "",
        status: "success"
      })
      router.replace('/form')
    }

    // エラーメッセージの表示
    if(result.status === "error") {
      setToastValue({
        title: "ログインに失敗しました",
        description: result.data.message,
        status: "error"
      })
    }
  })

  // 認証処理
  const pushData = async (postData) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_GAS_URL}?postType=authentication`, {
      method: 'POST',
      body: JSON.stringify(postData),
    })
    const data = await res.json()
    return data
  }

  return (
    <>
      <VStack pt={10}>
        <Heading size='md' pb={10}>ログイン</Heading>
        <form onSubmit={onSubmit}>

          {/* ID */}
          <FormControl isInvalid={errors["id"]}>
            <FormLabel htmlFor="id">ID（半角数字）</FormLabel>
            <InputGroup>
              <InputLeftElement pointerEvents='none'>
                <AiOutlineUser color='gray.300' />
              </InputLeftElement>
              <Input 
                id="id"
                placeholder='IDを入力'
                fontSize='20px'
                {...register("id", {required: "IDは必須です"})}
              />
            </InputGroup>

            <FormErrorMessage>
              {errors["id"] && errors["id"].message}
            </FormErrorMessage>
          </FormControl>

          <br />

          {/* パスワード */}
          <FormControl isInvalid={errors["password"]}>
            <FormLabel htmlFor="password">パスワード</FormLabel>
            <InputGroup size='md'>
              <Input
                id="password" 
                pr='4.5rem'
                fontSize='20px'
                type={show ? 'text' : 'password'}
                placeholder='パスワードを入力'
                {...register("password", {required: "パスワードは必須です"})}
              />
              <InputRightElement width='4.5rem'>
                <Button h='1.75rem' size='sm' onClick={handleClick}>
                  {show ? 'Hide' : 'Show'}
                </Button>
              </InputRightElement>
            </InputGroup>
            <FormErrorMessage>
              {errors["password"] && errors["password"].message}
            </FormErrorMessage>
          </FormControl>

          <br />

          <Button 
            type="submit"
            w={"full"}
            mt={5}
            colorScheme="blue">ログイン
          </Button>

        </form>
      </VStack>

      {isLoading && (
        <>
          <div 
            className="w-screen h-screen bg-black absolute top-0 opacity-50 flex justify-center items-center"
            style={{ zIndex: "9999" }}
          >
            <Spinner
              id="spinar"
              pos="absolute"
              thickness='4px'
              speed='0.65s'
              emptyColor='gray.200'
              color='blue.500'
              size='xl'
            />
          </div>
        </>
      )}
    </>
  )
}