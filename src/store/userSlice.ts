import { Timestamp } from 'firebase/firestore';
import { User } from '../../types';

export interface UserState {
    user: User,
    setUser: (user: Partial<User>) => void;
}

export const createUserSlice = (set, get) => ({
    user: {
        confirmedEmail: false,
        createdAt: new Timestamp(0, 0),
        displayName: '',
        userId: '',
        email: '',
        nextTestDate: new Timestamp(0, 0),
        provider: '',
    },
    setUser: (userData) => set(state => {
        state.user = { ...state.user, ...userData };
    }),
});
