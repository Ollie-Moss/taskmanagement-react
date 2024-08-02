import { deleteDoc, doc } from "firebase/firestore"
import { auth, firestore } from "../firebase-config"

export const DeleteAssignment = async (id) => {
    return deleteDoc(
        doc(firestore, `/users/${auth.currentUser.uid}/assignments`, id)
    ).catch((error) => {
        console.log(error)
    })
}
