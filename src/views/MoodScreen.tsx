import { Divider, Layout, Text } from "@ui-kitten/components"
import moment from "moment";
import { useContext, useState } from "react";
import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context"
import 'moment/locale/ru';
import InfinitePager from 'react-native-infinite-pager'
import { Page } from "../components/Mood/Page";
import { TopNavigationBar } from "../components/TopNavigationBar";
import { i18n } from "../i18n";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { MoodCreationModal } from "../components/Mood/MoodCreationModal";
import MoodForm from "../components/Mood/MoodForm";
import ViewRecord from "../components/Mood/ViewRecord";
import { MoodData, MoodDoc } from "../../types";
import { commonStyles } from "../styles/common";
import { LocaleContext } from "../context/LocaleContext";


type RootStackParamList = {
    Home: undefined;
    ViewRecord: { mood: MoodDoc };
};
const Stack = createNativeStackNavigator<RootStackParamList>();

const MoodScreen = () => {

    return (
        <Stack.Navigator>
            <Stack.Screen options={{ headerShown: false }} name="Home" component={MoodScreenHome} />
            <Stack.Screen name="ViewRecord" options={{ headerTitle: () => (<Text>{i18n.t('mood.viewRecord')}</Text>) }} component={ViewRecord} />
        </Stack.Navigator>
    )

}

const styles = StyleSheet.create({
    flex: { flex: 1 },
    heading: {
        fontSize: 35,
        // paddingTop: 20,
        paddingLeft: 20,
        fontWeight: 'bold'
    }
});

export default MoodScreen


export const MoodScreenHome = () => {
    const { locale } = useContext(LocaleContext);
    const [ selectedDate, setSelectedDate ] = useState(moment());

    const handleSelect = (index) => {
        setSelectedDate(moment().add(index, 'days'));
    };
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <Divider />
            <TopNavigationBar />
            <Layout style={{ padding: 0 }}>
                <Text category="h1" style={commonStyles.heading}>{i18n.t('tabs.moodDiary')}</Text>
                <InfinitePager
                    PageComponent={Page}
                    maxIndex={0}
                    style={styles.flex}
                    pageWrapperStyle={styles.flex}
                    onPageChange={handleSelect}
                />
            </Layout>
        </SafeAreaView>
    )
}