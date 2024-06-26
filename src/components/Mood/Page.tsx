import moment from "moment";
import { useCallback, useEffect, useState } from "react";
import { getMoodsForDate, getRealTimeMoods } from "../../api/MoodApi";
import { Layout, Spinner, Text } from "@ui-kitten/components";
import MoodWrapper from "./MoodWrapper";
import FloatingButton from "../FloatingButton";
import { Dimensions, StyleSheet } from "react-native";
import { MoodCreationModal } from "./MoodCreationModal";
import { RefreshControl, ScrollView } from "react-native-gesture-handler";
import 'moment/locale/uk';
import { useTranslation } from "react-i18next";

export const Page = ({ index }: { index: number }) => {
    const [ refreshing, setRefreshing ] = useState(false);
    const [ counter, setCounter ] = useState(0);

    const onRefresh = useCallback(() => {
        setCounter(counter + 1);
    }, [ counter ]);
    const { t, i18n } = useTranslation()

    const [ creationModalVisible, setCreationModalVisible ] = useState(false);
    const [ moods, setMoods ] = useState([]);
    const [ isLoading, setIsLoading ] = useState(true);

    const handleCreationModalOpen = () => {
        setCreationModalVisible(true);
    }
    const handleCreationModalClose = () => {
        setCreationModalVisible(false);
    }

    console.log(i18n.language);



    const pageDate = moment().add(index, 'days');
    const displayDate = pageDate.format('DD.MM.YYYY');
    // Set the locale once and use it for all operations
    const locale = i18n.language.includes('en') ? 'en' : i18n.language.includes('ru') ? 'ru' : 'uk';

    // Apply the locale setting
    pageDate.locale(locale);

    // Format the weekday, ensuring the locale applies
    const formattedDay = pageDate.format('dddd'); // Full day name according to set locale

    // Capitalize the first letter and combine with the rest of the day name
    const weekday = formattedDay.charAt(0).toUpperCase() + formattedDay.slice(1);

    console.log(weekday); // Check the output

    const isToday = moment().isSame(pageDate, 'day');

    useEffect(() => {
        setIsLoading(true);
        const unsubscribe = getRealTimeMoods(pageDate, setMoods, setIsLoading);

        return () => unsubscribe();
    }, [ index, counter ]);


    // useEffect(() => {
    //     setIsLoading(true);


    //     getMoodsForDate(pageDate).then((moods) => {
    //         console.log("loaded moods: ", moods);
    //         setMoods(moods);
    //     }).catch((error) => {
    //         console.error(error);
    //     }).finally(() => {
    //         setIsLoading(false);
    //     });
    // }, [ index ])




    return (
        <Layout
            style={
                styles.tab
            }
        >
            <Text style={styles.tabText}>{isToday ? `${t('mood.today')}, ${displayDate}` : `${weekday}, ${displayDate}`}</Text>
            <ScrollView refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />} contentContainerStyle={{ padding: 0, paddingTop: isLoading ? 50 : 0, margin: 0, alignItems: 'center', paddingBottom: 100 }} style={{ minHeight: Dimensions.get('screen').height - 250 }}>{isLoading ? <Spinner /> : <MoodWrapper isToday={isToday} moods={moods} />}</ScrollView>
            {isToday && <FloatingButton onPress={handleCreationModalOpen} />}
            {isToday && <MoodCreationModal onClose={handleCreationModalClose} visible={creationModalVisible} />}
        </Layout>
    );
};

const styles = StyleSheet.create({
    tab: {
        height: Dimensions.get('window').height - 159,
        alignItems: 'center',
        justifyContent: 'flex-start',
        // paddingVertical: 10,
        position: 'relative',
        // paddingHorizontal: 20
    },
    tabText: { color: "black", fontSize: 25, marginRight: 'auto', marginLeft: 20 },
})