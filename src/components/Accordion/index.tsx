import { Text } from "@ui-kitten/components";
import { useState } from "react";
import { View } from "react-native";
import Collapsible from "react-native-collapsible";
import { TouchableOpacity } from "react-native-gesture-handler";

export const Accordion = ({ title, content }) => {
    const [ collapsed, setCollapsed ] = useState(true);

    const toggleExpanded = () => {
        setCollapsed(!collapsed);
    };

    return (
        <View style={{ marginTop: 20 }}>
            <TouchableOpacity style={{ padding: 10, backgroundColor: 'pink', borderRadius: 20 }} onPress={toggleExpanded}>
                <View>
                    <Text style={{ fontSize: 20 }}>{title}</Text>
                </View>
            </TouchableOpacity>
            <Collapsible collapsed={collapsed}>
                <View style={{ marginTop: 20 }}>
                    <Text style={{ fontSize: 23, paddingHorizontal: 10 }}>{content}</Text>
                </View>
            </Collapsible>
        </View>
    );
};