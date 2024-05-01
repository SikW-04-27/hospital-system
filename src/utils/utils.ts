export function formatDate(isoDateString: string) {
  const date = new Date(isoDateString)
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0') // 月份是从0开始的，所以需要+1，并使用padStart来确保总是两位数
  const day = String(date.getDate()).padStart(2, '0') // 使用padStart来确保总是两位数
  return `${year}-${month}-${day}`
}
