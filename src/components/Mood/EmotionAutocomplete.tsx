
import { useState } from 'react';
import { Autocomplete } from '../Autocomplete';
import { useTranslation } from 'react-i18next';




export const EmotionAutocomplete = ({ placeholder, selected, onSelect, onRemove, onEmotionUpdate, onPressIn }): React.ReactElement => {
    const { t } = useTranslation()

    const emotions = (t('mood.emotions') as unknown as string[]).map(el => ({ title: el, emotionPercentage: 0 }));
    const [ emotionText, setEmotionText ] = useState('');
    const handleOnChange = (value) => {
        setEmotionText(value)
    }

    return (
        <Autocomplete onPressIn={onPressIn} withBadgePercentage withBadges onBadgeUpdate={onEmotionUpdate} placeholder={placeholder} selected={selected} onSelect={onSelect} onRemove={onRemove} options={emotions} inputValue={emotionText} onInputValueChange={handleOnChange} />
    );
};