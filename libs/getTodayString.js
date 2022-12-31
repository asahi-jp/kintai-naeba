// 今日をフォーマットして文字列で返す
export default function getTodayString() {
  let today = new Date()
  let year = today.getFullYear()
  let month = today.getMonth() + 1
  let date = today.getDate()
  return year + '-' + month + '-' + date
}