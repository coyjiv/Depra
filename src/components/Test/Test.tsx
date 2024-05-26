import { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Divider, Layout, Text } from "@ui-kitten/components";
import { commonStyles } from "../../styles/common";
import { Dimensions, StyleSheet } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { Formik } from "formik";
import { QuestionItem } from "./QuestionItem";
import Button from "../Button";
import { TopNavigationBar } from "../TopNavigationBar";
import { useTranslation } from "react-i18next";
import { createTestRecord, isUserCanTakeTest } from "../../api/TestApi";
import * as yup from 'yup';


export const Test = ({ navigation, route }) => {
    const { t, i18n } = useTranslation();
    const [ canTakeTest, setCanTakeTest ] = useState({ isUserCanTakeTest: false, nextTestDate: '' });

    // useEffect(() => {
    //     console.log(t('test.questions', { returnObjects: true }));  // Check the output in the console
    // }, [ t ]);

    // return null


    const questions = t('test.questions', { returnObjects: true }) as string[]
    const copy = t('test.copy')

    const [ step, setStep ] = useState(0)

    const { resetState = false } = route?.params || { params: { resetState: false } }

    useEffect(() => {
        if (!canTakeTest.isUserCanTakeTest && resetState && step !== 0) {
            setStep(0)
        }

    }, [ resetState, step, canTakeTest ])


    const initialValues = questions.reduce((values, _, index) => ({
        ...values,
        [ `question${index + 1}` ]: -1
    }), {});

    const validationSchema = yup.object().shape(
        Object.keys(initialValues).reduce((schema, key) => {
            schema[ key ] = yup.number().notOneOf([ -1 ], 'This field is required').required('This field is required');
            return schema;
        }, {})
    );



    useEffect(() => {
        isUserCanTakeTest().then(setCanTakeTest)
    }, [ isUserCanTakeTest ])

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <Divider />
            <TopNavigationBar />
            <Layout style={{ height: Dimensions.get('screen').height - 100, paddingTop: 20, paddingHorizontal: 20 }}>
                <Text category="h1" style={commonStyles.heading}>{t('test.title')}</Text>

                {step === 0 && <Text style={{ paddingHorizontal: 0, marginTop: 20, fontSize: 20 }}>{copy}</Text>}

                {step === 0 && !canTakeTest.isUserCanTakeTest && <Text style={{ paddingHorizontal: 20, marginTop: 40, fontSize: 20, textAlign: 'center' }}>{(t('test.blockerInfo', { returnObjects: true }) as (string) => string)(canTakeTest.nextTestDate)}</Text>}

                {step === 0 && <Layout style={{ flexDirection: 'row', backgroundColor: 'transparent', justifyContent: 'center', marginTop: 30, gap: 20 }}>
                    <Button textProps={{ category: 's1' }} disabled={!canTakeTest.isUserCanTakeTest} onPress={() => setStep(1)}>{t('test.takeTest')}</Button>
                    <Button textProps={{ category: 's1' }} onPressIn={() => navigation.navigate('Progress')}>{t('test.showProgress')}</Button>
                </Layout>}

                {step === 1 && <ScrollView overScrollMode="never" endFillColor={'black'} style={styles.container}>
                    <Formik
                        initialValues={initialValues}
                        validationSchema={validationSchema}
                        onSubmit={values => {
                            const levelKey = Object.keys(t('test.depressionLevels')).reduce((prev, curr) => Number(curr) <= score ? curr : prev);
                            const descriptionKey = Object.keys(t('test.depressionLevelDescriptions')).reduce((prev, curr) => Number(curr) <= score ? curr : prev);
                            const score = Object.values<number>(values).reduce((total, value) => total + value, 0);
                            createTestRecord({
                                score,
                                type: 'burns',
                                resultKey: levelKey,
                                resultDetailsKey: descriptionKey
                            }).then(() => console.log('Test record created'));
                            console.log(score);
                            navigation.navigate('Results', { score });
                        }}
                    >
                        {({ setFieldValue, handleSubmit, values, errors, isValid }) => (
                            <Layout style={styles.formContainer}>
                                {questions.map((question, index) => (
                                    <QuestionItem
                                        key={index}
                                        question={question}
                                        index={index}
                                        value={values[ `question${index + 1}` ]}
                                        setValue={setFieldValue}
                                    />
                                ))}
                                {errors && Object.values(errors).length > 0 && <Text style={{ color: 'red', textAlign: 'center' }}>{t('test.allQuestionAreRequired')}</Text>}
                                <Button disabled={!isValid} textProps={{ category: 's1' }} style={styles.button} onPress={handleSubmit as never}>{t('test.toResults')}</Button>
                            </Layout>
                        )}
                    </Formik>
                </ScrollView>}
            </Layout>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    heading: {
        fontSize: 25,
        margin: 20
    },
    container: {
        padding: 20,
    },
    formContainer: {
        paddingBottom: 30,
    },
    button: {
        margin: 100,
        minWidth: 130
    }
});