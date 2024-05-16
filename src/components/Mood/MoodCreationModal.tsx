import React, { useRef } from 'react';
import { Dimensions, KeyboardAvoidingView, StyleSheet, View } from 'react-native';
import { Button, Card, Input, Layout, Modal, Text } from '@ui-kitten/components';
import { i18n } from '../../i18n';
import { EmotionAutocomplete } from './EmotionAutocomplete';
import { useFormik } from 'formik';
import { ScrollView } from 'react-native-gesture-handler';
import { DistortionPicker } from './DistortionPicker';
import KeyboardSpacer from 'react-native-keyboard-spacer';

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
            // onClose()
        }

    })

    const scrollRef = useRef(null);

    console.log(formik.values.emotionsBefore);


    const handleEmotionsBeforeSelect = (emotion) => {
        formik.setFieldValue('emotionsBefore', [ ...formik.values.emotionsBefore, emotion ])
    }

    const handleEmotionBeforeRemove = (emotion) => {
        formik.setFieldValue('emotionsBefore', formik.values.emotionsBefore.filter((e) => e !== emotion))
    }

    const handleEmotionsAfterSelect = (emotion) => {
        // scrollRef.current.scrollToEnd({ animated: true })
        formik.setFieldValue('emotionsAfter', [ ...formik.values.emotionsAfter, emotion ])
    }

    const handleEmotionAfterRemove = (emotion) => {
        formik.setFieldValue('emotionsAfter', formik.values.emotionsAfter.filter((e) => e !== emotion))
    }

    const handleUpdateEmotionsBefore = (emotion) => {

        const newEmotionsBefore = formik.values.emotionsBefore.map((e) => {
            if (e.title === emotion.title) {
                return emotion
            }
            return e
        })
        formik.setFieldValue('emotionsBefore', newEmotionsBefore)
    }

    const handleUpdateEmotionsAfter = (emotion) => {

        const newEmotionsAfter = formik.values.emotionsAfter.map((e) => {
            if (e.title === emotion.title) {
                return emotion
            }
            return e
        })
        formik.setFieldValue('emotionsAfter', newEmotionsAfter)
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
                    <KeyboardAvoidingView
                        behavior={"height"}
                    >

                        <ScrollView ref={scrollRef} keyboardShouldPersistTaps={'handled'} style={styles.formWrapper}>
                            <Text style={styles.subheading}>
                                {i18n.t('mood.emotionsBefore')}
                            </Text>

                            <EmotionAutocomplete onEmotionUpdate={handleUpdateEmotionsBefore} placeholder={i18n.t('mood.emotionsBefore')} selected={formik.values.emotionsBefore} onSelect={handleEmotionsBeforeSelect} onRemove={handleEmotionBeforeRemove} />

                            <Text style={styles.subheading}>
                                {i18n.t('mood.automaticThoughts')}
                            </Text>

                            <Input placeholder={i18n.t('mood.automaticThoughts')} multiline style={styles.autoComplete} onChangeText={nextValue => formik.setFieldValue('automaticThoughts', nextValue)} />

                            <Text style={styles.subheading}>
                                {i18n.t('mood.cognitiveDistortions')}
                            </Text>

                            <DistortionPicker />

                            <Text style={styles.subheading}>
                                {i18n.t('mood.rationalResponse')}
                            </Text>

                            <Input placeholder={i18n.t('mood.rationalResponse')} multiline style={styles.autoComplete} onChangeText={nextValue => formik.setFieldValue('rationalResponse', nextValue)} />

                            <Text style={styles.subheading}>
                                {i18n.t('mood.emotionsAfter')}
                            </Text>

                            <EmotionAutocomplete onEmotionUpdate={handleUpdateEmotionsAfter} placeholder={i18n.t('mood.emotionsBefore')} selected={formik.values.emotionsAfter} onSelect={handleEmotionsAfterSelect} onRemove={handleEmotionAfterRemove} />


                            <Button style={{ marginTop: 50 }} onPress={formik.handleSubmit as any}>
                                {i18n.t('mood.addEntry')}
                            </Button>
                        </ScrollView>
                        {/* <KeyboardSpacer topSpacing={Dimensions.get('screen').height * 0.1} /> */}
                    </KeyboardAvoidingView>
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
        marginTop: 20,

    },
    subheading: {
        fontSize: 20,
        paddingLeft: 15,
        fontWeight: 'bold',
        marginTop: 25
    },
    container: {
        minHeight: 230,
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
        marginTop: 25
    }
});