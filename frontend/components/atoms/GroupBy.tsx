export const groupBy = function (items, key) {
  return items.reduce(function (arr, item) {
    ;(arr[item[key]] = arr[item[key]] || []).push(item)
    return arr
  }, {})
}
