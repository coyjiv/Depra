import { useMemo, useState } from 'react';
import { i18n } from '../i18n';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Layout, Text } from '@ui-kitten/components';
import { ScrollView } from 'react-native-gesture-handler';
import DepressionInfoAccordion from '../components/DepressionInfoAccordion';

export const Results = ({ route }) => {
    const { score } = route.params
    const depressionLevel = useMemo(() => i18n.t('test.depressionLevels')[ Object.keys(i18n.t('test.depressionLevels')).reduce((prev, curr) => curr <= score ? curr : prev) ], [ score ])
    const depressionLevelDescription = useMemo(() => i18n.t('test.depressionLevelDescriptions')[ Object.keys(i18n.t('test.depressionLevelDescriptions')).reduce((prev, curr) => curr <= score ? curr : prev) ], [ score ])

    const [ isCollapsed, setIsCollapsed ] = useState(true);
    return (
        <SafeAreaView style={{ flex: 1, padding: 20 }}>
            <Text category="h1">{i18n.t('test.resultsTitle')}</Text>
            <Text category='h2' style={{ fontSize: 25, marginTop: 20 }}>{i18n.t('test.resultsScore')} {score}</Text>
            <Text style={{ fontSize: 22, marginVertical: 20 }}>{i18n.t('test.depressionLevel')} {depressionLevel}</Text>
            <ScrollView style={{ flex: 1 }}>
                <Text category='s1' style={{ fontSize: 25 }}>{i18n.t('test.whatDoesItMean')}</Text>
                <Layout style={{ marginTop: 20, padding: 15, borderRadius: 20 }}>
                    <Text category='s1' style={{ fontSize: 20, marginBottom: 20 }}>{depressionLevelDescription}</Text>
                    <Text category='s1' style={{ fontSize: 20, marginBottom: 20 }}>{i18n.t('test.detailedInformation')}</Text>
                    <DepressionInfoAccordion />
                </Layout>
            </ScrollView>
        </SafeAreaView>
    )
}