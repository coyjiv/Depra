import { Button, Divider, Input, Layout, Radio, RadioGroup, Text } from "@ui-kitten/components"
import { Formik, useFormik } from "formik"
import { memo, useCallback, useEffect, useState } from "react";
import { ScrollView, StyleSheet } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"

const QuestionItem = memo(({ question, index, value, setValue }) => {
    const handleRadioChange = useCallback((nextValue) => {
        setValue(`question${index + 1}`, nextValue);
    }, [ setValue, index ]);

    return (
        <Layout style={styles.questionContainer}>
            <Text style={styles.questionText}>{index + 1 + ". "} {question}</Text>
            <RadioGroup selectedIndex={value} onChange={handleRadioChange}>
                {[ "Совсем нет", "Немного", "Умеренно", "Сильно", "Крайне" ].map((option, idx) => (
                    <Radio key={idx}>{option}</Radio>
                ))}
            </RadioGroup>
        </Layout>
    );
});

const copy = `
Для того чтобы отслеживать прогрес 
излечения депрессии, умный человек Девид Бернс придумал простой тест на 25 вопросов, который довольно точно может определить уровень вашей депрессии.

Хорошей идеей будет 
проходить его раз в неделю, для понимания, 
помогают ли вам ваши способы лечения,
или же нужно что-то менять 
`

const questions = [
    "У вас плохое настроение?",
    "Вы чувствуете себя несчастным?",
    "Вы чувствуете желание расплакаться или кричать?",
    "Вы ощущаете разочарованность своей жизнью?",
    "Вы испытываете чувство безнадежности?",
    "Вы ощущаете низкую самооценку?",
    "Вы чувствуете себя бесполезным?",
    "Вы испытываете чувство вины или стыда?",
    "Вы обвиняете в бедах самого себя или, наоборот, обвиняете других?",
    "Вы испытываете трудности с принятием решений?",
    "Вы чувствуете потерю интереса к членам семьи, друзьям, коллегам?",
    "Вы испытываете одиночество?",
    "Вы проводите меньше времени с семьей или с друзьями?",
    "Вы чувствуете потерю мотивации?",
    "Вы чувствуете потерю интереса к работе или другим занятиям?",
    "Вы избегаете работы и другой деятельности?",
    "Вы ощущаете потерю удовольствия и нехватку удовлетворения от жизни?",
    "Вы чувствуете усталость?",
    "Вы испытываете затруднения со сном или, наоборот, спите слишком много?",
    "Вы имеете сниженный или, наоборот, повышенный аппетит?",
    "Вы замечаете потерю интереса к сексу?",
    "Вы беспокоитесь по поводу своего здоровья?",
    "Имеются ли у вас суицидальные мысли?",
    "Хотели бы вы окончить свою жизнь?",
    "Планируете ли вы навредить себе?"
];

const answerOptions = [ "Совсем нет", "Немного", "Умеренно", "Сильно", "Крайне" ];

const Test = () => {

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
                <Text style={styles.heading}>Тест Бернса</Text>
                {step === 0 && <Text style={{ paddingHorizontal: 20 }}>{copy}</Text>}
                {step === 0 && !shouldPassTest && <Text style={{ paddingHorizontal: 40, fontSize: 20 }}>Вы уже проходили тест на этой неделе,
                    следующая дата - 18.05.2024</Text>}
                {step === 0 && <Layout style={{ flexDirection: 'row', backgroundColor: 'transparent', justifyContent: 'center', marginTop: 30, gap: 20 }}>
                    <Button disabled={!shouldPassTest} onPress={() => setStep(1)}>Пройти тест</Button>
                    <Button>Посмотреть прогрес</Button>
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
                                <Button style={styles.button} onPress={handleSubmit}>Отправить</Button>
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