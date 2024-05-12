import { Layout, Text } from '@ui-kitten/components'
import React from 'react'
import Mood from './Mood'

const MoodWrapper = ({ moods }) => {
    return (
        moods.length > 0 ? moods.map((mood, index) => (
            <Mood key={index} mood={mood.data} />
        )) :
            <Layout><Text>MoodWrapper</Text></Layout>
    )
}

export default MoodWrapper