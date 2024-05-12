// App.js
import React, { useState, useEffect } from 'react';
import { SafeAreaView, Text, View } from 'react-native';
import { ApplicationProvider, BottomNavigation, BottomNavigationTab, IconRegistry, Layout } from '@ui-kitten/components';
import * as eva from '@eva-design/eva';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import { ViewPager } from '@ui-kitten/components';
import 'react-native-gesture-handler';


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

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

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
  const [ user, setUser ] = useState(null);
  const auth = getAuth(app);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, setUser);
    return () => unsubscribe();
  }, []);

  return (
    <ApplicationProvider {...eva} theme={eva.light}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <IconRegistry icons={EvaIconsPack} />
        <NavigationContainer>

          {user ? <AppTabs /> : <AuthStack />}
        </NavigationContainer>
      </GestureHandlerRootView>
    </ApplicationProvider>
  );
}
