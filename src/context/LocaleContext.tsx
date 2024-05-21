import React, { createContext, useContext, useState, useEffect } from 'react';
import * as Localization from 'expo-localization';
import { i18n } from '../i18n';

interface LocaleContextType {
    locale: string;
    changeLocale: (newLocale: string) => void;
}

const defaultContextValue: LocaleContextType = {
    locale: Localization.locale,
    changeLocale: () => { }
};

export const LocaleContext = createContext<LocaleContextType>(defaultContextValue);

export const LocaleProvider = ({ children }) => {
    const [ locale, setLocale ] = useState(Localization.locale);

    useEffect(() => {
        i18n.locale = locale;
        // Any other action that needs to happen when locale changes
    }, [ locale ]);

    const changeLocale = (newLocale) => {
        setLocale(newLocale);
    };

    return (
        <LocaleContext.Provider value={{ locale, changeLocale }}>
            {children}
        </LocaleContext.Provider>
    );
};

export const useLocale = () => useContext(LocaleContext);
