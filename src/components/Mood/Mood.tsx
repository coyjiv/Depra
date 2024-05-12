import { Layout, Text } from '@ui-kitten/components'
import moment from 'moment'
import React from 'react'
import { Dimensions, StyleSheet } from 'react-native'

const Mood = ({ mood }) => {
    const date = moment(mood.modifiedDate).toDate().toLocaleDateString()

    return (
        <Layout style={styles.card}>
            <Text numberOfLines={1} style={{ fontWeight: '700' }}>{mood.rationalResponse}</Text>
            <Layout style={{ flexDirection: 'row', backgroundColor: 'transparent' }}>
                <Text>До: </Text>
                {mood.emotionsBefore.map((emotion, index) => (
                    <Text key={index}>{emotion} | </Text>
                ))}
            </Layout>
            <Layout style={{ flexDirection: 'row', backgroundColor: 'transparent' }}>
                <Text>После: </Text>
                {mood.emotionsAfter.map((emotion, index) => (
                    <Text key={index}>{emotion} | </Text>
                ))}
            </Layout>
            <Text style={{ position: 'absolute', bottom: 10, right: 10 }}>{date}</Text>
        </Layout>
    )
}

const styles = StyleSheet.create({
    card: {
        margin: 10,
        marginTop: 20,
        padding: 10,
        paddingBottom: 35,
        borderRadius: 10,
        backgroundColor: 'red',
        width: Dimensions.get('window').width - 20,
        elevation: 5
    }
})

export default Mood