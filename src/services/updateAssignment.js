import { setDoc, doc } from "firebase/firestore"
import { auth, firestore } from "../firebase-config"

export const UpdateAssignment = async (newValue) => {
    try {
        await setDoc(
            doc(
                firestore,
                `/users/${auth.currentUser.uid}/assignments/`,
                newValue.id
            ),
            newValue
        ).then((result) => {})
    } catch (error) {
        console.log(error)
    }
}
