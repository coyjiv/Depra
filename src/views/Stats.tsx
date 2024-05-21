import { Divider, Layout, Text } from '@ui-kitten/components'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { TopNavigationBar } from '../components/TopNavigationBar'

const Stats = () => {
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <Divider />
            <TopNavigationBar />
            <Layout><Text>Stats</Text></Layout>
        </SafeAreaView>
    )
}

export default Stats