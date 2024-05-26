import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { Button, Divider, Layout, Text } from '@ui-kitten/components';
import { Navigation } from '../../types';
import { Week } from '../components/Week';
import { Agenda, Calendar } from 'react-native-calendars';
import { SafeAreaView } from "react-native-safe-area-context"
import { TopNavigationBar } from '../components/TopNavigationBar';
import { useTranslation } from 'react-i18next';



export const ScheduleScreen = ({ navigation }: any) => {
    const { t, i18n } = useTranslation();

    const navigateBack = () => {
        navigation.goBack();
    };

    const [ items, setItems ] = useState({
        '2024-04-28': [ { name: 'Meeting with Bob', height: 50 } ],
        '2024-04-29': [ { name: 'Doctor Appointment', height: 70 } ],
    });

    const loadItems = (day) => {
        const newItems = { ...items };

        // Only add new items if not already in the list
        if (!newItems[ day.dateString ]) {
            newItems[ day.dateString ] = [ { name: 'New Event', height: 50 } ];
            setItems(newItems);
        }
    };



    return (
        <SafeAreaView style={{ flex: 1 }}>
            <Divider />
            <TopNavigationBar />
            <Layout style={{ flex: 1, justifyContent: 'flex-start', alignItems: 'center' }}>
                <Text category='h1' >Расписание</Text>
                <Agenda

                    items={{
                        '2024-05-11': [ { name: 'sdfsdfsd' } ],
                        '2012-05-23': [ { name: 'item 2 - any js object', height: 80 } ],
                        '2012-05-24': [ { name: 'item 2 - any js object', height: 80 } ],
                        '2012-05-25': [ { name: 'item 2 - any js object', height: 80 } ],
                    }}
                    // Callback that gets called when items for a certain month should be loaded (month became visible)
                    loadItemsForMonth={month => {
                        console.log('trigger items loading');
                    }}
                    // Callback that fires when the calendar is opened or closed
                    onCalendarToggled={calendarOpened => {
                        console.log(calendarOpened);
                    }}
                    // Callback that gets called on day press
                    onDayPress={day => {
                        console.log('day pressed');
                    }}
                    // Callback that gets called when day changes while scrolling agenda list
                    onDayChange={day => {
                        console.log('day changed');
                    }}

                    renderItem={(item, firstItemInDay) => {
                        return <Layout />;
                    }}



                    // Hide knob button. Default = false
                    hideKnob={true}
                    // When `true` and `hideKnob` prop is `false`, the knob will always be visible and the user will be able to drag the knob up and close the calendar. Default = false
                    showClosingKnob={false}
                    // By default, agenda dates are marked if they have at least one item, but you can override this if needed
                    markedDates={{
                        '2012-05-16': { selected: true, marked: true },
                        '2012-05-17': { marked: true },
                        '2012-05-18': { disabled: true }
                    }}
                    // If disabledByDefault={true} dates flagged as not disabled will be enabled. Default = false
                    disabledByDefault={true}
                    // If provided, a standard RefreshControl will be added for "Pull to Refresh" functionality. Make sure to also set the refreshing prop correctly
                    onRefresh={() => console.log('refreshing...')}
                    // Set this true while waiting for new data from a refresh
                    refreshing={false}
                    // Add a custom RefreshControl component, used to provide pull-to-refresh functionality for the ScrollView
                    refreshControl={null}
                    // Agenda theme
                    // Agenda container style
                    style={{
                        width: '100%',
                    }}
                />

            </Layout>



        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        justifyContent: 'center',
    },
    item: {
        backgroundColor: 'lightgray',
        padding: 10,
        borderRadius: 10,
        marginBottom: 10,
    },
    day: {
        justifyContent: 'center',
        alignItems: 'center',
    },
});