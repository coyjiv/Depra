import { Layout, Text, useTheme } from "@ui-kitten/components"
import { DAY } from "../../../types"
import { Pressable } from "react-native"

interface DayProps {
    day: DAY,
    onDayPress: () => void,
    isSelected: boolean,
    isToday: boolean,
    isInCycle: boolean
}


const Day = ({
    day,
    onDayPress,
    isSelected,
    isToday,
    isInCycle
}: DayProps) => {
    const theme = useTheme();

    return (
        <Pressable onPress={onDayPress}>
            <Layout style={{ backgroundColor: isSelected ? theme[ 'color-primary-500' ] : isToday ? theme[ 'color-primary-200' ] : 'transparent', padding: 10, borderRadius: 15 }}>
                <Text category="h2" style={{ textAlign: "center", fontSize: 18, color: isSelected ? 'white' : 'black' }}>{day.slice(0, 3)}</Text>
            </Layout>
        </Pressable>
    )
}

export default Day