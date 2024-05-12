import { Divider, Layout, Text } from "@ui-kitten/components"
import moment from "moment";
import { useState } from "react";
import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context"
import 'moment/locale/ru';
import InfinitePager from 'react-native-infinite-pager'
import { Page } from "../components/Mood/Page";
import { TopNavigationBar } from "../components/TopNavigationBar";
import { i18n } from "../i18n";



const MoodScreen = () => {
    const [ selectedDate, setSelectedDate ] = useState(moment());

    const handleSelect = (index) => {
        setSelectedDate(moment().add(index, 'days'));
    };

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <Divider />
            <TopNavigationBar />
            <Layout>
                <Text style={styles.heading}>{i18n.t('tabs.moodDiary')}</Text>
                <InfinitePager
                    PageComponent={Page}

                    style={styles.flex}
                    pageWrapperStyle={styles.flex}
                    onPageChange={handleSelect}
                />
            </Layout>
        </SafeAreaView>
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