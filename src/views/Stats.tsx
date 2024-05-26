import { Divider, Layout, Spinner, Text } from '@ui-kitten/components'
import React, { useCallback, useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { TopNavigationBar } from '../components/TopNavigationBar'
import Button from '../components/Button'
import { getRealTimeStatistic, recalculateStatistics } from '../api/ProgressApi'
import { BasicChart } from '../components/charts/BasicChart'
import PeriodicChart from '../components/Stats/PeriodicChart'
import { commonStyles } from '../styles/common'
import { useTranslation } from 'react-i18next'
import { RefreshControl, ScrollView } from 'react-native-gesture-handler'
import { cleanMockedTests, createMocked100Tests } from '../api/TestApi'

const Stats = () => {
    const [ counter, setCounter ] = useState(0);

    const { t } = useTranslation();
    const [ loading, setLoading ] = useState(false);
    const [ result, setResult ] = useState(null);
    const calculateProgress = async () => {
        setLoading(true);
        try {
            const data = await recalculateStatistics();
            console.log('stats', data);

            setResult(data);
        } catch (error) {
            console.error("Error recalculating statistics:", error);
        } finally {
            setLoading(false);
        }
    }

    const onRefresh = () => setTimeout(() => {
        setCounter(counter + 1);
    }, 300);


    useEffect(() => {
        setLoading(true);
        const unsubscribe = getRealTimeStatistic(setResult, setLoading)

        return () => unsubscribe();
    }, [ counter ]);



    return (
        <SafeAreaView style={{ flex: 1 }}>
            <Divider />
            <TopNavigationBar />
            {/* <Button onPressIn={createMocked100Tests}>Create 100 random tests</Button>
            <Button onPressIn={cleanMockedTests}>Purge all tests from this user</Button> */}
            <ScrollView refreshControl={<RefreshControl refreshing={loading} onRefresh={onRefresh} />} contentContainerStyle={{ padding: 0, margin: 0, paddingBottom: 100 }} style={{ ...commonStyles.container }}>
                <Text category='h1'>{t('progress.title')}</Text>
                <Text style={{ marginTop: 10 }} category='s1'>{t('progress.description')}</Text>
                <Button style={{ marginVertical: 20 }} onPressIn={calculateProgress} disabled={loading}>{t('progress.calculateProgress')}</Button>
                {loading ? <Spinner /> : result.length > 0 ? <PeriodicChart result={result} /> : <Text>{t('progress.lackOfData')}</Text>}
                {/* <BasicChart /> */}


            </ScrollView>
        </SafeAreaView>
    )
}

export default Stats