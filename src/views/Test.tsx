import { Button, Divider, Input, Layout, Radio, RadioGroup, Text } from "@ui-kitten/components"
import { Formik, useFormik } from "formik"
import { memo, useCallback, useEffect, useState } from "react";
import { ScrollView, StyleSheet } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { i18n } from "../i18n";

const QuestionItem = memo(({ question, index, value, setValue }) => {
    const handleRadioChange = useCallback((nextValue) => {
        setValue(`question${index + 1}`, nextValue);
    }, [ setValue, index ]);

    return (
        <Layout style={styles.questionContainer}>
            <Text style={styles.questionText}>{index + 1 + ". "} {question}</Text>
            <RadioGroup selectedIndex={value} onChange={handleRadioChange}>
                {(i18n.t('test.testOptions') as string[]).map((option, idx) => (
                    <Radio key={idx}>{option}</Radio>
                ))}
            </RadioGroup>
        </Layout>
    );
});





const Test = () => {

    const questions = i18n.t('test.questions') as string[]
    const copy = i18n.t('test.copy')

    const [ step, setStep ] = useState(0)


    const initialValues = questions.reduce((values, _, index) => ({
        ...values,
        [ `question${index + 1}` ]: -1
    }), {});

    const shouldPassTest = false

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <Divider />
            <Layout>
                <Text style={styles.heading}>{i18n.t('test.title')}</Text>
                {step === 0 && <Text style={{ paddingHorizontal: 20 }}>{copy}</Text>}
                {step === 0 && !shouldPassTest && <Text style={{ paddingHorizontal: 40, fontSize: 20 }}>{(i18n.t('test.blockerInfo') as (string) => string)('18.05.2024')}</Text>}
                {step === 0 && <Layout style={{ flexDirection: 'row', backgroundColor: 'transparent', justifyContent: 'center', marginTop: 30, gap: 20 }}>
                    <Button disabled={shouldPassTest} onPress={() => setStep(1)}>{i18n.t('test.takeTest')}</Button>
                    <Button>{i18n.t('test.showProgress')}</Button>
                </Layout>}
                {step === 1 && <ScrollView style={styles.container}>
                    <Formik
                        initialValues={initialValues}
                        onSubmit={values => {
                            const score = Object.values(values).reduce((total, value) => total + value, 0);
                            console.log(score);
                        }}
                    >
                        {({ setFieldValue, handleSubmit, values }) => (
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
                                <Button style={styles.button} onPress={handleSubmit}>{i18n.t('test.toResults')}</Button>
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
    questionContainer: {
        marginBottom: 20,
    },
    questionText: {
        marginBottom: 10,
    },
    button: {
        margin: 100,
    }
});

export default Test