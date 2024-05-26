import { collection, doc, getDoc } from "firebase/firestore";
import { db } from "../../firebaseConfig";
import { getAuth } from "firebase/auth"

export const getUserUid = () => {
    return getAuth()?.currentUser?.uid;
}

export const getUserInfo = async () => {
    try {
        const usersRef = collection(db, 'users');
        const userId = getUserUid();
        const userDoc = await getDoc(doc(usersRef, userId));
        return userDoc.data();
    } catch (error) {
        console.error("Error fetching user info:", error);
        return null;
    }
}