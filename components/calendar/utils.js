/* eslint-disable camelcase */
/* eslint-disable no-unused-vars */

// 获取该月的天数
export const getDaysInMonth = (year, month) => {
  const day = new Date(year, month + 1, 0)
  return day.getDate()
}

function isToday(dateStr) {
  // 将日期字符串转换为日期对象
  var inputDate = new Date(dateStr);

  // 获取当前日期
  var currentDate = new Date();

  // 将日期部分设置为相同，以便比较
  inputDate.setHours(0, 0, 0, 0);
  currentDate.setHours(0, 0, 0, 0);
  // 检查是否是当天
  return inputDate.getTime() === currentDate.getTime();
}

// 创建日期 yyyy-MM-dd 格式， 用于创建非当前月的日期
export const handleCrateDate = ({year, month, start, end, type, cFormat}) => {
  const arr = []
  if (type === 'prev') { // 上一月
    if (start === end) return []
    const daysInLastMonth = getDaysInMonth(year, month - 1) // 获取上一个月有多少天
    for (let i = daysInLastMonth - end + 2; i <= daysInLastMonth; i++) {// 上一月
      arr.push({
        // date: `${month === 0 ? year - 1 : year}-${(month + 1) < 10 ? month === 0 ? 12 : `0${month}` : month}-${i < 10 ? `0${i}` : i}`,
        date: parseTime(new Date(year, month - 1, i), cFormat),
        comprehensive: new Date(year, month - 1, i),
        comprehensiveStr: parseTime(new Date(year, month - 1, i), '{y}-{m}-{d}'),
        monthSortMode: 1,
        isSelected: false,
        isRangeSelected: false,
        isToday: isToday(new Date(year, month - 1, i))
      })
    }
  } else if (type === 'rear') { // 下一月
    for (let i = start; i <= end; i++) {
      arr.push({
        // date: `${month === 11 ? year + 1 : year}-${(month + 1) < 9 ? `0${month + 2}` : month + 2 <= 12 ? month + 2 : (month + 2) % 12 < 10 ? `0${(month + 2) % 12}` : (month + 2) % 12}-${i < 10 ? `0${i}` : i}`,
        date: parseTime(new Date(year, month + 1, i), cFormat),
        comprehensive: new Date(year, month + 1, i),
        comprehensiveStr: parseTime(new Date(year, month + 1, i), '{y}-{m}-{d}'),
        monthSortMode:2,
        isSelected: false,
        isRangeSelected: false,
        isToday: isToday(new Date(year, month + 1, i))
      })
    }
  } else { // 本月
    for (let i = start; i <= end; i++) {
      arr.push({
        // date: `${year}-${(month + 1) < 10 ? `0${month + 1}` : month + 1}-${i < 10 ? `0${i}` : i}`,
        date: parseTime(new Date(year, month, i), cFormat),
        comprehensive: new Date(year, month, i),
        comprehensiveStr: parseTime(new Date(year, month, i), '{y}-{m}-{d}'),
        monthSortMode:0,
        isSelected: false,
        isRangeSelected: false,
        isToday: isToday(new Date(year, month, i))
      })
    }
  }
  // console.log(arr)
  return arr
}

export const handleCreateDatePicker = (yearsRange = [1970, 2099]) => {
  const years = []
  const months = []
  for (let i = yearsRange[0]; i <= yearsRange[1]; i++) {
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
  const format = cFormat || '{y}-{m}-{d}';

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
export function isValidDate(dateString) {
  // 尝试创建一个 Date 对象
  const dateObject = new Date(dateString);

  // 检查创建的对象是否是有效日期对象，并且输入的字符串在转换后是否仍然相同
  return (
    Object.prototype.toString.call(dateObject) === "[object Date]" &&
    !isNaN(dateObject.getTime()) &&
    dateString === dateObject.toISOString().split("T")[0]
  );
}
