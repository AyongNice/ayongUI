/* eslint-disable camelcase */
/* eslint-disable no-unused-vars */

// 获取该月的天数
export const getDaysInMonth = (year, month) => {
  const day = new Date(year, month + 1, 0)
  return day.getDate()
}

// 创建日期 yyyy-MM-dd 格式， 用于创建非当前月的日期
export const handleCrateDate = (year, month, start, end, type) => {
  const arr = []
  if (type === 'prev') { // 上一月
    if (start === end) return []
    const daysInLastMonth = getDaysInMonth(year, month - 1) // 获取上一个月有多少天
    console.log(`当前月是${month + 1}月, 上一月${month}月的天数是${daysInLastMonth}天`)
    for (let i = daysInLastMonth - end + 2; i <= daysInLastMonth; i++) {
      arr.push({
        // date: `${month === 0 ? year - 1 : year}-${(month + 1) < 10 ? month === 0 ? 12 : `0${month}` : month}-${i < 10 ? `0${i}` : i}`,
        date: parseTime(new Date(year, month - 1, i)),
        isCurMonth: false,
        isSelected: false,
        isRangeSelected: false
      })
    }
  } else if (type === 'rear') { // 下一月
    for (let i = start; i <= end; i++) {
      arr.push({
        // date: `${month === 11 ? year + 1 : year}-${(month + 1) < 9 ? `0${month + 2}` : month + 2 <= 12 ? month + 2 : (month + 2) % 12 < 10 ? `0${(month + 2) % 12}` : (month + 2) % 12}-${i < 10 ? `0${i}` : i}`,
        date: parseTime(new Date(year, month + 1, i)),
        isCurMonth: false,
        isSelected: false,
        isRangeSelected: false
      })
    }
  } else { // 本月
    for (let i = start; i <= end; i++) {
      arr.push({
        // date: `${year}-${(month + 1) < 10 ? `0${month + 1}` : month + 1}-${i < 10 ? `0${i}` : i}`,
        date: parseTime(new Date(year, month, i)),
        isCurMonth: true,
        isSelected: false,
        isRangeSelected: false
      })
    }
  }
  // console.log(arr)
  return arr
}

export const handleCreateDatePicker = () => {
  const years = []
  const months = []
  for (let i = 1970; i <= 2099; i++) {
    years.push({
      label: `${i}年`,
      value: i
    })
  }
  for (let i = 0; i <= 11; i++) {
    months.push({
      label: `${i + 1}月`,
      value: i + 1
    })
  }
  return {
    years,
    months
  }
}

/**
 * Parse the time to string
 * @param {(Object|string|number)} time
 * @param {string} cFormat
 * @returns {string | null}
 */
export function parseTime(time, cFormat) {
  if (arguments.length === 0 || !time) {
    return null
  }
  const format = cFormat || '{y}-{m}-{d}'
  let date
  if (typeof time === 'object') {
    date = time
  } else {
    if ((typeof time === 'string')) {
      if ((/^[0-9]+$/.test(time))) {
        // support "1548221490638"
        time = parseInt(time)
      } else {
        // support safari
        // https://stackoverflow.com/questions/4310953/invalid-date-in-safari
        time = time.replace(new RegExp(/-/gm), '/')
      }
    }

    if ((typeof time === 'number') && (time.toString().length === 10)) {
      time = time * 1000
    }
    date = new Date(time)
  }
  const formatObj = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay()
  }
  const time_str = format.replace(/{([ymdhisa])+}/g, (result, key) => {
    const value = formatObj[key]
    // Note: getDay() returns 0 on Sunday
    if (key === 'a') {
      return ['日', '一', '二', '三', '四', '五', '六'][value]
    }
    return value.toString().padStart(2, '0')
  })
  return time_str
}
