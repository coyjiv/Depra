// App.js
import React, { useState, useEffect, useCallback } from 'react';
import { SafeAreaView, View } from 'react-native';
import Settings from './src/views/Settings';
import { ApplicationProvider, BottomNavigation, BottomNavigationTab, IconRegistry, Layout } from '@ui-kitten/components';
import * as eva from '@eva-design/eva';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import { Text } from '@ui-kitten/components';
import 'react-native-gesture-handler';
import * as SplashScreen from 'expo-splash-screen';
import * as Localization from 'expo-localization';
import {
  useFonts,
  PTSans_400Regular,
  PTSans_400Regular_Italic,
  PTSans_700Bold,
  PTSans_700Bold_Italic,
} from '@expo-google-fonts/pt-sans';
import { Nunito_400Regular, Nunito_500Medium, Nunito_600SemiBold, Nunito_700Bold, Nunito_800ExtraBold } from '@expo-google-fonts/nunito';
import { default as customMapping } from './ui-kitten-custom-mapping.json';
import './src/i18n';


// Import your Firebase configuration
import app from './firebaseConfig'; // Ensure you have this file configured

// Screens
import { ScheduleScreen } from './src/views/ScheduleScreen';
import Stats from './src/views/Stats';
import Login from './src/views/Login';
import Signup from './src/views/Signup';
import Test from './src/views/Test';
import MoodScreen from './src/views/MoodScreen';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
// import i18n from './src/i18n';
import i18n from 'i18next'
import { initReactI18next, useTranslation } from 'react-i18next';
import translations from './src/constants/translations';
import { loadLanguage } from './src/components/LocaleSwitcher';
import { getUserInfo } from './src/api/BaseApi';
import useGlobalStore from './src/store';

// i18n.locale = ;
// i18n.locale = 'ua';

// i18n.enableFallback = true;
// i18n.defaultLocale = "en"

SplashScreen.preventAutoHideAsync();

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const RootStack = createNativeStackNavigator();

const AuthStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Login" component={Login} />
    <Stack.Screen name="Register" component={Signup} />
  </Stack.Navigator>
);

const BottomTabBar = ({ navigation, state }) => {
  const { t } = useTranslation()
  return (
    <BottomNavigation selectedIndex={state.index} onSelect={index => navigation.navigate(state.routeNames[ index ])}>
      <BottomNavigationTab title={t('tabs.moodDiary')} />
      <BottomNavigationTab title={t('tabs.test')} />
      <BottomNavigationTab title={t('tabs.progress')} />
    </BottomNavigation>
  )
};

const AppTabs = () => (
  <Tab.Navigator screenOptions={{ headerShown: false }} tabBar={props => <BottomTabBar {...props} />}>
    <Tab.Screen name="MoodDiary" component={MoodScreen} />
    <Tab.Screen name="TestRoot" component={Test} />
    <Tab.Screen name="Progress" component={Stats} />
  </Tab.Navigator>
);

export default function App() {
  const auth = getAuth(app);

  console.log(auth?.currentUser?.uid);

  const [ user, setUser ] = useState(null);
  // const { user, setUser } = useGlobalStore(state => state)

  const { t } = useTranslation();


  let [ fontsLoaded ] = useFonts({
    PTSans_400Regular,
    PTSans_400Regular_Italic,
    PTSans_700Bold,
    PTSans_700Bold_Italic,
    Nunito_400Regular,
    Nunito_500Medium,
    Nunito_600SemiBold,
    Nunito_700Bold,
    Nunito_800ExtraBold
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [ fontsLoaded ]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, setUser);
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const setupLanguage = async () => {
      const storedLanguage = await loadLanguage();
      if (storedLanguage) {
        i18n.changeLanguage(storedLanguage);
      }
    };

    setupLanguage();
  }, []);

  useEffect(() => {
    onLayoutRootView()

  }, [ onLayoutRootView ])


  if (!fontsLoaded) {
    return null
  }


  return (
    <ApplicationProvider {...eva} theme={eva.light} customMapping={customMapping as never}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <IconRegistry icons={EvaIconsPack} />
        <NavigationContainer>
          <RootStack.Navigator>
            <RootStack.Screen name="Main" component={user ? AppTabs : AuthStack} options={{ headerShown: false }} />
            <RootStack.Screen name="Settings" options={{
              headerTitle: () => (<Text>{t('settings.title')}</Text>)
            }} component={Settings} />
          </RootStack.Navigator>
        </NavigationContainer>
      </GestureHandlerRootView>
    </ApplicationProvider>
  );
}
