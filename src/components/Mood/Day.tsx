import { ReactNode } from "react"
import { TouchableOpacity, View } from "react-native"

export const Day = ({ children, isToday, isSelected, handleSelect }: { children: ReactNode, isToday: boolean, handleSelect: () => void, isInCurrentMonth: boolean, isSelected: boolean }) => {
    return (
        <TouchableOpacity onPressIn={handleSelect} style={{ width: `${100 / 7}%` }}>
            <View style={{ borderColor: isSelected? '#B7FF6A' : isToday ? 'black' : 'transparent', paddingHorizontal: 10, borderWidth: 1, marginHorizontal: 6, backgroundColor: isSelected ? '#F2FFE5' : isToday? 'white' : 'white', paddingBlock: 9, display: 'flex', borderRadius: 10, flexDirection: 'column', alignItems: 'center' }}>
                {children}
            </View>
        </TouchableOpacity>
    )
}