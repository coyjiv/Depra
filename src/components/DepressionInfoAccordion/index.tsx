import { View } from "react-native";
import { i18n } from "../../i18n";
import { Accordion } from "../Accordion";

const DepressionInfoAccordion = () => {
    const descriptions = {
        5: i18n.t('test.detailedDepressionLevelDescriptions.5'),
        10: i18n.t('test.detailedDepressionLevelDescriptions.10'),
        25: i18n.t('test.detailedDepressionLevelDescriptions.25'),
        50: i18n.t('test.detailedDepressionLevelDescriptions.50'),
        75: i18n.t('test.detailedDepressionLevelDescriptions.75'),
        suicidalNote: i18n.t('test.detailedDepressionLevelDescriptions.suicidalNote')
    };

    return (
        <View>
            <Accordion title="0-5" content={descriptions[ 5 ]} />
            <Accordion title="6-10" content={descriptions[ 10 ]} />
            <Accordion title="11-25" content={descriptions[ 25 ]} />
            <Accordion title="26-50" content={descriptions[ 50 ]} />
            <Accordion title="50+" content={descriptions[ 75 ]} />
            <Accordion title={i18n.t('test.suicidalNote')} content={descriptions.suicidalNote} />
        </View>
    );
};

export default DepressionInfoAccordion;