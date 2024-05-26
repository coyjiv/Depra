import { Timestamp, collection, getDocs, query, where, setDoc, doc, addDoc, QuerySnapshot, QueryDocumentSnapshot, FirestoreDataConverter, DocumentData, SnapshotOptions, getDoc, onSnapshot, orderBy } from "firebase/firestore";
import { db } from "../../firebaseConfig";
import { getUserUid } from "./BaseApi";
import moment from "moment";
import { MoodData, MoodDoc } from "../../types";

const moodDocConverter: FirestoreDataConverter<MoodDoc> = {
  toFirestore(mood: MoodDoc): DocumentData {
    return {
      data: mood.data,
      createdDate: mood.createdDate,
      modifiedDate: mood.modifiedDate,
      userId: mood.userId
    };
  },
  fromFirestore(
    snapshot: QueryDocumentSnapshot,
    options: SnapshotOptions
  ): MoodDoc {
    const data = snapshot.data(options);
    return {
      id: data.id as string,
      data: data.data as MoodData,
      createdDate: data.createdDate as Timestamp,
      modifiedDate: data.modifiedDate as Timestamp,
      userId: data.userId as string
    };
  }
};



export const getMoodsForDate = async (date = moment()): Promise<MoodDoc[]> => {
  const diaryRef = collection(db, 'mood-diary').withConverter(moodDocConverter);

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
    const querySnapshot: QuerySnapshot<MoodDoc> = await getDocs(moodQuery);
    return querySnapshot.docs.map(doc => doc.data());
  } catch (error) {
    console.error("Error fetching moods:", error);
    return [];
  }
};

export const getRealTimeMoods = (date, setMoods, setIsLoading) => {
  const diaryRef = collection(db, 'mood-diary');
  const startOfDay = Timestamp.fromDate(date.startOf('day').toDate());
  const endOfDay = Timestamp.fromDate(date.endOf('day').toDate());
  const moodQuery = query(diaryRef, where("createdDate", ">=", startOfDay), where("createdDate", "<=", endOfDay), orderBy("createdDate", "desc"));

  return onSnapshot(moodQuery, (snapshot) => {
    const moods = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    setMoods(moods);
    setIsLoading(false);
  }, (error) => {
    console.error("Error getting real-time moods:", error);
  });
};

export const createMood = async (mood) => {
  const diaryRef = collection(db, 'mood-diary');
  const userId = getUserUid();
  const now = Timestamp.fromDate(moment().toDate());

  try {
    const docRef = await addDoc(diaryRef, {
      ...mood,
      userId,
      createdDate: now,
      modifiedDate: now
    });
    setDoc(docRef, {
      id: docRef.id
    }, { merge: true });
    return {
      id: docRef.id,
      data: mood,
      userId: userId,
      createdDate: now,
      modifiedDate: now
    };
  } catch (error) {
    console.error("Error creating mood:", error);
  }
}

export const editMood = async (moodId: string, moodData: MoodData) => {
  const diaryRef = doc(db, 'mood-diary', moodId).withConverter(moodDocConverter);
  const userId = getUserUid();
  const existingDoc = await getDoc(diaryRef);

  if (!existingDoc.exists()) {
    throw new Error("Document does not exist.");
  }

  const existingData = existingDoc.data();

  try {
    await setDoc(diaryRef, {
      data: moodData,
      userId: userId,
      createdDate: existingData.createdDate,
      modifiedDate: Timestamp.fromDate(moment().toDate()),
    }, { merge: true });
  } catch (error) {
    console.error("Error updating mood:", error);
    throw new Error("Failed to update mood entry.");
  }
};
