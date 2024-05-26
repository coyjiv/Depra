import { useEffect, useMemo, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Divider, Layout, Text } from '@ui-kitten/components';
import { ScrollView } from 'react-native-gesture-handler';
import DepressionInfoAccordion from '../components/DepressionInfoAccordion';
import { useTranslation } from 'react-i18next';
import { TopNavigationBar } from '../components/TopNavigationBar';
import { View, BackHandler } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export const Results = ({ route }) => {
    const { t, i18n } = useTranslation();
    const navigation = useNavigation()

    const { score } = route.params
    const depressionLevel = useMemo(() => {
        const levels = t('test.depressionLevels');
        const sortedKeys = Object.keys(levels).sort((a, b) => Number(a) - Number(b));
        const key = sortedKeys.find(key => score <= key);
        return levels[ key ];
    }, [ score, t ]);

    const depressionLevelDescription = useMemo(() => {
        const descriptions = t('test.depressionLevelDescriptions');
        const sortedKeys = Object.keys(descriptions).sort((a, b) => Number(a) - Number(b));
        const key = sortedKeys.find(key => score <= key);
        return descriptions[ key ];
    }, [ score, t ]);

    console.log(score, depressionLevel, depressionLevelDescription);

    const [ isCollapsed, setIsCollapsed ] = useState(true);

    useEffect(() => {
        const backAction = () => {
            // Define the specific navigation action
            navigation.navigate('Test', {
                resetState: true
            });
            return true;
        };

        BackHandler.addEventListener('hardwareBackPress', backAction);

        return () => {
            BackHandler.removeEventListener('hardwareBackPress', backAction);
        };
    }, []);
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <TopNavigationBar />
            <Divider />
            <View style={{ flex: 1, padding: 20, height: '100%' }}>
                <Text category="h1">{t('test.resultsTitle')}</Text>
                <Text category='h2' style={{ fontSize: 25, marginTop: 20 }}>{t('test.resultsScore')} {score}</Text>
                <Text style={{ fontSize: 22, marginVertical: 20 }}>{t('test.depressionLevel')} {depressionLevel}</Text>
                <ScrollView style={{ flex: 1 }}>
                    <Text category='s1' style={{ fontSize: 25 }}>{t('test.whatDoesItMean')}</Text>
                    <Layout style={{ marginTop: 20, padding: 15, borderRadius: 20 }}>
                        <Text category='s1' style={{ fontSize: 20, marginBottom: 20 }}>{depressionLevelDescription}</Text>
                        <Text category='s1' style={{ fontSize: 20, marginBottom: 20 }}>{t('test.detailedInformation')}</Text>
                        <DepressionInfoAccordion />
                    </Layout>
                </ScrollView>
            </View>
        </SafeAreaView>
    )
}