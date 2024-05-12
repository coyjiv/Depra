import { Layout } from "@ui-kitten/components";
import Day from "../Day";
import { DAY } from "../../../types";
import { useState } from "react";

export const Week = () => {
    const currentDay = new Date().getDay();

    const daysOfWeek = [ DAY.MONDAY, DAY.TUESDAY, DAY.WEDNESDAY, DAY.THURSDAY, DAY.FRIDAY, DAY.SATURDAY, DAY.SUNDAY ];

    const [ selectedDay, setSelectedDay ] = useState(currentDay);

    return (
        <Layout style={{ flexDirection: 'row', gap: 10 }}>
            {daysOfWeek.map((day, index) => (
                <Day
                    key={index}
                    day={day}
                    isSelected={selectedDay === index + 1} // Adjusting for 0-indexed getDay() method
                    isToday={currentDay === index + 1}
                    isInCycle={false}
                    onDayPress={() => {
                        setSelectedDay(index + 1);
                    }}
                />
            ))}
        </Layout>
    );
}