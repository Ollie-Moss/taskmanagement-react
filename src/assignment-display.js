import { setDoc, doc, deleteDoc } from 'firebase/firestore'
import AssignmentCard from './assignment-card'
import { auth, firestore } from './firebase-config'
import { v4 as uuidv4 } from 'uuid'
import { useState } from 'react'

const AssignmentDisplay = (props) => {
    const [drafts, setDrafts] = useState([])

    const DeleteAssignment = async (id) => {
        return deleteDoc(
            doc(firestore, `/users/${auth.currentUser.uid}/assignments`, id)
        ).catch((error) => {
            console.log(error)
        })
    }

    const UpdateAssignment = async (newValue) => {
        try {
            await setDoc(
                doc(
                    firestore,
                    `/users/${props.user.uid}/assignments/`,
                    newValue.id
                ),
                newValue
            ).then((result) => {})
        } catch (error) {
            console.log(error)
        }
    }
    const AddAssignment = async () => {
        const docData = {
            id: uuidv4(),
            courseId: null,
            name: '',
            description: '',
            tasks: [],
            completion: 0,
            draft: true,
        }
        setDrafts((prev) => [...prev, docData])
    }
    return (
        <>
            <div className="flex justify-between">
                <h1 className="text-gray-200 text-2xl font-bold">
                    Assignments
                </h1>
                <button
                    onClick={() => AddAssignment()}
                    className="rounded-lg py-2 px-3 font-bold text-md text-accent-600 bg-gray-200"
                >
                    New Assignment
                </button>
            </div>
            <Section
                key={'draft assignments'}
                title={'Unsaved'}
                assignments={drafts}
                UpdateAssignment={UpdateAssignment}
                DeleteAssignment={DeleteAssignment}
            />

            {props.courses.map((item) => (
                <Section
                    key={item.id}
                    title={item.name}
                    assignments={props.assignments.filter(
                        (assignment) => assignment.courseId === item.id
                    )}
                    UpdateAssignment={UpdateAssignment}
                    DeleteAssignment={DeleteAssignment}
                />
            ))}
        </>
    )
}

const Section = (props) => {
    return (
        <>
            {props.assignments.length > 0 ? (
                <>
                    <h1 className="text-gray-200 text-lg font-bold">
                        {props.title}:
                    </h1>
                    {props.assignments.map((item) => (
                        <AssignmentCard
                            UpdateAssignment={props.UpdateAssignment}
                            DeleteAssignment={props.DeleteAssignment}
                            key={item.id}
                            data={item}
                        />
                    ))}
                </>
            ) : (
                <></>
            )}
        </>
    )
}
export default AssignmentDisplay
