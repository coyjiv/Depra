import { QuerySnapshot, SnapshotOptions, Timestamp, getDocs, onSnapshot, query, where } from 'firebase/firestore';
import { QueryDocumentSnapshot } from 'firebase/firestore';
import { DocumentData, FirestoreDataConverter, collection } from 'firebase/firestore';
import { db, functions } from '../../firebaseConfig';
import { httpsCallable } from 'firebase/functions';
import { FirestoreDiaryStats, Statistics, TestStats } from '../../types';
import { getUserUid } from './BaseApi';

const statisticsDocConverter: FirestoreDataConverter<Statistics> = {
    toFirestore(statistics: Statistics): DocumentData {
        return {
            userId: statistics.userId,
            testProgress: statistics.testProgress,
            diaryStats: statistics.diaryStats,
        };
    },
    fromFirestore(
        snapshot: QueryDocumentSnapshot,
        options: SnapshotOptions
    ): Statistics {
        const data = snapshot.data(options);
        return {
            userId: data.userId as string,
            testProgress: data.testProgress as TestStats,
            diaryStats: data.diaryStats as FirestoreDiaryStats,
        };
    }
};

export const recalculateStatistics = async () => {
    const recalculateStats = httpsCallable(functions, 'recalculateStatistics');
    try {
        const result = await recalculateStats();
        return result.data;
    } catch (error) {
        console.error("Error calling recalculateStatistics function:", error);
        throw error;
    }
};

export const getStatistics = async () => {
    const diaryRef = collection(db, 'statistics').withConverter(statisticsDocConverter);

    const userId = getUserUid();

    console.log('userId', userId);


    const statsQuery = query(
        diaryRef,
        where("userId", "==", userId),
    );

    try {
        const querySnapshot: QuerySnapshot<Statistics> = await getDocs(statsQuery);
        return querySnapshot.docs.map(doc => doc.data());
    } catch (error) {
        console.error("Error fetching stats:", error);
        return [];
    }
}

export const getRealTimeStatistic = (setResult, setIsLoading) => {
    const diaryRef = collection(db, 'statistics').withConverter(statisticsDocConverter);
    const userId = getUserUid();

    const statsQuery = query(
        diaryRef,
        where("userId", "==", userId),
    );

    return onSnapshot(statsQuery, (snapshot) => {
        const moods = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));
        setResult(moods);
        setIsLoading(false);
        console.log('real-time stats:', moods);

    }, (error) => {
        console.error("Error getting real-time stats:", error);
    });
};