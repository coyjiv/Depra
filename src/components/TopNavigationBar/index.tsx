import React from 'react';
import {
    Icon,
    IconElement,
    Layout,
    MenuItem,
    OverflowMenu,
    TopNavigation,
    TopNavigationAction,
} from '@ui-kitten/components';
import { Alert, StyleSheet } from 'react-native';
import { TouchableWebElement } from '@ui-kitten/components/devsupport';
import { signOut } from 'firebase/auth';
import { auth } from '../../../firebaseConfig';
import { useNavigation } from '@react-navigation/native';

const BackIcon = (props): IconElement => (
    <Icon
        {...props}
        name='arrow-back'
    />
);

const EditIcon = (props): IconElement => (
    <Icon
        {...props}
        name='edit'
    />
);

const MenuIcon = (props): IconElement => (
    <Icon
        {...props}
        name='more-vertical'
    />
);

const InfoIcon = (props): IconElement => (
    <Icon
        {...props}
        name='info'
    />
);

const LogoutIcon = (props): IconElement => (
    <Icon
        {...props}
        name='log-out'
    />
);

export const TopNavigationBar = ({ title, subtitle }): React.ReactElement => {

    const navigation = useNavigation();

    const [ menuVisible, setMenuVisible ] = React.useState(false);

    const toggleMenu = (): void => {
        setMenuVisible(!menuVisible);
    };

    const renderMenuAction = (): React.ReactElement => (
        <TopNavigationAction
            icon={MenuIcon}
            onPress={toggleMenu}
        />
    );

    const renderRightActions = (): React.ReactElement => (
        <>
            {/* <TopNavigationAction icon={EditIcon} /> */}
            <OverflowMenu
                anchor={renderMenuAction}
                visible={menuVisible}
                onBackdropPress={toggleMenu}
            >
                <MenuItem
                    accessoryLeft={InfoIcon}
                    title='About'
                />
                <MenuItem
                    onPress={() => {
                        signOut(auth).then(() => {
                            console.log("Logged out successfully");

                        }).catch((error) => {
                            Alert.alert('Error', error.message, [ { text: 'OK' } ], { cancelable: true });
                        });
                    }}
                    accessoryLeft={LogoutIcon}
                    title='Logout'
                />
            </OverflowMenu>
        </>
    );

    const renderBackAction = (): TouchableWebElement => (
        <TopNavigationAction icon={BackIcon} />
    );

    return (
        <Layout
            style={styles.container}
            level='1'
        >
            <TopNavigation
                alignment='center'
                title={title ?? false}
                subtitle={subtitle ?? false}
                // accessoryLeft={renderBackAction}
                accessoryRight={renderRightActions}
            />
        </Layout>
    );
};

const styles = StyleSheet.create({
    container: {
        // minHeight: 128,
    },
});