import React, { useState, useContext } from 'react';
import { Button, Select, SelectItem, IndexPath, Text, Modal, Card } from '@ui-kitten/components';
import { LocaleContext } from '../../context/LocaleContext';


const LocaleSwitcher: React.FC = () => {
    const { locale, changeLocale } = useContext(LocaleContext);
    const locales = [ 'en', 'ru', 'ua' ];
    const [ selectedIndex, setSelectedIndex ] = useState(new IndexPath(locales.indexOf(locale)));
    const [ visible, setVisible ] = useState(false);

    const displayNames = [ 'English', 'Russian', 'Ukrainian' ];

    const handleConfirm = () => {
        changeLocale(locales[ selectedIndex.row ]);
        setVisible(false);
    };

    const renderFooter = () => (
        <React.Fragment>
            <Button onPress={() => setVisible(false)} appearance="ghost">
                Cancel
            </Button>
            <Button onPress={handleConfirm}>
                Confirm
            </Button>
        </React.Fragment>
    );

    return (
        <React.Fragment>
            <Select
                selectedIndex={selectedIndex}
                onSelect={index => setSelectedIndex(index as IndexPath)}
                value={displayNames[ selectedIndex.row ]}>
                {locales.map((locale, index) => (
                    <SelectItem key={index} title={displayNames[ index ]} />
                ))}
            </Select>
            <Button onPress={() => setVisible(true)}>
                Change Locale
            </Button>
            <Modal
                visible={visible}
                backdropStyle={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
                onBackdropPress={() => setVisible(false)}>
                <Card disabled={true} footer={renderFooter}>
                    <Text category='h6'>Confirm Locale Change</Text>
                    <Text>Are you sure you want to change the application language to {displayNames[ selectedIndex.row ]}?</Text>
                </Card>
            </Modal>
        </React.Fragment>
    );
};

export default LocaleSwitcher;