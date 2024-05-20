
import { useState } from 'react';
import { i18n } from '../../i18n';
import { Autocomplete } from '../Autocomplete';




export const EmotionAutocomplete = ({ placeholder, selected, onSelect, onRemove, onEmotionUpdate }): React.ReactElement => {
    const emotions = (i18n.t('mood.emotions') as string[]).map(el => ({ title: el, emotionPercentage: 0 }));
    const [ emotionText, setEmotionText ] = useState('');
    const handleOnChange = (value) => {
        setEmotionText(value)
    }

    return (
        <Autocomplete withBadgePercentage withBadges onBadgeUpdate={onEmotionUpdate} placeholder={placeholder} selected={selected} onSelect={onSelect} onRemove={onRemove} options={emotions} inputValue={emotionText} onInputValueChange={handleOnChange} />
    );
};