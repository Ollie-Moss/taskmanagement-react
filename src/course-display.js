import { auth, firestore } from './firebase-config'
import { doc, setDoc, deleteDoc } from 'firebase/firestore'

import { v4 as uuidv4 } from 'uuid'
import CourseCard from './course-card.js'

const CourseDisplay = (props) => {
    const createCourse = async () => {
        // get last index
        let len = props.courses.length
        let newIndex = len > 0 ? props.courses[len - 1].index + 1 : 0

        const docData = {
            id: uuidv4(),
            index: newIndex,
            name: '',
            code: '',
            description: '',
            completion: 0,
            draft: true,
        }

        try {
            await setDoc(
                doc(firestore, `/users/${props.user.uid}/courses/`, docData.id),
                docData
            ).then((result) => {})
        } catch (error) {
            console.log(error)
        }
    }
    const DeleteCourse = (id) => {
        deleteDoc(doc(firestore, `/users/${auth.currentUser.uid}/courses`, id))
            .then((result) => {
                console.log(result)
            })
            .catch((error) => {
                console.log(error)
            })
    }

    const UpdateCourse = async (newValue) => {
        try {
            await setDoc(
                doc(
                    firestore,
                    `/users/${props.user.uid}/courses/`,
                    newValue.id
                ),
                newValue
            ).then((result) => {})
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <>
            <div className="p-2 bg-primary-650 rounded">
                <div className="flex items-center justify-between">
                    <h1 className="rounded bg-primary-650 p-2 text-white text-xl font-bold">
                        Courses
                    </h1>
                    <button
                        className="text-primary-600 bg-white hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-primary-300 font-bold rounded-lg text-sm px-5 py-2 text-center"
                        onClick={() => {
                            createCourse()
                        }}
                    >
                        Add Course
                    </button>
                </div>
                {props.courses.map((item) => (
                    <CourseCard
                        key={item.id}
                        DeleteCourse={DeleteCourse}
                        UpdateCourse={UpdateCourse}
                        assignments={props.assignments.filter(
                            (assignment) => assignment.courseId === item.id
                        )}
                        data={item}
                    />
                ))}
            </div>
        </>
    )
}

export default CourseDisplay
