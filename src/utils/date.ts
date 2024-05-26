import { Timestamp } from "firebase/firestore";
import moment from "moment";

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
