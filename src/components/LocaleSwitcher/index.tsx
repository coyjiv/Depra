import React, { useState, useContext } from 'react';
import { Button, Select, SelectItem, IndexPath, Text, Modal, Card, Layout } from '@ui-kitten/components';
import { useTranslation } from 'react-i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';

const storeLanguage = async (language) => {
    try {
        await AsyncStorage.setItem('app_language', language);
    } catch (error) {
        console.error('Failed to save the language', error);
    }
};

export const loadLanguage = async () => {
    try {
        const language = await AsyncStorage.getItem('app_language');
        return language || null;
    } catch (error) {
        console.error('Failed to load the language', error);
        return null;
    }
};


const LocaleSwitcher: React.FC = () => {
    const { t, i18n } = useTranslation();

    console.log(i18n.language);


    const locales = [ 'en', 'ru', 'ua' ];
    console.log(i18n.language);

    const [ selectedIndex, setSelectedIndex ] = useState(new IndexPath(locales.indexOf(i18n.language.includes('en') ? 'en' : i18n.language.includes('ru') ? 'ru' : 'ua')));
    const [ visible, setVisible ] = useState(false);

    const displayNames = t('misc.languages');


    const handleConfirm = () => {
        const newLanguage = locales[ selectedIndex.row ];
        i18n.changeLanguage(newLanguage);
        storeLanguage(newLanguage);
        setVisible(false);
    };

    const renderFooter = () => (
        <React.Fragment>
            <Button onPress={() => setVisible(false)} appearance="ghost">
                {t('misc.cancel')}
            </Button>
            <Button onPress={handleConfirm}>
                {t('misc.confirm')}
            </Button>
        </React.Fragment>
    );

    return (
        <React.Fragment>
            <Layout style={{ paddingHorizontal: 20, marginTop: 20 }}>
                <Text category='h1' style={{ fontSize: 18, marginBottom: 10 }}>{t('misc.changeLanguage')}</Text>
                <Select
                    selectedIndex={selectedIndex}
                    onSelect={index => setSelectedIndex(index as IndexPath)}
                    value={displayNames[ selectedIndex.row ]}>
                    {locales.map((locale, index) => (
                        <SelectItem key={index} title={displayNames[ index ]} />
                    ))}
                </Select>
                <Button disabled={i18n.language.includes(locales[ selectedIndex.row ])} style={{ marginTop: 10 }} onPress={() => setVisible(true)}>
                    {t('misc.changeLanguage')}
                </Button>
            </Layout>
            <Modal
                visible={visible}
                backdropStyle={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
                onBackdropPress={() => setVisible(false)}>
                <Card style={{ marginHorizontal: 20 }} disabled={true} footer={renderFooter}>
                    <Text category='h6'>{t('misc.confirmLanguageChange')}</Text>
                    <Text>{t('misc.languageChangeDescription')} {displayNames[ selectedIndex.row ]}?</Text>
                </Card>
            </Modal>
        </React.Fragment>
    );
};

export default LocaleSwitcher;