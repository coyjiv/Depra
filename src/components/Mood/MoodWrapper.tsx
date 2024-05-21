import { Layout, Text } from '@ui-kitten/components'
import React from 'react'
import Mood from './Mood'
import { i18n } from '../../i18n'
import { Dimensions } from 'react-native'
import { commonStyles } from '../../styles/common'

const MoodWrapper = ({ moods, isToday }) => {
    return (
        moods.length > 0 ? moods.map((mood, index) => (
            <Mood key={index} mood={mood} />
        )) :
            <Layout style={{ alignItems: 'center', justifyContent: 'center', height: Dimensions.get('screen').height - Dimensions.get('screen').height * 0.4 }}>
                <Text category='h1' style={{ ...commonStyles.heading, fontSize: 25, textAlign: 'center', maxWidth: Dimensions.get('screen').width * 0.8 }}>{isToday ? i18n.t('mood.noRecordsTitleToday') : i18n.t('mood.noRecordsTitle')}</Text>
                {isToday && <Text category='s1' style={{ ...commonStyles.subheading, marginTop: 0, fontSize: 20, textAlign: 'center' }}>{i18n.t('mood.noRecordsText')}</Text>}
            </Layout>
    )
}

export default MoodWrapper