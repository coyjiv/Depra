import { getAuth } from "firebase/auth"

export const getUserUid = () => {
    return getAuth()?.currentUser?.uid;
}