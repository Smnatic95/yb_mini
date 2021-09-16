const dateUtil = {
  //获取当前月份的总天数
  getDays: () => {
    var date = new Date();
    //将当前月份加1，下移到下一个月
    date.setMonth(date.getMonth() + 1);
    //将当前的日期置为0，
    date.setDate(0);
    //再获取天数即取上个月的最后一天的天数
    var days = date.getDate();
    return days;
  },
  /**
   * 获取某个月的总天数
   * 
   */
  getDaysOfMonth: (year, month) => {
    var date = new Date(year, month, 0);
    var days = date.getDate();
    return days;
  }

}

export default dateUtil;
