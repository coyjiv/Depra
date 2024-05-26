import { Layout, Text } from "@ui-kitten/components"
import { BasicChart } from "../charts/BasicChart"
import Button from "../Button"
import { useEffect, useState } from "react"
import { getStatistics } from "../../api/ProgressApi"
import moment from "moment"
import { useTranslation } from "react-i18next"

const PeriodicChart = ({ result, title = 'Статистика по тестам' }) => {
    console.log('result', result);

    const { t } = useTranslation()

    const [ stats, setStats ] = useState([])
    const [ period, setPeriod ] = useState('allTime' as 'allTime' | 'yearly' | 'monthly' | 'week')
    const handlePeriodChange = (newPeriod: 'allTime' | 'yearly' | 'monthly' | 'week') => {
        setPeriod(newPeriod)
    }

    useEffect(() => {
        getStatistics().then(data => {
            console.log('stats', data);
            setStats(data)
        }).catch(error => {
            console.error("Error getting statistics:", error);
        })
    }, [ getStatistics ])


    const chartData = stats?.[ 0 ]?.testProgress?.testProgress?.[ period ]?.map((item, index) => {
        return {
            createdDate: moment(item.createdDate.toDate ? item.createdDate.toDate() : item.createdDate),
            score: item.score
        }
    })

    // console.log('chartData', chartData);




    return (
        <Layout style={{ backgroundColor: 'transparent' }}>
            <Text category="h1" style={{ fontSize: 20, marginVertical: 20 }}>{title}</Text>
            <BasicChart data={chartData} xKey="createdDate" yKeys={[ "score" ]} />
            <Layout style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 20, backgroundColor: 'transparent' }}>
                <Button disabled={period === 'allTime'} onPressIn={() => handlePeriodChange('allTime')} >{t('progress.timeslots.allTime')}</Button>
                <Button disabled={period === 'yearly'} onPressIn={() => handlePeriodChange('yearly')}>{t('progress.timeslots.yearly')}</Button>
                <Button disabled={period === 'monthly'} onPressIn={() => handlePeriodChange('monthly')}>{t('progress.timeslots.monthly')}</Button>
                {/* <Button disabled={period === 'week'} onPressIn={() => handlePeriodChange('week')}>Week</Button> */}
            </Layout>
        </Layout>
    )
}

export default PeriodicChart
