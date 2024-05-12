import { Divider, Layout, Text } from '@ui-kitten/components'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'

const Stats = () => {
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <Divider />
            <Layout><Text>Stats</Text></Layout>
        </SafeAreaView>
    )
}

export default Stats