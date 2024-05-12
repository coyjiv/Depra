import React from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';
import { Button, Card, Input, Layout, Modal, Text } from '@ui-kitten/components';
import { i18n } from '../../i18n';
import { EmotionAutocomplete } from './EmotionAutocomplete';
import { useFormik } from 'formik';
import { ScrollView } from 'react-native-gesture-handler';
import { DistortionPicker } from './DistortionPicker';

export const MoodCreationModal = ({
    visible,
    onClose
}): React.ReactElement => {
    const formik = useFormik({
        initialValues: {
            emotionsBefore: [],
            automaticThoughts: '',
            cognitiveDistortions: [],
            rationalResponse: '',
            emotionsAfter: []
        },
        onSubmit: values => {
            console.log(values)
            onClose()
        }

    })

    const handleEmotionsBeforeSelect = (emotion) => {
        formik.setFieldValue('emotionsBefore', [ ...formik.values.emotionsBefore, emotion ])
    }

    const handleEmotionBeforeRemove = (emotion) => {
        formik.setFieldValue('emotionsBefore', formik.values.emotionsBefore.filter((e) => e !== emotion))
    }

    const handleEmotionsAfterSelect = (emotion) => {
        formik.setFieldValue('emotionsAfter', [ ...formik.values.emotionsAfter, emotion ])
    }

    const handleEmotionAfterRemove = (emotion) => {
        formik.setFieldValue('emotionsAfter', formik.values.emotionsAfter.filter((e) => e !== emotion))
    }
    return (
        <View style={styles.container}>
            <Modal
                visible={visible}
                backdropStyle={styles.backdrop}
                onBackdropPress={() => onClose()}
                style={styles.modal}
            >
                <Card disabled={true} style={styles.card}>
                    <Text style={styles.heading}>
                        {i18n.t('mood.newEntry')}
                    </Text>
                    <ScrollView style={styles.formWrapper}>
                        <Text style={styles.subheading}>
                            {i18n.t('mood.emotionsBefore')}
                        </Text>

                        <EmotionAutocomplete onSelect={handleEmotionsBeforeSelect} onRemove={handleEmotionBeforeRemove} />

                        <Text style={styles.subheading}>
                            {i18n.t('mood.automaticThoughts')}
                        </Text>

                        <Input multiline style={styles.autoComplete} onChangeText={nextValue => formik.setFieldValue('automaticThoughts', nextValue)} />

                        <Text style={styles.subheading}>
                            {i18n.t('mood.cognitiveDistortions')}
                        </Text>

                        <DistortionPicker />

                        <Text style={styles.subheading}>
                            {i18n.t('mood.rationalResponse')}
                        </Text>

                        <Input multiline style={styles.autoComplete} onChangeText={nextValue => formik.setFieldValue('rationalResponse', nextValue)} />

                        <Text style={styles.subheading}>
                            {i18n.t('mood.emotionsAfter')}
                        </Text>

                        <EmotionAutocomplete onSelect={handleEmotionsAfterSelect} onRemove={handleEmotionAfterRemove} />


                        <Button onPress={formik.handleSubmit as any}>
                            {i18n.t('mood.addEntry')}
                        </Button>
                    </ScrollView>
                </Card>
            </Modal>

        </View>
    );
};

const styles = StyleSheet.create({
    heading: {
        fontSize: 35,
        // paddingTop: 20,
        paddingLeft: 10,
        fontWeight: 'bold'
    },
    formWrapper: {
        marginTop: 20
    },
    subheading: {
        fontSize: 20,
        paddingLeft: 15,
        fontWeight: 'bold'
    },
    container: {
        minHeight: 192,
    },
    modal: {
        width: '100%',
        height: Dimensions.get('window').height,
    },
    card: { width: '100%', height: Dimensions.get('window').height },
    backdrop: {
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    autoComplete: {
        // height: 100
    }
});