import React, { useCallback, useRef } from 'react';
import { Input, Layout, Card, AutocompleteItem, Text } from '@ui-kitten/components';
import { i18n } from '../../i18n';
import { ScrollView } from 'react-native-gesture-handler';
import { Alert, Keyboard, TouchableWithoutFeedback } from 'react-native';
import Badge from '../Badge';

const filter = (item, query, existing = []): boolean => {
    const queryLower = query.toLowerCase();
    const isNotSelected = !existing.some(el => el.title.toLowerCase() === item.title.toLowerCase());
    return isNotSelected && item.title.toLowerCase().includes(queryLower);
};

type AutocompleteProps = {
    options: { title: string, emotionPercentage?: number }[];
    placeholder: string;
    selected: { title: string, emotionPercentage: number }[];
    onSelect: (item: { title: string, emotionPercentage?: number }) => void;
    onRemove: (item: { title: string, emotionPercentage?: number }) => void;
    inputValue: string;
    onInputValueChange: (value: string) => void;
    onBadgeUpdate?: (item: { title: string, emotionPercentage?: number }) => void;
    withBadges?: boolean;
    withBadgePercentage?: boolean;
}

export const Autocomplete = ({ options: data, placeholder, selected = [], onSelect, onRemove, inputValue, onInputValueChange, onBadgeUpdate, withBadges = true, withBadgePercentage = false }): React.ReactElement<AutocompleteProps> => {
    const [ panelVisible, setPanelVisible ] = React.useState(false);
    const [ options, setOptions ] = React.useState(data);

    const inputRef = useRef(null);

    const handleSelect = useCallback((item): void => {
        setPanelVisible(false);
        onInputValueChange('');
        onSelect({ ...item, emotionPercentage: 0 });
    }, [ selected ]);

    const onChangeText = (query): void => {
        onInputValueChange(query);
        // Filter out selected items and those not matching the query
        const filteredData = data.filter(item => filter(item, query, selected));
        setOptions(filteredData);
        if (query.length > 0) {
            setPanelVisible(true);
        } else {
            setPanelVisible(false);
        }
    }


    // console.log('selected ', selected);




    const renderOption = (item, index): React.ReactElement => (
        <AutocompleteItem
            onPress={() => handleSelect(item)}
            key={index}
            focusable
            title={item.title}
        />
    );

    return (
        // <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <Layout style={{ marginTop: 25 }}>
            <Input
                textStyle={{ fontSize: 18 }}
                placeholder={placeholder}
                value={inputValue}
                onChangeText={onChangeText}
            // onPressOut={() => setPanelVisible(false)}
            // ref={inputRef}
            />
            {panelVisible && options.length > 0 && <Card>
                <ScrollView keyboardShouldPersistTaps='handled' style={{ maxHeight: 200 }}>
                    <Layout>
                        {options.map(renderOption)}
                    </Layout>
                </ScrollView>
            </Card>}
            {withBadges && selected.length > 0 &&
                <Layout>
                    {selected.map((item, index) => (
                        <Badge withBadgePercentage={withBadgePercentage} emotionPercentage={item.emotionPercentage} onBadgePercentageChange={(item) => onBadgeUpdate && onBadgeUpdate(item)} onCross={() => onRemove(item)} key={index} title={item.title} />))}
                </Layout>}
        </Layout>
        // </TouchableWithoutFeedback>
    );
};