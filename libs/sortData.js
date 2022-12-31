export default function sortData(data, keys) {
  let newData = []
  keys.forEach((key) => {
    newData.push([key, data[key]])
  })
  return newData
}

