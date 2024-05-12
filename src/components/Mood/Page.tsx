import moment from "moment";
import { useEffect, useState } from "react";
import { getMoodsForDate } from "../../api/MoodApi";
import { CircularProgressBar, Layout, Text } from "@ui-kitten/components";
import MoodWrapper from "./MoodWrapper";
import FloatingButton from "../FloatingButton";
import { Dimensions, StyleSheet } from "react-native";
import { MoodCreationModal } from "./MoodCreationModal";
import { i18n } from "../../i18n";

export const Page = ({ index }: { index: number }) => {
    const [ creationModalVisible, setCreationModalVisible ] = useState(false);

    const handleCreationModalOpen = () => {
        setCreationModalVisible(true);
    }
    const handleCreationModalClose = () => {
        setCreationModalVisible(false);
    }


    const pageDate = moment().add(index, 'days');
    const displayDate = pageDate.format('DD.MM.YYYY');
    const weekday = pageDate.format('dddd').charAt(0).toUpperCase() + pageDate.format('dddd').slice(1);
    const isToday = moment().isSame(pageDate, 'day');

    const [ moods, setMoods ] = useState([]);
    const [ isLoading, setIsLoading ] = useState(true);

    useEffect(() => {
        setIsLoading(true);


        getMoodsForDate(pageDate).then((moods) => {
            console.log(moods);
            console.log(pageDate.toString());


            setMoods(moods);
        }).catch((error) => {
            console.error(error);
        }).finally(() => {
            setIsLoading(false);
        });
    }, [ index ])




    return (
        <Layout
            style={
                styles.tab
            }
        >
            <Text style={styles.tabText}>{isToday ? `${i18n.t('mood.today')}, ${displayDate}` : `${weekday}, ${displayDate}`}</Text>
            {isLoading ? <CircularProgressBar /> : <MoodWrapper moods={moods} />}
            {isToday && <FloatingButton onPress={handleCreationModalOpen} />}
            {isToday && <MoodCreationModal onClose={handleCreationModalClose} visible={creationModalVisible} />}
        </Layout>
    );
};

const styles = StyleSheet.create({
    tab: {
        height: Dimensions.get('window').height - 80,
        alignItems: 'center',
        justifyContent: 'flex-start',
        paddingVertical: 10,
        paddingHorizontal: 20
    },
    tabText: { color: "black", fontSize: 25, marginRight: 'auto' },
})