import React, { useState } from 'react';
import { i18n } from '../../i18n';
import { Autocomplete } from '../Autocomplete';

export const DistortionPicker = ({ placeholder, selected, onSelect, onRemove }): React.ReactElement => {
    const distortions = (i18n.t('mood.distortionsList') as string[]).map(el => ({ title: el }));

    const [ distortionText, setDistortionText ] = useState('');
    const handleOnChange = (value) => {
        setDistortionText(value)
    }

    return (
        <Autocomplete withBadges placeholder={placeholder} selected={selected} onSelect={onSelect} onRemove={onRemove} options={distortions} inputValue={distortionText} onInputValueChange={handleOnChange} />
    );
};