import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import translations from "./constants/translations";
import { getLocales } from "expo-localization";

i18n.use(initReactI18next).init({
    compatibilityJSON: 'v3',
    resources: translations,
    lng: getLocales()[ 0 ].regionCode,
    fallbackLng: 'en',
    returnObjects: true,
});

export default i18n;


// export const i18n = new I18n(translations);