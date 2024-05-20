import React, { useRef, useState } from 'react';
import { View, Text, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import { Icon } from '@ui-kitten/components';
import { Menu, MenuItem } from 'react-native-material-menu';
import { signOut } from 'firebase/auth';
import { auth } from '../../../firebaseConfig';
import { useNavigation } from '@react-navigation/native';

const MenuIcon = (props) => (
    <Icon {...props} name='more-vertical' />
);

export const TopNavigationBar = ({ title, subtitle }) => {
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
        navigation.navigate('Settings');
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
                <MenuItem onPress={handleLogout}>Logout</MenuItem>
                <MenuItem onPress={navigateToSettings}>Settings</MenuItem>
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
