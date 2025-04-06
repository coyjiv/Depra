import { Text } from "@ui-kitten/components"
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ViewRecord from "../components/Mood/ViewRecord";
import { MoodDoc } from "../../types";
import { useTranslation } from "react-i18next";
import { MoodScreenHome } from "../components/Mood/MoodScreenHome";


type RootStackParamList = {
    Home: undefined;
    ViewRecord: { mood: MoodDoc };
};
const Stack = createNativeStackNavigator<RootStackParamList>();

const MoodScreen = () => {
    const { t, i18n } = useTranslation();

    return (
        <Stack.Navigator>
            <Stack.Screen options={{ headerShown: false }} name="Home" component={MoodScreenHome} />
            <Stack.Screen name="ViewRecord" options={{ headerTitle: () => (<Text>{t('mood.viewRecord')}</Text>) }} component={ViewRecord} />
        </Stack.Navigator>
    )

}

export default MoodScreen