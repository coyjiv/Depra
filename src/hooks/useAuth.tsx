import { useEffect } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { useNavigation } from '@react-navigation/native';
import app from '../../firebaseConfig';

export const useAuth = () => {
    const auth = getAuth(app);
    const navigation = useNavigation();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                // User is signed in, navigate to the Home screen
                navigation.navigate('Home' as never);
            } else {
                // User is signed out, navigate to the Login screen
                navigation.navigate('Login' as never);
            }
        });

        // Clean up the subscription
        return unsubscribe;
    }, [ auth, navigation ]);

    return { auth };
}
