import React from 'react';
import { SafeAreaView, StatusBar, Touchable, View } from 'react-native';
import { ApplicationProviderProps, Button, Divider, Layout, Text, useTheme } from '@ui-kitten/components';
import { Navigation } from '../../types';
import { BottomNavigator } from '../components/Navigation/BottomNavigation';
import { TopNavigationBar } from '../components/TopNavigationBar';

export const HomeScreen = ({ navigation, ...props }: any) => {

    const theme = useTheme();


    return (
        <SafeAreaView style={{ flex: 1, marginTop: StatusBar.currentHeight }}>
            <TopNavigationBar title={'Home'} subtitle={'test'} />
            <Divider />
            <Layout style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: theme[ 'color-success-200' ] }}>
                <Text category='h1' style={{ marginTop: 100, textAlign: 'center', paddingHorizontal: 40 }}>Помощник по борьбе с депресухой</Text>


                <Layout style={{ marginTop: 100, justifyContent: 'center', gap: 20, backgroundColor: 'transparent' }}>
                    <Button style={{ marginBottom: 'auto', borderRadius: 20, backgroundColor: theme[ 'color-success-400' ], borderColor: theme[ 'color-success-900' ] }} size="medium" >Тест Бернса</Button>
                    <Button style={{ marginBottom: 'auto', borderRadius: 20, backgroundColor: theme[ 'color-success-400' ], borderColor: theme[ 'color-success-900' ] }} size="medium" >Дневник настроения</Button>
                    <Button style={{ marginBottom: 'auto', borderRadius: 20, backgroundColor: theme[ 'color-success-400' ], borderColor: theme[ 'color-success-900' ] }} >Статистика</Button>
                </Layout>
            </Layout>
        </SafeAreaView>
    );
};

