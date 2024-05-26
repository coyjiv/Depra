import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';
import { devtools } from 'zustand/middleware';

import { UserState, createUserSlice } from './userSlice';
import { DiaryState, createDiarySlice } from './diarySlice';
import { StatsState, createStatsSlice } from './statsSlice';
import { TestState, createTestSlice } from './testSlice';

type StoreState = UserState & DiaryState & StatsState & TestState;

const useGlobalStore = create<StoreState>()(
    devtools(
        persist(
            immer((set, get) => ({
                ...createUserSlice(set, get),
                ...createDiarySlice(set, get),
                ...createStatsSlice(set, get),
                ...createTestSlice(set, get),
            })),
            {
                name: 'global-storage',
                getStorage: () => AsyncStorage,
            }
        )
    )
);

export default useGlobalStore;
