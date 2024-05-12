import { Timestamp, collection, getDocs, query, where, setDoc, doc, addDoc } from "firebase/firestore"; 
import { db } from "../../firebaseConfig";
import { getUserUid } from "./BaseApi";
import moment from "moment";

export const getMoodsForDate = async (date = moment()) => {
    const diaryRef = collection(db, 'mood-diary');
  
    const startOfDay = Timestamp.fromDate(date.startOf('day').toDate());
    const endOfDay = Timestamp.fromDate(date.endOf('day').toDate());
  
    const userId = getUserUid();
  
    const moodQuery = query(
      diaryRef,
      where("userId", "==", userId),
      where("createdDate", ">=", startOfDay),
      where("createdDate", "<=", endOfDay)
    );
  
    try {
      const querySnapshot = await getDocs(moodQuery);
      return querySnapshot.docs.map(doc => doc.data());
    } catch (error) {
      console.error("Error fetching moods:", error);
      return [];
    }
  };

  export const createMood = async (mood) => {
    const diaryRef = collection(db, 'mood-diary');
    const userId = getUserUid();
  
    try {
      await addDoc(diaryRef, {
        ...mood,
        userId,
        createdDate: Timestamp.fromDate(moment().toDate()),
        modifiedDate: Timestamp.fromDate(moment().toDate())
      });
    } catch (error) {
      console.error("Error creating mood:", error);
    }
  }