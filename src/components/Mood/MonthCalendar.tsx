import { addDays, format, isSameDay, isToday, startOfMonth, startOfWeek } from "date-fns"
import { StyleSheet, Text, TouchableOpacity, View } from "react-native"
import { GetDays, languageResolver } from "../../utils/date"
import { Icon } from "@ui-kitten/components"
import Animated, { SharedValue } from "react-native-reanimated"
import { Day } from "./Day"
import { useTranslation } from "react-i18next"
import moment from "moment"

interface MonthCalendarProps {
    handleExpand: () => void
    height: SharedValue<number>
    translateY: SharedValue<number>
    isExpanded: boolean
    calendarDays: GetDays[]
    selectedDate: moment.Moment
    handleSelect: (date: moment.Moment) => void
    monthDate: moment.Moment
}

export const MonthCalendar = ({ handleExpand, handleSelect, height, translateY, isExpanded, calendarDays, selectedDate, monthDate }: MonthCalendarProps) => {

    const { i18n } = useTranslation();

    const today = new Date();

    const start = startOfWeek(startOfMonth(today), { weekStartsOn: 1 });


    const weekDays = Array.from({ length: 7 }, (_, i) => {
        const date = addDays(start, i);
        return {
            key: i,
            weekday: format(date, 'EEEEEE', { locale: languageResolver(i18n.language) }),
            dayNumber: format(date, 'd'),
            isToday: isToday(date),
        };
    });

    const isInCurrentMonth = (date: Date) => {
        return date.getMonth() === today.getMonth();
    }

    const isSelected = (date: Date, selectedDate: Date) => {
        // console.log('date', date);
        // console.log('selectedDate', selectedDate);
        // console.log(isSameDay(date, selectedDate));


        return isSameDay(selectedDate, date);
    }

    const month = format(monthDate.toDate(), 'MMMM', { locale: languageResolver(i18n.language) });
    const year = monthDate.year();



    return (
        <>
            <Animated.View style={{ height: '100%', width: 100 / 3 + '%' as any }}>
                <View style={{ backgroundColor: 'white', borderRadius: 10, margin: 10, paddingTop: 10, paddingBottom: 5, paddingHorizontal: 10 }}>
                    <TouchableOpacity onPressIn={handleExpand}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 5 }}>
                            <Text style={{ fontSize: 20 }}>{month} {year}</Text>
                            <Animated.View style={{ transform: [ { rotate: isExpanded ? '180deg' : '0deg' } ] }}>
                                <Icon
                                    style={{
                                        width: '25'
                                    }}
                                    fill='#8F9BB3'
                                    name='arrow-ios-downward-outline'
                                />
                            </Animated.View>
                        </View>
                    </TouchableOpacity>
                    <Animated.View style={{ height, overflow: 'hidden', width: '97%', marginLeft: 'auto', marginRight: 'auto' }}>
                        <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: '97%', marginHorizontal: 'auto', paddingHorizontal: 15, marginTop: 10, marginBottom: 10 }}>
                            {weekDays.map(({ weekday }, i) => (
                                <Text key={i}>
                                    {weekday}
                                </Text>
                            ))}

                        </View>
                        <View style={{ height: '100%', overflow: 'hidden' }}>
                            <Animated.View style={{ height: '100%', translateY }}>
                                <View style={DaySelectStyles.nonExpandedView}>
                                    {calendarDays.map(({ key, dayNumber, isToday, date }, i) => (
                                        <Day isSelected={isSelected(selectedDate.toDate(), date)} handleSelect={() => handleSelect(moment(date))} key={i} isToday={isToday} isInCurrentMonth={isInCurrentMonth(date)}>
                                            <Text style={isSelected(selectedDate.toDate(), date) ? DaySelectStyles.selectedDayText : isToday ? DaySelectStyles.todayText : isInCurrentMonth(date) ? {} : { color: 'gray' }}>
                                                {dayNumber}
                                            </Text>
                                        </Day>
                                    ))}
                                </View>
                            </Animated.View>
                        </View>
                    </Animated.View>
                </View>
            </Animated.View>
        </>
    )
}

const DaySelectStyles = StyleSheet.create({
    nonExpandedView: {
        display: 'flex',
        flexWrap: 'wrap',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        marginTop: 10,
        rowGap: 10,
        flex: 1,
    },
    todayText: {
        fontWeight: 'bold',
        lineHeight: 19,
    },
    selectedDayText: {
        fontWeight: 'bold',
        lineHeight: 19,
    },
})