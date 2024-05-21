import { Layout, Radio, RadioGroup, Text } from "@ui-kitten/components";
import { memo, useCallback } from "react";
import { i18n } from "../../i18n";
import { StyleSheet } from "react-native";

interface QuestionItemProps {
    question: string;
    index: number;
    value: number;
    setValue: (key: string, value: number) => void;
}

export const QuestionItem = memo(({ question, index, value, setValue }: QuestionItemProps) => {
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

const styles = StyleSheet.create({
    questionContainer: {
        marginBottom: 20,
    },
    questionText: {
        marginBottom: 10,
    },
})
