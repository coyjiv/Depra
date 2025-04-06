import { eachDayOfInterval, endOfMonth, endOfWeek, format, getWeekOfMonth, isToday, startOfMonth, startOfWeek } from "date-fns";
import { useState } from "react";
import { useSharedValue, withTiming } from "react-native-reanimated";
import { MonthCalendar } from "./MonthCalendar";
import { MonthSwiperController } from "./MonthSwiperController";
import { getClosestMonthsDays } from "../../utils/date";
import { useTranslation } from "react-i18next";
import { useMoodStore } from "../../store/moodDiarySlice";


export const DaySelect = () => {
    const { selectedDate, setSelectedDate: handleSelect, visibleMonth } = useMoodStore(state => state);
    const height = useSharedValue(100);
    const translateY = useSharedValue(0);

    const { i18n } = useTranslation();

    const today = selectedDate.toDate();

    const [ isExpanded, setIsExpanded ] = useState(false);

    const [{ currentMonthDays, previousMonthDays, nextMonthDays }, updateClosestMonthDays] = useState(getClosestMonthsDays(visibleMonth, i18n.language));


    const handleExpand = () => {
        
        setIsExpanded(!isExpanded);
        height.value = withTiming(isExpanded ? 100 : 300, {
            duration: 500,
        });
        
        const selectedWeekIndex = getWeekOfMonth(selectedDate.toDate(), { weekStartsOn: 0 }) - 1;
        const rowHeight = 50;
        const offsetY = -selectedWeekIndex * rowHeight;
        
        
        if (!isExpanded) {
            translateY.value = withTiming(0, { duration: 300 });
        } else {
            translateY.value = withTiming(offsetY, { duration: 300 });
        }
    };
    
    const monthToRender = [
        <MonthCalendar
            key={1}
            handleSelect={handleSelect}
            handleExpand={handleExpand}
            isExpanded={isExpanded}
            calendarDays={previousMonthDays}
            translateY={translateY}
            height={height}
            selectedDate={selectedDate}
            monthDate={visibleMonth.clone().subtract(1, 'month')}
        />,
        <MonthCalendar
            key={2}
            handleSelect={handleSelect}
            handleExpand={handleExpand}
            isExpanded={isExpanded}
            calendarDays={currentMonthDays}
            translateY={translateY}
            height={height}
            selectedDate={selectedDate}
            monthDate={visibleMonth.clone()}
        />,
        <MonthCalendar
            key={3}
            handleSelect={handleSelect}
            handleExpand={handleExpand}
            isExpanded={isExpanded}
            calendarDays={nextMonthDays}
            translateY={translateY}
            height={height}
            selectedDate={selectedDate}
            monthDate={visibleMonth.clone().add(1, 'month')}
        />
    ]

    return (
        <MonthSwiperController monthToRender={monthToRender} updateClosestMonthDays={updateClosestMonthDays}>
            {monthToRender}
        </MonthSwiperController>
    )
}