import { Layout, Radio, RadioGroup, Text } from "@ui-kitten/components";
import { memo, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { StyleSheet } from "react-native";

interface QuestionItemProps {
    question: string;
    index: number;
    value: number;
    setValue: (key: string, value: number) => void;
}

export const QuestionItem = memo(({ question, index, value, setValue }: QuestionItemProps) => {
    const { t, i18n } = useTranslation()
    const handleRadioChange = useCallback((nextValue) => {
        setValue(`question${index + 1}`, nextValue);
    }, [ setValue, index ]);

    return (
        <Layout style={styles.questionContainer}>
            <Text style={styles.questionText}>{index + 1 + ". "} {question}</Text>
            <RadioGroup selectedIndex={value} onChange={handleRadioChange}>
                {(t('test.testOptions', { returnObjects: true }) as string[]).map((option, idx) => (
                    <Radio key={idx}>{option}</Radio>
                ))}
            </RadioGroup>
        </Layout>
    );
});

const styles = StyleSheet.create({
    questionContainer: {
        marginBottom: 20,
    },
    questionText: {
        marginBottom: 10,
    },
})
