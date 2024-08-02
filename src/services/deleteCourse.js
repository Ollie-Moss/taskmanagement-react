import { deleteDoc, doc } from "firebase/firestore"
import { auth, firestore } from "../firebase-config"

export const DeleteCourse = (id) => {
    deleteDoc(doc(firestore, `/users/${auth.currentUser.uid}/courses`, id))
        .then((result) => {
            console.log(result)
        })
        .catch((error) => {
            console.log(error)
        })
}
