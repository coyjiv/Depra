import { Timestamp } from "firebase/firestore";
import moment, { months } from "moment";
import { ru, uk, enGB, enAU, enUS } from 'date-fns/locale';
import { eachDayOfInterval, endOfMonth, endOfWeek, format, isToday, startOfMonth, startOfWeek } from "date-fns";


export const getDayRangeTimestamps = (date) => {
    const startOfDay = moment(date).startOf('day').toDate(); // Start of day
    const endOfDay = moment(date).endOf('day').toDate(); // End of day

    return {
        start: Timestamp.fromDate(startOfDay),
        end: Timestamp.fromDate(endOfDay)
    };
};

export function createFullTimeline(data) {
    if (data.length === 0) return [];

    const sortedData = data.sort((a, b) => new Date(a.createdDate) - new Date(b.createdDate));

    // Создаём полный временной ряд
    let fullTimeline = [];
    let lastKnownScore = sortedData[ 0 ].score;
    let currentDate = moment(sortedData[ 0 ].createdDate);

    const endDate = moment(sortedData[ sortedData.length - 1 ].createdDate);

    while (currentDate <= endDate) {
        // Находим запись на текущую дату
        const existingEntry = sortedData.find(entry => moment(entry.createdDate).isSame(currentDate, 'day'));

        if (existingEntry) {
            lastKnownScore = existingEntry.score;  // Обновляем последнее известное значение
            fullTimeline.push({
                ...existingEntry,
                displayDate: currentDate.format('MM/DD')
            });
        } else {
            // Если записи нет, используем последний известный score
            fullTimeline.push({
                createdDate: currentDate.toISOString(),
                displayDate: currentDate.format('MM/DD'),
                score: lastKnownScore
            });
        }

        currentDate.add(1, 'days');  // Переходим к следующему дню
    }

    return fullTimeline;
}

export const languageResolver = (language: string) => {
    // console.log('languageResolver', language);
    
    switch (language) {
        case 'uk':
            return uk;
        case 'ru':
            return ru;
        case 'en':
            return enGB;
        case 'en-US':
            return enUS;
        case 'en-AU':
            return enAU;
        default:
            return enGB;
    }
} 

export const getMonthDays = (start, end) => {
    const today = new Date();

    return eachDayOfInterval({ start, end }).map((date, i) => ({
    key: i,
    dayNumber: format(date, 'd'),
    isToday: isToday(date),
    isCurrentMonth: date.getMonth() === today.getMonth(),
    date,
}))};

// export const getClosestMonthsDays = (start: Date, end: Date) => {
//     const currentMonthDays = getMonthDays(start, end);
//     const previousMonthDays = getMonthDays(moment(start).subtract(1, 'M'), moment(end).subtract(1, 'M'));
//     const nextMonthDays = getMonthDays(moment(start).add(1, 'M'), moment(end).add(1, 'M'));

//     return {
//         currentMonthDays,
//         previousMonthDays,
//         nextMonthDays
//     }
// }

export const getClosestMonthsDays = (selectedDate: moment.Moment, locale: string) => {
    const base = selectedDate.clone();
  
    const getDays = (date: moment.Moment) => {
      const start = startOfWeek(startOfMonth(date.toDate()), { weekStartsOn: 1 });
      const end = endOfWeek(endOfMonth(date.toDate()), { weekStartsOn: 1 });
      return eachDayOfInterval({ start, end }).map((d, i) => ({
        key: i,
        dayNumber: format(d, 'd'),
        isToday: isToday(d),
        isCurrentMonth: d.getMonth() === date.month(),
        date: d,
      }));
    };
  
    return {
      previousMonthDays: getDays(base.clone().subtract(1, 'month')),
      currentMonthDays: getDays(base),
      nextMonthDays: getDays(base.clone().add(1, 'month')),
    };
  };
  
 export interface GetDays {
    key: number;
    dayNumber: string;
    isToday: boolean;
    isCurrentMonth: boolean;
    date: Date;
}[]