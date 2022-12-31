import { useContext, useState, useRef } from "react"
import { GlobalState } from "../pages/_app"
import { 
  Button, 
  ModalCloseButton,
  ModalFooter, 
  Modal, 
  ModalBody, 
  ModalHeader,
  ModalOverlay, 
  ModalContent,
  Spinner,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
} from "@chakra-ui/react"

import getTodayString from "../libs/getTodayString"

export default function ModalComponent({data , sortedData, reset}) {
  const { staff, setToastValue, isOpen, onClose } = useContext(GlobalState)
  const [isLoading, setIsLoading] = useState(false)
  const spinar = useRef()
  

  // API RoutesへPOSTリクエスト
  const pushData = async (data) => {
    const res = await fetch("api/works", {
      method: 'POST',
      body: JSON.stringify(data),
    })
    const responseData = await res.json()
    return responseData
  }

  // 送信処理
  const handleSubmit = async() => {
    let postData = {...data, "スタッフID": staff.id}

    setIsLoading(true)
    // スピナーの真ん中表示処理
    setTimeout(() => {
      console.log(spinar)
      // スピナーの位置： 現在の位置（上） + 画面の半分 - 要素の半分
      let heightPosition = window.scrollY + (window.innerHeight / 2) - (spinar.current.clientHeight / 2)
      spinar.current.style.top = `${heightPosition}px`
    })

    const result = await pushData(postData)

    setIsLoading(false)
    onClose()
    reset()

    setToastValue({
      title: "勤怠が送信されました",
      description: "",
      status: "success"
    })

  }

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>確認</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <TableContainer>
              <Table variant='simple'>
                <Thead>
                  <Tr>
                    <Th>項目</Th>
                    <Th isNumeric>内容</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {sortedData.length && sortedData.map((arr) => (
                    <Tr key={arr[0]}>
                      <Td>{arr[0]}</Td>
                      <Td isNumeric>{arr[1]}</Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
            </TableContainer>
          </ModalBody>
          <ModalFooter>
            <Button variant='ghost' mr={3} onClick={onClose}>
              戻る
            </Button>
            <Button colorScheme='blue' onClick={handleSubmit}>
              送信
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {isLoading && (
        <>
          <div 
            className="w-full h-full bg-black absolute top-0 opacity-50 flex justify-center items-center"
            style={{ zIndex: "9999" }}
          >
            <Spinner
              ref={spinar}
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