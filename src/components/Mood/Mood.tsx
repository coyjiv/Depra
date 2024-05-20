import { Layout, Text, useTheme } from '@ui-kitten/components'
import moment from 'moment'
import React from 'react'
import { Dimensions, StyleSheet } from 'react-native'
import { TouchableWithoutFeedback } from 'react-native-gesture-handler'
import { useNavigation } from '@react-navigation/native';
import { MoodDoc } from '../../../types'
import { i18n } from '../../i18n'

const Mood = ({ mood: moodDoc }: { mood: MoodDoc }) => {
    const mood = moodDoc.data
    console.log("mood", mood, 'moodDoc', moodDoc);

    const date = moment(moodDoc?.modifiedDate.toDate()).format('DD.MM.YYYY HH:mm')

    const navigation = useNavigation();

    const theme = useTheme();
    const styles = StyleSheet.create({
        card: {
            margin: 10,
            marginTop: 20,
            padding: 10,
            paddingBottom: 35,
            borderRadius: 10,
            backgroundColor: theme[ 'color-basic-400' ],
            width: Dimensions.get('window').width - 40,
            elevation: 5
        }
    })


    return (
        <TouchableWithoutFeedback onPress={() => navigation.navigate('ViewRecord', {
            mood: moodDoc
        })}>
            <Layout style={styles.card}>
                <Text numberOfLines={1} style={{ fontWeight: '700', fontSize: 18, marginTop: 10 }}>{i18n.t('mood.automaticThoughts')}: {mood.automaticThoughts}</Text>
                <Text numberOfLines={1} style={{ fontWeight: '700', fontSize: 18, marginBottom: 10 }}>{i18n.t('mood.rationalResponse')}: {mood.rationalResponse}</Text>
                <Layout style={{ flexDirection: 'row', backgroundColor: 'transparent' }}>
                    <Text>{i18n.t('mood.before')}: </Text>
                    {mood.emotionsBefore.map((emotion, index, array) => (
                        <Text key={index}>{emotion} {index !== array.length - 1 && "|"} </Text>
                    ))}
                </Layout>
                <Layout style={{ flexDirection: 'row', backgroundColor: 'transparent' }}>
                    <Text>{i18n.t('mood.after')}: </Text>
                    {mood.emotionsAfter.map((emotion, index, array) => (
                        <Text key={index}>{emotion} {index !== array.length - 1 && "|"} </Text>
                    ))}
                </Layout>
                <Text style={{ position: 'absolute', bottom: 10, right: 10 }}>{date}</Text>
            </Layout>
        </TouchableWithoutFeedback>
    )
}

export default Mood