import { Button, Card, Input, Text } from '@ui-kitten/components'
import React, { useState } from 'react'
import { Dimensions, KeyboardAvoidingView, StyleSheet } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import { EmotionAutocomplete } from './EmotionAutocomplete'
import { DistortionPicker } from './DistortionPicker'
import { useFormik } from 'formik'
import { createMood, editMood } from '../../api/MoodApi'
import * as Yup from 'yup'
import { MoodData, MoodDoc } from '../../../types'
import { commonStyles } from '../../styles/common'
import { useTranslation } from 'react-i18next'

const useMoodFormValidationSchema = () => {
    const { t } = useTranslation()
    return Yup.object().shape({
        emotionsBefore: Yup.array().min(1, t('mood.required')),
        automaticThoughts: Yup.string().required(t('mood.required')),
        cognitiveDistortions: Yup.array().min(1, t('mood.required')),
        rationalResponse: Yup.string().required(t('mood.required')),
        emotionsAfter: Yup.array().min(1, t('mood.required')),
    })
}

// const validationSchema = Yup.object().shape({
//     automaticThoughts: Yup.string().required(t('mood.required')),
//     cognitiveDistortions: Yup.array().min(1, t('mood.required')),
//     rationalResponse: Yup.string().required(t('mood.required')),
//     emotionsAfter: Yup.array().min(1, t('mood.required')),
//     emotionsBefore: Yup.array().min(1, t('mood.required'))
// })

const MoodForm = ({ type = 'create', mood: moodDoc, submitCallback }: { type?: 'edit' | 'create', mood?: MoodDoc, submitCallback?: () => void }) => {
    const { t } = useTranslation()

    const scrollRef = React.useRef(null)

    const [ currentScrollPosition, setCurrentScrollPosition ] = useState(0);


    const validationSchema = useMoodFormValidationSchema()
    const mood = moodDoc?.data
    const editValues = {
        emotionsBefore: mood?.emotionsBefore.map((e) => ({ title: e.split(' ')[ 0 ], emotionPercentage: parseFloat(e.split(' ')[ 1 ]) / 100 })),
        automaticThoughts: mood?.automaticThoughts,
        cognitiveDistortions: mood?.cognitiveDistortions.map((d) => ({ title: d })),
        rationalResponse: mood?.rationalResponse,
        emotionsAfter: mood?.emotionsAfter.map((e) => ({ title: e.split(' ')[ 0 ], emotionPercentage: parseFloat(e.split(' ')[ 1 ]) / 100 }))
    }
    const formik = useFormik({
        initialValues: type === 'edit' ? editValues : {
            emotionsBefore: [],
            automaticThoughts: '',
            cognitiveDistortions: [],
            rationalResponse: '',
            emotionsAfter: []
        },
        validationSchema,
        onSubmit: values => {
            // console.log(values)
            const documentValues = {
                data: {
                    automaticThoughts: values.automaticThoughts,
                    cognitiveDistortions: values.cognitiveDistortions.map((d) => d.title),
                    emotionsAfter: values.emotionsAfter.map((e) => e.title + " " + (e.emotionPercentage * 100).toFixed() + "%"),
                    emotionsBefore: values.emotionsBefore.map((e) => e.title + " " + (e.emotionPercentage * 100).toFixed() + "%"),
                    rationalResponse: values.rationalResponse,
                }
            }
            // console.log(documentValues);
            if (type === 'create') {
                createMood(documentValues)

                formik.resetForm()
            }
            if (type === 'edit') {
                editMood(moodDoc.id, documentValues.data)
            }


            if (submitCallback) submitCallback()
        }

    })

    // console.log(formik.errors);


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

    const handleDistortionRemove = (distortion) => {
        formik.setFieldValue('cognitiveDistortions', formik.values.cognitiveDistortions.filter((e) => e !== distortion))
    }

    const handleDistortionSelect = (distortion) => {
        formik.setFieldValue('cognitiveDistortions', [ ...formik.values.cognitiveDistortions, distortion ])
    }


    const handleScroll = (event) => {
        const { y } = event.nativeEvent.contentOffset;
        setCurrentScrollPosition(y);
    };

    const handleScrollDownForAutocomplete = () => {
        if (scrollRef.current) {
            console.log('scrolling down');

            // Scroll down by 50 more pixels from the current scroll position
            const newScrollPosition = currentScrollPosition + 50;
            scrollRef.current.scrollTo({
                y: newScrollPosition,
                animated: true
            });
        }
    };

    return (
        <Card disabled={true} style={styles.card}>
            {type === 'create' && <Text category='h1' style={commonStyles.heading}>
                {t('mood.newEntry')}
            </Text>}
            <KeyboardAvoidingView
                behavior={"padding"}
            >

                <ScrollView ref={scrollRef} onScroll={handleScroll} scrollEventThrottle={16} keyboardShouldPersistTaps={'handled'} style={type !== 'create' ? { ...styles.formWrapper, height: Dimensions.get('window').height * 0.6 } : styles.formWrapper}>
                    <Text style={commonStyles.subheading}>
                        {t('mood.emotionsBefore')}
                    </Text>

                    <EmotionAutocomplete onEmotionUpdate={handleUpdateEmotionsBefore} placeholder={t('mood.emotionsBefore')} selected={formik.values.emotionsBefore} onSelect={handleEmotionsBeforeSelect} onRemove={handleEmotionBeforeRemove} />

                    <Text style={commonStyles.subheading}>
                        {t('mood.automaticThoughts')}
                    </Text>

                    <Input value={formik.values.automaticThoughts} textStyle={{ fontSize: 18 }} placeholder={t('mood.automaticThoughts')} multiline style={styles.autoComplete} onChangeText={nextValue => formik.setFieldValue('automaticThoughts', nextValue)} />

                    <Text style={commonStyles.subheading}>
                        {t('mood.cognitiveDistortions')}
                    </Text>

                    <DistortionPicker onRemove={handleDistortionRemove} onSelect={handleDistortionSelect} placeholder={t('mood.cognitiveDistortions')} selected={formik.values.cognitiveDistortions} />

                    <Text style={commonStyles.subheading}>
                        {t('mood.rationalResponse')}
                    </Text>

                    <Input value={formik.values.rationalResponse} textStyle={{ fontSize: 18 }} placeholder={t('mood.rationalResponse')} multiline style={styles.autoComplete} onChangeText={nextValue => formik.setFieldValue('rationalResponse', nextValue)} />

                    <Text style={commonStyles.subheading}>
                        {t('mood.emotionsAfter')}
                    </Text>

                    <EmotionAutocomplete onPressIn={handleScrollDownForAutocomplete} onEmotionUpdate={handleUpdateEmotionsAfter} placeholder={t('mood.emotionsAfter')} selected={formik.values.emotionsAfter} onSelect={handleEmotionsAfterSelect} onRemove={handleEmotionAfterRemove} />


                </ScrollView>
                <Button disabled={Object.values(formik.errors).length > 0} style={{ marginVertical: 50 }} onPress={formik.handleSubmit as any}>
                    {() => <Text style={{ fontFamily: 'PTSans_400Regular', color: 'white', fontSize: 20 }}>{type === 'create' ? t('mood.addEntry') : t('mood.editEntry')}</Text>}
                </Button>
                {/* <KeyboardSpacer topSpacing={Dimensions.get('screen').height * 0.1} /> */}
            </KeyboardAvoidingView>
        </Card>
    )
}

export default MoodForm

const styles = StyleSheet.create({
    formWrapper: {
        marginTop: 20,
    },
    card: { width: '100%', height: Dimensions.get('window').height },
    autoComplete: {
        // height: 100
        marginTop: 25
    }
});