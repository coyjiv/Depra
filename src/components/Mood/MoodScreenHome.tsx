import { Divider } from "@ui-kitten/components";
import { SafeAreaView } from "react-native-safe-area-context";
import { TopNavigationBar } from "../TopNavigationBar";
import { DaySelect } from "./DaySelect";

export const MoodScreenHome = () => {

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <Divider />
            <TopNavigationBar />
            <DaySelect />
            {/* <Layout style={{ padding: 0 }}>
                <Text category="h1" style={commonStyles.heading}>{t('tabs.moodDiary')}</Text>
                <InfinitePager
                    PageComponent={Page}
                    maxIndex={0}
                    style={styles.flex}
                    pageWrapperStyle={styles.flex}
                    onPageChange={handleSelect}
                />
            </Layout> */}
        </SafeAreaView>
    )
}