import { Timestamp, addDoc, collection, deleteDoc, doc, getDoc, getDocs, query, setDoc, where } from "firebase/firestore";
import { db } from "../../firebaseConfig";
import { getUserUid } from "./BaseApi";
import moment from "moment";

export const isUserCanTakeTest = async (userId = getUserUid()) => {
    const usersRef = collection(db, 'users');
    const userDoc = await getDoc(doc(usersRef, userId));
    const today = moment();
    const nextTestDate = userDoc.data().nextTestDate;

    if (nextTestDate) {
        const formattedNextTestDate = moment(nextTestDate.toDate()).format('DD.MM.YYYY HH:mm');
        console.log("nextTestDate", formattedNextTestDate);
        console.log("isUserCanTakeTest", moment(nextTestDate.toDate()).isBefore(today));

        return {
            isUserCanTakeTest: moment(nextTestDate.toDate()).isBefore(today),
            nextTestDate: formattedNextTestDate
        };
    }
    return {
        isUserCanTakeTest: true,
        nextTestDate: null
    };
}


export const createTestRecord = async (test) => {
    const testsRef = collection(db, 'tests');
    const userId = getUserUid();
    const now = Timestamp.fromDate(moment().toDate());

    try {
        const docRef = await addDoc(testsRef, {
            ...test,
            userId,
            createdDate: now,
        });
        setDoc(docRef, {
            id: docRef.id
        }, { merge: true });
        return {
            ...test,
            id: docRef.id,
            userId: userId,
            createdDate: now,
        };
    } catch (error) {
        console.error("Error creating test:", error);
    }
}

export const createMocked100Tests = async () => {
    const testsRef = collection(db, 'tests');
    const userId = getUserUid();
    let lastTestDate = moment(); // Starting from today for the first test.

    for (let i = 0; i < 100; i++) {
        const testDate = lastTestDate.add(Math.max(7, Math.floor(Math.random() * 10)), 'days'); // Add 7-16 days randomly to the last test date.
        const test = {
            name: `Test ${i + 1}`,
            score: Math.floor(Math.random() * 100) + 1 // Random score between 1 and 100.
        };

        try {
            const docRef = await addDoc(testsRef, {
                ...test,
                userId,
                createdDate: Timestamp.fromDate(testDate.toDate())
            });
            await setDoc(doc(testsRef, docRef.id), {
                id: docRef.id
            }, { merge: true });
            console.log(`Test ${i + 1} created with ID: ${docRef.id}`);
        } catch (error) {
            console.error(`Error creating Test ${i + 1}:`, error);
        }
    }
}

export const cleanMockedTests = async () => {
    const testsRef = collection(db, 'tests');
    const q = query(testsRef, where("userId", "==", getUserUid())); // Adjust this query to target only mock tests if needed.

    try {
        const snapshot = await getDocs(q);
        snapshot.forEach(async (doc) => {
            await deleteDoc(doc.ref);
            console.log(`Deleted test record with ID: ${doc.id}`);
        });
    } catch (error) {
        console.error("Error deleting mocked tests:", error);
    }
}