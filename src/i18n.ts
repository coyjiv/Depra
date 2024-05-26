import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import translations from "./constants/translations";
import * as Localization from 'expo-localization';

i18n.use(initReactI18next).init({
    compatibilityJSON: 'v3',
    resources: translations,
    lng: Localization.locale.split('-')[ 0 ],
    fallbackLng: 'en',
    returnObjects: true,
});

export default i18n;


// export const i18n = new I18n(translations);