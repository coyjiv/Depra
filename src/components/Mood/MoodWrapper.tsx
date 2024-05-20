import { Layout, Text } from '@ui-kitten/components'
import React from 'react'
import Mood from './Mood'
import { i18n } from '../../i18n'
import { Dimensions } from 'react-native'
import { commonStyles } from '../../styles/common'

const MoodWrapper = ({ moods }) => {
    return (
        moods.length > 0 ? moods.map((mood, index) => (
            <Mood key={index} mood={mood} />
        )) :
            <Layout style={{ alignItems: 'center', justifyContent: 'center', height: Dimensions.get('screen').height - Dimensions.get('screen').height * 0.4 }}>
                <Text category='h1' style={{ ...commonStyles.heading, fontSize: 28 }}>{i18n.t('mood.noRecordsTitle')}</Text>
                <Text category='h1' style={{ ...commonStyles.subheading, marginTop: 0, fontSize: 20, textAlign: 'center' }}>{i18n.t('mood.noRecordsText')}</Text>
            </Layout>
    )
}

export default MoodWrapper