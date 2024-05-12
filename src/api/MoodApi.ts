import { collection, getDocs, query, where } from "firebase/firestore"; 
import { db } from "../../firebaseConfig";

export const getMoodsForDate = async (date: string) => {
    const moodQuery = query(collection(db, "mood-diary"));
    const mood = await getDocs(moodQuery);
    return mood.docs.map(doc => doc.data());
}