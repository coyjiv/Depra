import React, { useCallback, useRef } from 'react';
import { Input, Layout, Card, AutocompleteItem, Text } from '@ui-kitten/components';
import { i18n } from '../../i18n';
import { ScrollView } from 'react-native-gesture-handler';
import { Keyboard, TouchableWithoutFeedback } from 'react-native';

const emotions = (i18n.t('mood.emotions') as string[]).map(el => ({ title: el }));

const filter = (item, query): boolean => item.title.toLowerCase().includes(query.toLowerCase());

export const EmotionAutocomplete = (): React.ReactElement => {
    const [ panelVisible, setPanelVisible ] = React.useState(false);

    const inputRef = useRef(null);

    const [ value, setValue ] = React.useState(null);
    const [ data, setData ] = React.useState(emotions);

    const onSelect = useCallback((index): void => {
        setValue(data[ index ].title);
    }, [ data ]);

    const onChangeText = (query): void => {
        setValue(query);
        setData(emotions.filter(item => filter(item, query)));
        if (!panelVisible && query.length > 0) {
            setPanelVisible(true)
        } else {
            setPanelVisible(false)
        }
    }

    const renderOption = (item, index): React.ReactElement => (
        <AutocompleteItem
            // style={{ backgroundColor: 'red' }}
            onPress={() => onSelect(index)}
            key={index}
            title={item.title}
        />
    );

    return (
        <TouchableWithoutFeedback style={{ backgroundColor: 'red' }} onPress={() => {
            // Закрытие клавиатуры
            Keyboard.dismiss();
            // Любые другие действия, например, сброс фокуса с TextInput
            inputRef.current.blur();
        }}>
            <Layout>
                <Input
                    placeholder='Place your Text'
                    value={value}
                    onChangeText={onChangeText}
                    onPressOut={() => setPanelVisible(false)}
                    ref={inputRef}
                />
                {panelVisible && data.length > 0 && <Card>
                    <ScrollView style={{ maxHeight: 200 }}>
                        <Layout>
                            {data.map(renderOption)}
                        </Layout>
                    </ScrollView>
                </Card>}
            </Layout>
        </TouchableWithoutFeedback>
    );
};