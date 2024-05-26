import React, { useRef, useState } from 'react';
import { View, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import { Icon, Text } from '@ui-kitten/components';
import { Menu, MenuItem } from 'react-native-material-menu';
import { signOut } from 'firebase/auth';
import { auth } from '../../../firebaseConfig';
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';

const MenuIcon = (props) => (
    <Icon {...props} name='more-vertical' />
);

export const TopNavigationBar = ({ title, subtitle }: { title?: string, subtitle?: string }) => {
    const { t } = useTranslation();
    const [ menuVisible, setMenuVisible ] = useState(false);
    const menuRef = useRef(null);
    const navigation = useNavigation();

    const toggleMenu = () => {
        setMenuVisible(!menuVisible);
    };

    const handleLogout = () => {
        signOut(auth).then(() => {
            Alert.alert("Logout successful");
        }).catch((error) => {
            Alert.alert("Logout failed", error.message);
        });
        toggleMenu();
    };

    const navigateToSettings = () => {
        navigation.navigate('Settings' as never);
        toggleMenu();
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>{title}</Text>
            <Menu
                ref={menuRef}
                visible={menuVisible}
                anchor={
                    <TouchableOpacity onPress={toggleMenu} style={styles.menuButton}>
                        <MenuIcon fill='#000' style={styles.icon} />
                    </TouchableOpacity>
                }
                onRequestClose={toggleMenu}
            >
                <MenuItem onPress={navigateToSettings}><Text>{t('settings.title')}</Text></MenuItem>
                <MenuItem onPress={handleLogout}><Text>{t('misc.logout')}</Text></MenuItem>
            </Menu>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,
        backgroundColor: '#eee',
    },
    title: {
        fontSize: 20,
    },
    menuButton: {
        paddingHorizontal: 10,
    },
    icon: {
        width: 24,
        height: 24,
    }
});
