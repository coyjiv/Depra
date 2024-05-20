import { useState } from 'react'
import MoodForm from './MoodForm'
import { Dimensions, StyleSheet } from 'react-native'
import { Button, Card, Layout, Text } from '@ui-kitten/components'
import { i18n } from '../../i18n'
import { ScrollView } from 'react-native-gesture-handler'
import { MoodData, MoodDoc } from '../../../types'

const ViewRecord = ({ route, navigation }) => {
    const { mood } = route.params
    const [ isEditing, toggleEditing ] = useState(false)
    return (
        isEditing ?
            <MoodForm type='edit' mood={mood} submitCallback={() => navigation.navigate('Home')} /> :
            <ViewCard mood={mood.data} toggleEditing={toggleEditing} />
    )
}

const ViewCard = ({ mood, toggleEditing }: { mood: MoodData, toggleEditing: React.Dispatch<React.SetStateAction<boolean>> }) => {
    return (
        <Card disabled={true} style={styles.container}>
            <ScrollView keyboardShouldPersistTaps={'handled'} style={styles.formWrapper}>
                <Text style={styles.subheading}>
                    {i18n.t('mood.emotionsBefore')}
                </Text>

                <Layout style={{ marginLeft: 20, marginTop: 20 }}>
                    {mood.emotionsBefore.map((emotion, index) => (
                        <Text key={index} style={{ fontSize: 20 }}>{emotion}</Text>
                    ))}
                </Layout>


                <Text style={styles.subheading}>
                    {i18n.t('mood.automaticThoughts')}
                </Text>

                <Text style={{ fontSize: 20, marginHorizontal: 20, marginTop: 20 }}>{mood.automaticThoughts}</Text>

                <Text style={styles.subheading}>
                    {i18n.t('mood.cognitiveDistortions')}
                </Text>

                <Layout style={{ marginLeft: 20, marginTop: 20 }}>
                    {mood.cognitiveDistortions.map((emotion, index) => (
                        <Text key={index} style={{ fontSize: 20 }}>{emotion}</Text>
                    ))}
                </Layout>

                <Text style={styles.subheading}>
                    {i18n.t('mood.rationalResponse')}
                </Text>

                <Text style={{ fontSize: 20, marginHorizontal: 20, marginTop: 20 }}>{mood.rationalResponse}</Text>

                <Text style={styles.subheading}>
                    {i18n.t('mood.emotionsAfter')}
                </Text>

                <Layout style={{ marginLeft: 20, marginVertical: 20 }}>
                    {mood.emotionsAfter.map((emotion, index) => (
                        <Text key={index} style={{ fontSize: 20 }}>{emotion}</Text>
                    ))}
                </Layout>

            </ScrollView>
            <Button style={styles.editButton} onPress={() => toggleEditing(true)}>Edit</Button>
        </Card>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    formWrapper: {
        width: Dimensions.get('window').width - 20,
    },
    heading: {
        fontSize: 35,
        paddingLeft: 20,
        fontWeight: 'bold'
    },
    subheading: {
        fontSize: 25,
        paddingLeft: 20,
        fontWeight: 'bold',
        marginTop: 20
    },
    editButton: {
        // marginVertical: 50
    }
})

export default ViewRecord