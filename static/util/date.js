const dateUtil = {
  /**
   * 获取某个月的总天数
   * 
   */
  getDaysOfMonth: (year, month) => {
    return new Date(year, month, 0).getDate();
  },
  /**
   * 将时间戳格式化
   * @param number timestamp  eg:1465963958000 length:13
   * @param string Fmt  eg:Y-m-d H:i:s
   * @param boolean hasZero  eg:true|false
   * @returns {string}
   */
  timeFormat: (timestamp, Fmt, hasZero) => {
    var date = (typeof timestamp != 'undefined' && timestamp != '') ? new Date(timestamp.toString().length == 10 ?
      Number(timestamp + '000') : timestamp) : new Date()
    hasZero = (typeof hasZero === 'boolean') ? hasZero : true
    var Y = date.getFullYear()
    var m = (hasZero && date.getMonth() + 1 < 10) ? '0' + (date.getMonth() + 1) : date.getMonth() + 1
    var d = (hasZero && date.getDate() < 10) ? '0' + date.getDate() : date.getDate()
    var H = (hasZero && date.getHours() < 10) ? '0' + date.getHours() : date.getHours()
    var i = (hasZero && date.getMinutes() < 10) ? '0' + date.getMinutes() : date.getMinutes()
    var s = (hasZero && date.getSeconds() < 10) ? '0' + date.getSeconds() : date.getSeconds()
    var formatTime = ''
    switch (Fmt) {
      case 'YmdHis':
        formatTime = Y + m + d + H + i + s
        break
      case 'Y-m-d H:i:s':
        formatTime = Y + '-' + m + '-' + d + ' ' + H + ':' + i + ':' + s
        break
      case 'Y/m/d H:i:s':
        formatTime = Y + '/' + m + '/' + d + ' ' + H + ':' + i + ':' + s
        break
      case 'Y-m-d H:i':
        formatTime = Y + '-' + m + '-' + d + ' ' + H + ':' + i
        break
      case 'Y-m-d H':
        formatTime = Y + '-' + m + '-' + d + ' ' + H
        break
      case 'Y-m-d':
        formatTime = Y + '-' + m + '-' + d
        break
      case 'Ymd':
        formatTime = Y + m + d
        break
      case 'H:i:s':
        formatTime = H + ':' + i + ':' + s
        break
      default:
        formatTime = Y + '-' + m + '-' + d + ' ' + H + ':' + i + ':' + s
        break
    }
    return formatTime
  },
  /**
   * 时间字符串转时间戳
   * @param string dateStr  eg:2016-06-16 16:15:59
   * @returns {number}
   */
  dateStr2timestamp: (dateStr) => {
    return (typeof dateStr === 'string') ? Date.parse(new Date(dateStr)) : Date.parse(new Date())
  }

}

export default dateUtil;
