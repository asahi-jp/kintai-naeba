// 日付のリストを返す関数
export default function getDateList() {
  const today = new Date()
  const closingDate = 3 // 締め日：　月初め3日

  const month = today.getDate() <= closingDate
    ? today.getMonth() - 1
    : today.getMonth()

  const startDate = new Date(today.getFullYear(), month, 1);
  const endDate = new Date(today.getFullYear(), today.getMonth() + 1, 0);
  
  const dateList = []
  for(let d = startDate; d <= endDate; d.setDate(d.getDate() + 1)) {
    let formatedDate = d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate()
    dateList.push(formatedDate);
  }

  return dateList
}