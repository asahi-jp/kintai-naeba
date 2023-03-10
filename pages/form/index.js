import Head from 'next/head';
import { useEffect, useState, useRef, useContext } from 'react';
import { GlobalState } from '../_app';
import { 
  useMergeRefs,
  VStack, 
  Stack,
  Container,
  Box,
  Heading,
  Text,
  Tooltip,
  FormControl, 
  FormLabel, 
  FormHelperText,
  FormErrorMessage,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Select,
  RadioGroup,
  Radio,
  Switch,
  Textarea,
  Button,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverBody
} from '@chakra-ui/react';
import { useForm, Controller } from "react-hook-form";
import { AiOutlineQuestionCircle } from "react-icons/ai";
import { QuestionOutlineIcon } from '@chakra-ui/icons';

// components
import ModalComponent from '../../components/Modal';

// バリデーション
// import { validateName } from "../../libs/validates"; 

// 数値範囲取得
import getNums from '../../libs/getNums';

// 日付取得
import getDateList from '../../libs/getDateList' 
import getTodayString from '../../libs/getTodayString';

// ソート
import getKeys from '../../libs/getKeys';
import sortData from '../../libs/sortData';

export default function Form() {
  const [isChecked, setIsChecked] = useState(false)
  const [dateList, setDateList] = useState([])
  const internalRef = useRef(null)
  const selectElement = useMergeRefs(internalRef)
  const { onOpen } = useContext(GlobalState)
  const [data, setData] = useState({})
  const [sortedData, setSortedData] = useState([])

  const {
    handleSubmit,
    register,
    reset,
    control,
    setValue,
    getValues,
    formState: {errors}
  } = useForm()

  // 作業日のoptionsをセット
  useEffect(() => {
    let dateList = getDateList()
    setDateList(dateList)
  }, [])

  // 作業日のデフォルトバリューをセット
  useEffect(() => {
    let today = getTodayString()
    setValue("作業日", today)
  }, [dateList])

  // チェックが入ったらテキストをセットする
  const handleRevise = () => {
    let currentText = getValues("フリースペース")
    if(!isChecked) {
      setValue("フリースペース", `${currentText}${currentText ? "\n" : "" }訂正分です`)
    }
    setIsChecked(!isChecked)
  }

  // 確認ボタンクリック時
  const onSubmit = handleSubmit(async (data) => {
    setSortedData(sortData(data, getKeys())) // 表示用のソート
    setData(data)
    onOpen()
  })

  return (
    <>
      <Head>
        <title>苗場勤怠管理フォーム</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1.0" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ModalComponent 
        data={data}
        sortedData={sortedData}
        reset={reset}
      ></ModalComponent>
      <Container pt={10} pb={56} px="10">
        <Heading size='md' textAlign="center" pb="10">勤怠入力フォーム</Heading>
        <form onSubmit={onSubmit} className="flex flex-col gap-12">

          {/* 作業日 */}
          <FormControl isInvalid={errors["作業日"]}>
            <Box display="flex" alignItems="center" gap="1">
              <FormLabel htmlFor="作業日" fontWeight="bold" color="gray.600" m="0" display="flex" gap="1">
                作業日<Text fontSize="sm" color="red.400">*</Text>
              </FormLabel>
              <Popover placement='right-start'>
                <PopoverTrigger>
                  <Button p="0" bg="white" _hover={{ bg: "whtie" }} _focus={{ bg: "whtie" }} _active={{ bg: "whtie" }}>
                    <QuestionOutlineIcon />
                  </Button>
                </PopoverTrigger>
                <PopoverContent width="auto" bg="gray.700" borderRadius="0" border="none" boxShadow="none">
                  <PopoverBody p="1" color="gray.100" fontSize="sm">作業を行った日を選択してください</PopoverBody>
                </PopoverContent>
              </Popover>
            </Box>
            <Select 
              id="作業日" 
              ref={selectElement}
              placeholder='選択'
              {...register("作業日", {required: "作業日は必須です"})}
            >
              {dateList.length && dateList.map((date) => {
                return <option value={date} key={date}>{date}</option>
              })}
            </Select>
            <FormErrorMessage>
              {errors["作業日"] && errors["作業日"].message}
            </FormErrorMessage>
          </FormControl>

          {/* レッスン */}
          <FormControl isInvalid={errors["レッスン"]}>
            <Box display="flex" alignItems="center" gap="1" pb="1">
              <FormLabel htmlFor="レッスン" m="0" fontWeight="bold" color="gray.600">レッスン</FormLabel>
              <Popover placement='right-start'>
                <PopoverTrigger>
                  <Button p="0" bg="white" _hover={{ bg: "whtie" }} _focus={{ bg: "whtie" }} _active={{ bg: "whtie" }}>
                    <QuestionOutlineIcon />
                  </Button>
                </PopoverTrigger>
                <PopoverContent width="auto" bg="gray.700" borderRadius="0" border="none" boxShadow="none">
                  <PopoverBody p="1" color="gray.100" fontSize="sm">該当する方は選択してください</PopoverBody>
                </PopoverContent>
              </Popover>
            </Box>
            <Select 
              id="レッスン" 
              placeholder='選択'
              {...register("レッスン")}
            >
              {getNums("レッスン").map((num) => <option value={num} key={num}>{num}</option>)}
            </Select>
            <FormErrorMessage>
              {errors["レッスン"] && errors["レッスン"].message}
            </FormErrorMessage>
          </FormControl>

          {/* 指名 */}
          <FormControl isInvalid={errors["指名"]}>
            <Box display="flex" alignItems="center" gap="1" pb="1">
              <FormLabel htmlFor="指名" m="0" fontWeight="bold" color="gray.600">指名</FormLabel>
              <Popover placement='right-start'>
                <PopoverTrigger>
                  <Button p="0" bg="white" _hover={{ bg: "whtie" }} _focus={{ bg: "whtie" }} _active={{ bg: "whtie" }}>
                    <QuestionOutlineIcon />
                  </Button>
                </PopoverTrigger>
                <PopoverContent width="auto" bg="gray.700" borderRadius="0" border="none" boxShadow="none">
                  <PopoverBody p="1" color="gray.100" fontSize="sm">該当する方は選択してください</PopoverBody>
                </PopoverContent>
              </Popover>
            </Box>
            <Select 
              id="指名" 
              placeholder='選択'
              {...register("指名")}
            >
              {getNums("指名").map((num) => <option value={num} key={num}>{num}</option>)}
            </Select>
            <FormErrorMessage>
              {errors["指名"] && errors["指名"].message}
            </FormErrorMessage>
          </FormControl>

          {/* ジュニア手当 */}
          <FormControl isInvalid={errors["ジュニア手当"]}>
            <Box display="flex" alignItems="center" gap="1" pb="1">
              <FormLabel htmlFor="ジュニア手当" m="0" fontWeight="bold" color="gray.600">ジュニア手当</FormLabel>
              <Popover placement='right-start'>
                <PopoverTrigger>
                  <Button p="0" bg="white" _hover={{ bg: "whtie" }} _focus={{ bg: "whtie" }} _active={{ bg: "whtie" }}>
                    <QuestionOutlineIcon />
                  </Button>
                </PopoverTrigger>
                <PopoverContent width="auto" bg="gray.700" borderRadius="0" border="none" boxShadow="none">
                  <PopoverBody p="1" color="gray.100" fontSize="sm">該当する方は選択してください</PopoverBody>
                </PopoverContent>
              </Popover>
            </Box>
            <Controller 
              name="ジュニア手当"
              control={control}
              defaultValue=''
              // rules={{ required: "This is required" }}
              render={({ field }) => (
                <RadioGroup value={field.value}>
                  <Stack>
                    <Radio {...field} value=''>0</Radio>
                    <Radio {...field} value='0.5'>0.5</Radio>
                    <Radio {...field} value='1'>1</Radio>
                    <Radio {...field} value='1.5'>1.5</Radio>
                    <Radio {...field} value='2'>2</Radio>
                  </Stack>
                </RadioGroup>
              )}
            />
            <FormErrorMessage>
              {errors["ジュニア手当"] && errors["ジュニア手当"].message}
            </FormErrorMessage>
          </FormControl>

          {/* 検定 */}
          <FormControl isInvalid={errors["検定"]}>
            <Box display="flex" alignItems="center" gap="1" pb="1">
              <FormLabel htmlFor="検定" m="0" fontWeight="bold" color="gray.600">検定</FormLabel>
              <Popover placement='right-start'>
                <PopoverTrigger>
                  <Button p="0" bg="white" _hover={{ bg: "whtie" }} _focus={{ bg: "whtie" }} _active={{ bg: "whtie" }}>
                    <QuestionOutlineIcon />
                  </Button>
                </PopoverTrigger>
                <PopoverContent width="auto" bg="gray.700" borderRadius="0" border="none" boxShadow="none">
                  <PopoverBody p="1" color="gray.100" fontSize="sm">該当する方は選択してください</PopoverBody>
                </PopoverContent>
              </Popover>
            </Box>
            <Controller 
              name="検定"
              control={control}
              defaultValue=''
              // rules={{ required: "This is required" }}
              render={({ field }) => (
                <RadioGroup value={field.value}>
                  <Stack>
                    <Radio {...field} value=''>0</Radio>
                    <Radio {...field} value='1'>1</Radio>
                  </Stack>
                </RadioGroup>
              )}
            />
            <FormErrorMessage>
              {errors["検定"] && errors["検定"].message}
            </FormErrorMessage>
          </FormControl>

          {/* 山荘ジュニア */}
          <FormControl isInvalid={errors["山荘ジュニア"]}>
            <Box display="flex" alignItems="center" gap="1" pb="1">
              <FormLabel htmlFor="山荘ジュニア" m="0" fontWeight="bold" color="gray.600">山荘ジュニア</FormLabel>
              <Popover placement='right-start'>
                <PopoverTrigger>
                  <Button p="0" bg="white" _hover={{ bg: "whtie" }} _focus={{ bg: "whtie" }} _active={{ bg: "whtie" }}>
                    <QuestionOutlineIcon />
                  </Button>
                </PopoverTrigger>
                <PopoverContent width="auto" bg="gray.700" borderRadius="0" border="none" boxShadow="none">
                  <PopoverBody p="1" color="gray.100" fontSize="sm">該当する方は選択してください</PopoverBody>
                </PopoverContent>
              </Popover>
            </Box>
            <Controller 
              name="山荘ジュニア"
              control={control}
              defaultValue=''
              // rules={{ required: "This is required" }}
              render={({ field }) => (
                <RadioGroup value={field.value}>
                  <Stack>
                    <Radio {...field} value=''>0</Radio>
                    <Radio {...field} value='0.5'>0.5</Radio>
                    <Radio {...field} value='1'>1</Radio>
                  </Stack>
                </RadioGroup>
              )}
            />
            <FormErrorMessage>
              {errors["山荘ジュニア"] && errors["山荘ジュニア"].message}
            </FormErrorMessage>
          </FormControl>

          {/* コース企画 */}
          <FormControl isInvalid={errors["コース企画"]}>
            <Box display="flex" alignItems="center" gap="1" pb="1">
              <FormLabel htmlFor="コース企画" m="0" fontWeight="bold" color="gray.600">コース企画</FormLabel>
              <Popover placement='right-start'>
                <PopoverTrigger>
                  <Button p="0" bg="white" _hover={{ bg: "whtie" }} _focus={{ bg: "whtie" }} _active={{ bg: "whtie" }}>
                    <QuestionOutlineIcon />
                  </Button>
                </PopoverTrigger>
                <PopoverContent width="auto" bg="gray.700" borderRadius="0" border="none" boxShadow="none">
                  <PopoverBody p="1" color="gray.100" fontSize="sm">該当する方は選択してください</PopoverBody>
                </PopoverContent>
              </Popover>
            </Box>
            <Controller 
              name="コース企画"
              control={control}
              defaultValue=''
              // rules={{ required: "This is required" }}
              render={({ field }) => (
                <RadioGroup value={field.value}>
                  <Stack>
                    <Radio {...field} value=''>0</Radio>
                    <Radio {...field} value='0.5'>0.5</Radio>
                    <Radio {...field} value='1'>1</Radio>
                  </Stack>
                </RadioGroup>
              )}
            />
            <FormErrorMessage>
              {errors["コース企画"] && errors["コース企画"].message}
            </FormErrorMessage>
          </FormControl>

          {/* 団体 */}
          <FormControl isInvalid={errors["団体"]}>
            <Box display="flex" alignItems="center" gap="1" pb="1">
              <FormLabel htmlFor="団体" m="0" fontWeight="bold" color="gray.600">団体</FormLabel>
              <Popover placement='right-start'>
                <PopoverTrigger>
                  <Button p="0" bg="white" _hover={{ bg: "whtie" }} _focus={{ bg: "whtie" }} _active={{ bg: "whtie" }}>
                    <QuestionOutlineIcon />
                  </Button>
                </PopoverTrigger>
                <PopoverContent width="auto" bg="gray.700" borderRadius="0" border="none" boxShadow="none">
                  <PopoverBody p="1" color="gray.100" fontSize="sm">該当する方は選択してください</PopoverBody>
                </PopoverContent>
              </Popover>
            </Box>
            <Select 
              id="団体" 
              placeholder='選択'
              {...register("団体")}
            >
              {getNums("団体").map((num) => <option value={num} key={num}>{num}</option>)}
            </Select>
            <FormErrorMessage>
              {errors["団体"] && errors["団体"].message}
            </FormErrorMessage>
          </FormControl>

          {/* 作業・検定無料 */}
          <FormControl isInvalid={errors["作業・検定無料"]}>
            <Box display="flex" alignItems="center" gap="1" pb="1">
              <FormLabel htmlFor="作業・検定無料" m="0" fontWeight="bold" color="gray.600">作業・検定無料</FormLabel>
              <Popover placement='right-start'>
                <PopoverTrigger>
                  <Button p="0" bg="white" _hover={{ bg: "whtie" }} _focus={{ bg: "whtie" }} _active={{ bg: "whtie" }}>
                    <QuestionOutlineIcon />
                  </Button>
                </PopoverTrigger>
                <PopoverContent width="auto" bg="gray.700" borderRadius="0" border="none" boxShadow="none">
                  <PopoverBody p="1" color="gray.100" fontSize="sm">該当する方は選択してください</PopoverBody>
                </PopoverContent>
              </Popover>
            </Box>
            <Select 
              id="作業・検定無料" 
              placeholder='選択'
              {...register("作業・検定無料")}
            >
              {getNums("作業・検定無料").map((num) => <option value={num} key={num}>{num}</option>)}
            </Select>
            <FormErrorMessage>
              {errors["作業・検定無料"] && errors["作業・検定無料"].message}
            </FormErrorMessage>
          </FormControl>

          {/* 受付 */}
          <FormControl isInvalid={errors["受付"]}>
            <Box display="flex" alignItems="center" gap="1" pb="1">
              <FormLabel htmlFor="受付" m="0" fontWeight="bold" color="gray.600">受付</FormLabel>
              <Popover placement='right-start'>
                <PopoverTrigger>
                  <Button p="0" bg="white" _hover={{ bg: "whtie" }} _focus={{ bg: "whtie" }} _active={{ bg: "whtie" }}>
                    <QuestionOutlineIcon />
                  </Button>
                </PopoverTrigger>
                <PopoverContent width="auto" bg="gray.700" borderRadius="0" border="none" boxShadow="none">
                  <PopoverBody p="1" color="gray.100" fontSize="sm">該当する方は選択してください</PopoverBody>
                </PopoverContent>
              </Popover>
            </Box>
            <Select 
              id="受付" 
              placeholder='選択'
              {...register("受付")}
            >
              {getNums("受付").map((num) => <option value={num} key={num}>{num}</option>)}
            </Select>
            <FormErrorMessage>
              {errors["受付"] && errors["受付"].message}
            </FormErrorMessage>
          </FormControl>

          {/* 食券（朝） */}
          <FormControl isInvalid={errors["食券（朝）"]}>
            <Box display="flex" alignItems="center" gap="1" pb="1">
              <FormLabel htmlFor="食券（朝）" m="0" fontWeight="bold" color="gray.600">食券（朝）</FormLabel>
              <Popover placement='right-start'>
                <PopoverTrigger>
                  <Button p="0" bg="white" _hover={{ bg: "whtie" }} _focus={{ bg: "whtie" }} _active={{ bg: "whtie" }}>
                    <QuestionOutlineIcon />
                  </Button>
                </PopoverTrigger>
                <PopoverContent width="auto" bg="gray.700" borderRadius="0" border="none" boxShadow="none">
                  <PopoverBody p="1" color="gray.100" fontSize="sm">該当する方は枚数を入力してください</PopoverBody>
                </PopoverContent>
              </Popover>
            </Box>
            <NumberInput>
              <NumberInputField 
                id="食券（朝）" 
                placeholder='入力'
                {...register("食券（朝）", { min: { value: 1, message: "0の場合は入力不要です" } })} />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
            <FormErrorMessage>
              {errors["食券（朝）"] && errors["食券（朝）"].message}
            </FormErrorMessage>
          </FormControl>

          {/* 食券（昼・夜） */}
          <FormControl isInvalid={errors["食券（昼・夜）"]}>
            <Box display="flex" alignItems="center" gap="1" pb="1">
              <FormLabel htmlFor="食券（昼・夜）" m="0" fontWeight="bold" color="gray.600">食券（昼・夜）</FormLabel>
              <Popover placement='right-start'>
                <PopoverTrigger>
                  <Button p="0" bg="white" _hover={{ bg: "whtie" }} _focus={{ bg: "whtie" }} _active={{ bg: "whtie" }}>
                    <QuestionOutlineIcon />
                  </Button>
                </PopoverTrigger>
                <PopoverContent width="auto" bg="gray.700" borderRadius="0" border="none" boxShadow="none">
                  <PopoverBody p="1" color="gray.100" fontSize="sm">該当する方は枚数を入力してください</PopoverBody>
                </PopoverContent>
              </Popover>
            </Box>
            <NumberInput>
              <NumberInputField 
                id="食券（昼・夜）" 
                placeholder='入力'
                {...register("食券（昼・夜）", { min: { value: 1, message: "0の場合は入力不要です" } })} />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
            <FormErrorMessage>
              {errors["食券（昼・夜）"] && errors["食券（昼・夜）"].message}
            </FormErrorMessage>
          </FormControl>

          <FormControl>
            <Box display="flex" alignItems="center" gap="1" pb="1">
              <FormLabel htmlFor="食券（昼・夜）" m="0" fontWeight="bold" color="gray.600">フリースペース</FormLabel>
              <Popover placement='right-start'>
                <PopoverTrigger>
                  <Button p="0" bg="white" _hover={{ bg: "whtie" }} _focus={{ bg: "whtie" }} _active={{ bg: "whtie" }}>
                    <QuestionOutlineIcon />
                  </Button>
                </PopoverTrigger>
                <PopoverContent width="auto" bg="gray.700" borderRadius="0" border="none" boxShadow="none">
                  <PopoverBody p="1" color="gray.100" fontSize="sm">連絡事項を入力してください</PopoverBody>
                </PopoverContent>
              </Popover>
            </Box>
            <Textarea 
              id="フリースペース" 
              placeholder="入力"
              {...register("フリースペース")}
            />
          </FormControl>

          <FormControl display="flex" alignItems="center" gap="1">
            <Switch 
              id="revise" 
              mr="1" 
              checked={isChecked} 
              onChange={handleRevise} 
            />
            <FormLabel htmlFor="revise" m="0" fontWeight="bold" color="gray.600">訂正分の送信</FormLabel>
            <Popover placement='right-start'>
              <PopoverTrigger>
                <Button p="0" bg="white" _hover={{ bg: "whtie" }} _focus={{ bg: "whtie" }} _active={{ bg: "whtie" }}>
                  <QuestionOutlineIcon />
                </Button>
              </PopoverTrigger>
              <PopoverContent width="auto" bg="gray.700" borderRadius="0" border="none" boxShadow="none">
                <PopoverBody p="1" color="gray.100" fontSize="sm">フリースペースに訂正用コメントが入ります</PopoverBody>
              </PopoverContent>
            </Popover>
          </FormControl>

          <Button 
            type="submit"
            w={"full"}
            mt={5}
            colorScheme="blue">確認
          </Button>

        </form>
      </Container>
    </>
  )
}