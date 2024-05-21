import { useState } from "react";
import { i18n } from "../../i18n";
import { SafeAreaView } from "react-native-safe-area-context";
import { Divider, Layout, Text } from "@ui-kitten/components";
import { commonStyles } from "../../styles/common";
import { Dimensions, StyleSheet } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { Formik } from "formik";
import { QuestionItem } from "./QuestionItem";
import Button from "../Button";
import { TopNavigationBar } from "../TopNavigationBar";

export const Test = ({ navigation }) => {

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
            <TopNavigationBar />
            <Layout style={{ height: Dimensions.get('screen').height - 100, paddingTop: 20, paddingLeft: 20 }}>
                <Text category="h1" style={commonStyles.heading}>{i18n.t('test.title')}</Text>

                {step === 0 && <Text style={{ paddingHorizontal: 20, fontSize: 20 }}>{copy}</Text>}

                {step === 0 && !shouldPassTest && <Text style={{ paddingHorizontal: 40, marginTop: 40, fontSize: 20 }}>{(i18n.t('test.blockerInfo') as (string) => string)('18.05.2024')}</Text>}

                {step === 0 && <Layout style={{ flexDirection: 'row', backgroundColor: 'transparent', justifyContent: 'center', marginTop: 30, gap: 20 }}>
                    <Button textProps={{ category: 's1' }} disabled={shouldPassTest} onPress={() => setStep(1)}>{i18n.t('test.takeTest')}</Button>
                    <Button textProps={{ category: 's1' }} onPressIn={() => navigation.navigate('Progress')}>{i18n.t('test.showProgress')}</Button>
                </Layout>}

                {step === 1 && <ScrollView style={styles.container}>
                    <Formik
                        initialValues={initialValues}
                        onSubmit={values => {
                            const score = Object.values<number>(values).reduce((total, value) => total + value, 0);
                            console.log(score);
                            navigation.navigate('Results', { score });
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
                                <Button textProps={{ category: 's1' }} style={styles.button} onPress={handleSubmit as never}>{i18n.t('test.toResults')}</Button>
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
    }
});