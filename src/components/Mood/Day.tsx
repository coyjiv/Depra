import { ReactNode } from "react"
import { TouchableOpacity, View } from "react-native"

export const Day = ({ children, isToday, isSelected, handleSelect }: { children: ReactNode, isToday: boolean, handleSelect: () => void, isInCurrentMonth: boolean, isSelected: boolean }) => {
    return (
        <TouchableOpacity onPressIn={handleSelect} style={{ width: `${100 / 7}%` }}>
            <View style={{ borderColor: isToday ? 'black' : isSelected? 'green' : 'transparent', paddingHorizontal: 15, borderWidth: 1, paddingBlock: 9, display: 'flex', borderRadius: 10, flexDirection: 'column', alignItems: 'center' }}>
                {children}
            </View>
        </TouchableOpacity>
    )
}