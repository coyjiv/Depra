// App.js
import React, { useState, useEffect, useCallback } from 'react';
import { SafeAreaView, Text, View } from 'react-native';
import Settings from './src/views/Settings';
import { ApplicationProvider, BottomNavigation, BottomNavigationTab, IconRegistry, Layout } from '@ui-kitten/components';
import * as eva from '@eva-design/eva';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import { ViewPager } from '@ui-kitten/components';
import 'react-native-gesture-handler';
import * as SplashScreen from 'expo-splash-screen';
import { useFonts, PatrickHand_400Regular, } from '@expo-google-fonts/patrick-hand';
import { Nunito_400Regular, Nunito_500Medium, Nunito_600SemiBold, Nunito_700Bold, Nunito_800ExtraBold } from '@expo-google-fonts/nunito';
import { default as customMapping } from './ui-kitten-custom-mapping.json';


// Import your Firebase configuration
import app from './firebaseConfig'; // Ensure you have this file configured

// Screens
import { HomeScreen } from './src/views/HomeScreen';
import { ScheduleScreen } from './src/views/ScheduleScreen';
import Stats from './src/views/Stats';
import Login from './src/views/Login';
import Signup from './src/views/Signup';
import Test from './src/views/Test';
import MoodScreen from './src/views/MoodScreen';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { i18n } from './src/i18n';
import * as Localization from 'expo-localization';

i18n.locale = Localization.locale;
// i18n.locale = 'en';

i18n.enableFallback = true;
i18n.defaultLocale = "en"

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

const BottomTabBar = ({ navigation, state }) => (
  <BottomNavigation selectedIndex={state.index} onSelect={index => navigation.navigate(state.routeNames[ index ])}>
    <BottomNavigationTab title={i18n.t('tabs.moodDiary')} />
    <BottomNavigationTab title={i18n.t('tabs.test')} />
    <BottomNavigationTab title={i18n.t('tabs.progress')} />
  </BottomNavigation>
);

const AppTabs = () => (
  <Tab.Navigator screenOptions={{ headerShown: false }} tabBar={props => <BottomTabBar {...props} />}>
    <Tab.Screen name="Дневник настроения" component={MoodScreen} />
    <Tab.Screen name="Тест" component={Test} />
    <Tab.Screen name="Прогрес" component={Stats} />
  </Tab.Navigator>
);

export default function App() {


  let [ fontsLoaded ] = useFonts({
    PatrickHand_400Regular,
    Nunito_400Regular,
    Nunito_500Medium,
    Nunito_600SemiBold,
    Nunito_700Bold,
    Nunito_800ExtraBold
  });

  const [ user, setUser ] = useState(null);
  const auth = getAuth(app);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, setUser);
    return () => unsubscribe();
  }, []);

  const theme = {
    ...eva.light,
    'text-font-family': 'PatrickHand_400Regular',
    'text-heading-1-font-family': 'Nunito_700Bold',
    'text-heading-5-font-family': 'Nunito_400Regular',
  };

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [ fontsLoaded ]);

  useEffect(() => {
    onLayoutRootView()

  }, [ onLayoutRootView ])


  if (!fontsLoaded) {
    return null;
  }


  return (
    <ApplicationProvider {...eva} theme={theme} customMapping={customMapping}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <IconRegistry icons={EvaIconsPack} />
        <NavigationContainer>
          <RootStack.Navigator>
            <RootStack.Screen name="Main" component={user ? AppTabs : AuthStack} options={{ headerShown: false }} />
            <RootStack.Screen name="Settings" component={Settings} />
          </RootStack.Navigator>
        </NavigationContainer>
      </GestureHandlerRootView>
    </ApplicationProvider>
  );
}
