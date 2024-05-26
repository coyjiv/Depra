import { Layout, Text } from '@ui-kitten/components'
import React from 'react'
import Mood from './Mood'
import { Dimensions } from 'react-native'
import { commonStyles } from '../../styles/common'
import { useTranslation } from 'react-i18next'

const MoodWrapper = ({ moods, isToday }) => {
    const { t } = useTranslation()

    return (
        moods.length > 0 ? moods.map((mood, index) => (
            <Mood key={index} mood={mood} />
        )) :
            <Layout style={{
                alignItems: 'center', justifyContent: 'center', height: Dimensions.get('screen').height - Dimensions.get('screen').height * 0.4, width: Dimensions.get('screen').width
            }}>
                <Text category='h1' style={{ ...commonStyles.heading, fontSize: 19, textAlign: 'center', maxWidth: Dimensions.get('screen').width * 0.8 }}>{isToday ? t('mood.noRecordsTitleToday') : t('mood.noRecordsTitle')}</Text>
                {isToday && <Text category='s1' style={{ ...commonStyles.subheading, marginTop: 0, fontSize: 16, textAlign: 'center' }}>{t('mood.noRecordsText')}</Text>}
            </Layout>
    )
}

export default MoodWrapper