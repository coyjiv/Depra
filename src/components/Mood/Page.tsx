import moment from "moment";
import { useEffect, useState } from "react";
import { getMoodsForDate, getRealTimeMoods } from "../../api/MoodApi";
import { CircularProgressBar, Layout, Text } from "@ui-kitten/components";
import MoodWrapper from "./MoodWrapper";
import FloatingButton from "../FloatingButton";
import { Dimensions, StyleSheet } from "react-native";
import { MoodCreationModal } from "./MoodCreationModal";
import { i18n } from "../../i18n";
import { ScrollView } from "react-native-gesture-handler";

export const Page = ({ index }: { index: number }) => {
    const [ creationModalVisible, setCreationModalVisible ] = useState(false);
    const [ moods, setMoods ] = useState([]);
    const [ isLoading, setIsLoading ] = useState(true);

    const handleCreationModalOpen = () => {
        setCreationModalVisible(true);
    }
    const handleCreationModalClose = () => {
        setCreationModalVisible(false);
    }

    console.log(i18n.locale);



    const pageDate = moment().add(index, 'days');
    const displayDate = pageDate.format('DD.MM.YYYY');
    const weekday = pageDate.locale(i18n.locale.includes('en') ? 'en' : i18n.locale.includes('ru') ? 'ru' : 'uk').format('dddd').charAt(0).toUpperCase() + pageDate.format('dddd').slice(1);
    const isToday = moment().isSame(pageDate, 'day');

    useEffect(() => {
        setIsLoading(true);
        const unsubscribe = getRealTimeMoods(pageDate, setMoods, setIsLoading);

        return () => unsubscribe();
    }, [ index ]);


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
            <Text style={styles.tabText}>{isToday ? `${i18n.t('mood.today')}, ${displayDate}` : `${weekday}, ${displayDate}`}</Text>
            <ScrollView contentContainerStyle={{ padding: 0, margin: 0, alignItems: 'center', paddingBottom: 100 }} style={{ minHeight: Dimensions.get('screen').height - 250 }}>{isLoading ? <CircularProgressBar /> : <MoodWrapper moods={moods} />}</ScrollView>
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