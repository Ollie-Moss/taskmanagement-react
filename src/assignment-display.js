import { setDoc, doc, deleteDoc } from 'firebase/firestore'
import AssignmentCard from './assignment-card'
import { auth, firestore } from './firebase-config'
import { v4 as uuidv4 } from 'uuid'
import { useState } from 'react'

const AssignmentDisplay = (props) => {
    const [drafts, setDrafts] = useState([])

    const DeleteAssignment = async (id, draft = false) => {
        setDrafts(prev => prev.filter((assign) => assign.id != id))
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
                courses={props.courses}
                assignments={drafts}
                DeleteAssignment={DeleteAssignment}
            />

            {props.courses.map((item) => (
                <Section
                    key={item.id}
                    title={item.name}
                    courses={props.courses}
                    assignments={props.assignments.filter(
                        (assignment) => assignment.courseId === item.id
                    )}
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
                            courses={props.courses}
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
