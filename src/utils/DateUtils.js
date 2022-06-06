import moment from 'moment';
import 'moment/dist/locale/zh-cn';
moment.locale('zh-cn');
moment.updateLocale('zh-cn', {
  months: 'JANUARY,FEBRUARY,MARCH,APRIL,MAY,JUNE,JULY,AUGUST,SEPTEMBER,OCTOBER,NOVEMBER,DECEMBER'.split(','),
  weekdaysShort: 'SUN_MON_TUE_WED_THU_FRI_SAT'.split('_'),
});

export function getMonth() {
  return moment().format('MMMM');
}

export function getYear() {
  return moment().format('YYYY');
}

export function getDay() {
  return moment().format('D');
}

export function getDateListByTime(dTime) {
  const date = moment(dTime);
  const currentMonth = date.format('M');

  let calenderList = [];
  const lastMonth = date.subtract((date.weekday() + 1) % 7, 'days');

  for (let i = 0; i < 42; i++) {
    calenderList.push({
      day: lastMonth.format('D'),
      month: lastMonth.format('M'),
      isCurrentMonth: currentMonth === lastMonth.format('M'),
      year: lastMonth.format('YYYY'),
      timeStr: lastMonth.format('YYYYMMDD'),
    });
    // calenderList.push(lastMonth.format('D'));
    lastMonth.add('1', 'days');
  }
  return calenderList;
}
