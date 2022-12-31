import { useEffect, useState, useRef, useContext } from 'react';
import { GlobalState } from '../_app';
import { 
  useMergeRefs,
  VStack, 
  Stack,
  Heading,
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
  Button
} from '@chakra-ui/react';
import { useForm, Controller } from "react-hook-form";

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
      setValue("フリースペース", `${currentText}${currentText ? "\n" : "" }修正です`)
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
      <ModalComponent 
        data={data}
        sortedData={sortedData}
        reset={reset}
      ></ModalComponent>

      <VStack pt={10} pb={40}>
        <Heading size='md' pb={10}>勤怠入力フォーム</Heading>
        <form onSubmit={onSubmit}>

          {/* 作業日 */}
          <FormControl isInvalid={errors["作業日"]}>
            <FormLabel htmlFor="作業日">作業日（必須）</FormLabel>
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
            <FormHelperText>作業を行った日を選択してください</FormHelperText>
            <FormErrorMessage>
              {errors["作業日"] && errors["作業日"].message}
            </FormErrorMessage>
          </FormControl>

          <br />

          {/* レッスン */}
          <FormControl isInvalid={errors["レッスン"]}>
            <FormLabel htmlFor="レッスン">レッスン</FormLabel>
            <Select 
              id="レッスン" 
              placeholder='選択'
              {...register("レッスン")}
            >
              {getNums("レッスン").map((num) => <option value={num} key={num}>{num}</option>)}
            </Select>
            <FormHelperText>該当する方は選択してください</FormHelperText>
            <FormErrorMessage>
              {errors["レッスン"] && errors["レッスン"].message}
            </FormErrorMessage>
          </FormControl>

          <br />

          {/* 指名 */}
          <FormControl isInvalid={errors["指名"]}>
            <FormLabel htmlFor="指名">指名</FormLabel>
            <Select 
              id="指名" 
              placeholder='選択'
              {...register("指名")}
            >
              {getNums("指名").map((num) => <option value={num} key={num}>{num}</option>)}
            </Select>
            <FormHelperText>該当する方は選択してください</FormHelperText>
            <FormErrorMessage>
              {errors["指名"] && errors["指名"].message}
            </FormErrorMessage>
          </FormControl>

          <br />

          {/* ジュニア手当 */}
          <FormControl isInvalid={errors["ジュニア手当"]}>
            <FormLabel htmlFor="ジュニア手当">ジュニア手当</FormLabel>
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
                  </Stack>
                </RadioGroup>
              )}
            />
            <FormHelperText>該当する方は選択してください</FormHelperText>
            <FormErrorMessage>
              {errors["ジュニア手当"] && errors["ジュニア手当"].message}
            </FormErrorMessage>
          </FormControl>

          <br />

          {/* 検定 */}
          <FormControl isInvalid={errors["検定"]}>
            <FormLabel htmlFor="検定">検定</FormLabel>
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
            <FormHelperText>該当する方は選択してください</FormHelperText>
            <FormErrorMessage>
              {errors["検定"] && errors["検定"].message}
            </FormErrorMessage>
          </FormControl>

          <br />

          {/* 山荘ジュニア */}
          <FormControl isInvalid={errors["山荘ジュニア"]}>
            <FormLabel htmlFor="山荘ジュニア">山荘ジュニア</FormLabel>
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
            <FormHelperText>該当する方は選択してください</FormHelperText>
            <FormErrorMessage>
              {errors["山荘ジュニア"] && errors["山荘ジュニア"].message}
            </FormErrorMessage>
          </FormControl>
          
          <br />

          {/* コース企画 */}
          <FormControl isInvalid={errors["コース企画"]}>
            <FormLabel htmlFor="コース企画">コース企画</FormLabel>
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
            <FormHelperText>該当する方は選択してください</FormHelperText>
            <FormErrorMessage>
              {errors["コース企画"] && errors["コース企画"].message}
            </FormErrorMessage>
          </FormControl>

          <br />

          {/* 団体 */}
          <FormControl isInvalid={errors["団体"]}>
            <FormLabel htmlFor="団体">団体</FormLabel>
            <Select 
              id="団体" 
              placeholder='選択'
              {...register("団体")}
            >
              {getNums("団体").map((num) => <option value={num} key={num}>{num}</option>)}
            </Select>
            <FormHelperText>該当する方は選択してください</FormHelperText>
            <FormErrorMessage>
              {errors["団体"] && errors["団体"].message}
            </FormErrorMessage>
          </FormControl>

          <br />

          {/* 作業・検定無料 */}
          <FormControl isInvalid={errors["作業・検定無料"]}>
            <FormLabel htmlFor="作業・検定無料">作業・検定無料</FormLabel>
            <Select 
              id="作業・検定無料" 
              placeholder='選択'
              {...register("作業・検定無料")}
            >
              {getNums("作業・検定無料").map((num) => <option value={num} key={num}>{num}</option>)}
            </Select>
            <FormHelperText>該当する方は選択してください</FormHelperText>
            <FormErrorMessage>
              {errors["作業・検定無料"] && errors["作業・検定無料"].message}
            </FormErrorMessage>
          </FormControl>

          <br />

          {/* 受付 */}
          <FormControl isInvalid={errors["受付"]}>
            <FormLabel htmlFor="受付">受付</FormLabel>
            <Select 
              id="受付" 
              placeholder='選択'
              {...register("受付")}
            >
              {getNums("受付").map((num) => <option value={num} key={num}>{num}</option>)}
            </Select>
            <FormHelperText>該当する方は選択してください</FormHelperText>
            <FormErrorMessage>
              {errors["受付"] && errors["受付"].message}
            </FormErrorMessage>
          </FormControl>

          <br />

          {/* 食券（朝） */}
          <FormControl isInvalid={errors["食券（朝）"]}>
            <FormLabel htmlFor="食券（朝）">食券（朝）</FormLabel>
            <NumberInput>
              <NumberInputField 
                id="食券（朝）" 
                placeholder='入力'
                fontSize='20px'
                {...register("食券（朝）", { min: { value: 1, message: "0の場合は入力不要です" } })} />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
            <FormHelperText>該当する方は枚数を入力してください</FormHelperText>
            <FormErrorMessage>
              {errors["食券（朝）"] && errors["食券（朝）"].message}
            </FormErrorMessage>
          </FormControl>

          <br />

          {/* 食券（昼・夜） */}
          <FormControl isInvalid={errors["食券（昼・夜）"]}>
            <FormLabel htmlFor="食券（昼・夜）">食券（昼・夜）</FormLabel>
            <NumberInput>
              <NumberInputField 
                id="食券（昼・夜）" 
                placeholder='入力'
                fontSize='20px'
                {...register("食券（昼・夜）", { min: { value: 1, message: "0の場合は入力不要です" } })} />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
            <FormHelperText>該当する方は枚数を入力してください</FormHelperText>
            <FormErrorMessage>
              {errors["食券（昼・夜）"] && errors["食券（昼・夜）"].message}
            </FormErrorMessage>
          </FormControl>

          <br />

          <FormControl>
            <FormLabel htmlFor="フリースペース" mb="0">
              フリースペース
            </FormLabel>
            <Textarea 
              id="フリースペース" 
              placeholder="入力"
              fontSize='20px'
              {...register("フリースペース")}
            />
            <FormHelperText>連絡事項を入力してください</FormHelperText>
          </FormControl>

          <br />

          <FormControl display="flex" alignItems="center">
            <Switch 
              id="revise" 
              mr="1" 
              checked={isChecked} 
              onChange={handleRevise} />
            <FormLabel htmlFor="revise" mb="0">
              修正の場合はクリックしてください
            </FormLabel>
          </FormControl>

          <br />

          <Button 
            type="submit"
            w={"full"}
            mt={5}
            colorScheme="blue">確認
          </Button>

        </form>
      </VStack>
    </>
  )
}