import dayjs from 'dayjs'

type formatType = 'YYYY-MM-DD' | 'YYYY-MM-DD HH:mm:ss' | 'YYYY-MM-DD HH:mm'

export function formatDate(date: string, formatStr: formatType = 'YYYY-MM-DD') {
  return dayjs(date).format(formatStr)
}
