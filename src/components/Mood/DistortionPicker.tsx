import React, { useState } from 'react';
import { Autocomplete } from '../Autocomplete';
import { useTranslation } from 'react-i18next';

export const DistortionPicker = ({ placeholder, selected, onSelect, onRemove }): React.ReactElement => {
    const { t, i18n } = useTranslation()
    const distortions = (t('mood.distortionsList') as string[]).map(el => ({ title: el }));

    const [ distortionText, setDistortionText ] = useState('');
    const handleOnChange = (value) => {
        setDistortionText(value)
    }

    return (
        <Autocomplete withBadges placeholder={placeholder} selected={selected} onSelect={onSelect} onRemove={onRemove} options={distortions} inputValue={distortionText} onInputValueChange={handleOnChange} />
    );
};