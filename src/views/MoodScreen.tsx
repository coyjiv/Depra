import { CircularProgressBar, Divider, Layout, Text } from "@ui-kitten/components"
import moment from "moment";
import { useEffect, useRef, useState } from "react";
import { Dimensions, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context"
import 'moment/locale/ru';
import InfinitePager from 'react-native-infinite-pager'
import FloatingButton from "../components/FloatingButton";
import { getMoodsForDate } from "../api/MoodApi";
import MoodWrapper from "../components/Mood/MoodWrapper";
import { getAuth } from "firebase/auth";

moment.locale('ru');

const Page = ({ index }: { index: number }) => {
    const pageDate = moment().add(index, 'days');
    const displayDate = pageDate.format('DD.MM.YYYY');
    const weekday = pageDate.format('dddd').charAt(0).toUpperCase() + pageDate.format('dddd').slice(1);
    const isToday = moment().isSame(pageDate, 'day');

    const [ moods, setMoods ] = useState([]);
    const [ isLoading, setIsLoading ] = useState(true);

    useEffect(() => {
        setIsLoading(true);

        console.log(getAuth().currentUser);


        getMoodsForDate(pageDate.toString()).then((moods) => {
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
            <Text style={styles.tabText}>{isToday ? `Сегодня, ${displayDate}` : `${weekday}, ${displayDate}`}</Text>
            {isLoading ? <CircularProgressBar /> : <MoodWrapper moods={moods} />}
            {isToday && <FloatingButton onPress={() => console.log('test')} />}
        </Layout>
    );
};


const MoodScreen = () => {
    const [ selectedDate, setSelectedDate ] = useState(moment());

    const handleSelect = (index) => {
        setSelectedDate(moment().add(index, 'days'));
    };

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <Divider />
            <Layout>
                <Text style={styles.heading}>Дневник мыслей</Text>
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
    tab: {
        height: Dimensions.get('window').height - 80,
        alignItems: 'center',
        justifyContent: 'flex-start',
        paddingVertical: 10,
        paddingHorizontal: 20
    },
    tabText: { color: "black", fontSize: 25, marginRight: 'auto' },
    flex: { flex: 1 },
    heading: {
        fontSize: 35,
        paddingTop: 20,
        paddingLeft: 20,
        fontWeight: 'bold'
    }
});

export default MoodScreen