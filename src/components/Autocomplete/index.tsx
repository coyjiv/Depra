import React, { useCallback, useRef } from 'react';
import { Input, Layout, Card, AutocompleteItem, Text } from '@ui-kitten/components';
import { i18n } from '../../i18n';
import { ScrollView } from 'react-native-gesture-handler';
import { Alert, Keyboard, TouchableWithoutFeedback } from 'react-native';
import Badge from '../Badge';

const filter = (item, query): boolean => item.title.toLowerCase().includes(query.toLowerCase());

export const Autocomplete = ({ options: data, placeholder, selected = [], onSelect, onRemove, inputValue, onInputValueChange, onEmotionUpdate }): React.ReactElement => {
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
        // filter

        const filteredData = data.filter(item => filter(item, query));
        setOptions(filteredData);
        if (!panelVisible && query.length > 0) {
            setPanelVisible(true)
        } else {
            setPanelVisible(false)
        }
    }

    console.log('selected ', selected);




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
            {selected.length > 0 &&
                <Layout>
                    {selected.map((item, index) => (
                        <Badge emotionPercentage={item.emotionPercentage} onEmotionPercentageChange={(item) => onEmotionUpdate(item)} onCross={() => onRemove(item)} key={index} title={item.title} />))}
                </Layout>}
        </Layout>
        // </TouchableWithoutFeedback>
    );
};