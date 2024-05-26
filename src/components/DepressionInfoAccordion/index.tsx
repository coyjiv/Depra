import { View } from "react-native";
import { Accordion } from "../Accordion";
import { useTranslation } from "react-i18next";

const DepressionInfoAccordion = () => {
    const { t, i18n } = useTranslation()

    const descriptions = {
        5: t('test.detailedDepressionLevelDescriptions.5'),
        10: t('test.detailedDepressionLevelDescriptions.10'),
        25: t('test.detailedDepressionLevelDescriptions.25'),
        50: t('test.detailedDepressionLevelDescriptions.50'),
        75: t('test.detailedDepressionLevelDescriptions.75'),
        suicidalNote: t('test.detailedDepressionLevelDescriptions.suicidalNote')
    };

    return (
        <View>
            <Accordion title="0-5" content={descriptions[ 5 ]} />
            <Accordion title="6-10" content={descriptions[ 10 ]} />
            <Accordion title="11-25" content={descriptions[ 25 ]} />
            <Accordion title="26-50" content={descriptions[ 50 ]} />
            <Accordion title="50+" content={descriptions[ 75 ]} />
            <Accordion title={t('test.suicidalNote')} content={descriptions.suicidalNote} />
        </View>
    );
};

export default DepressionInfoAccordion;