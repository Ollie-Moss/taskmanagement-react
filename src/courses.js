import { auth, firestore } from "./firebase-config";
import { collection, query, doc, setDoc, deleteDoc } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollection } from "react-firebase-hooks/firestore";

import CourseCard from "./course-card.js";
import Header from "./header";
import { v4 as uuidv4 } from "uuid";

const Courses = () => {
    const [user, loading] = useAuthState(auth);

    const [value, dataLoading] = useCollection(user && query(
        collection(firestore, `/users/${user.uid}/courses`), {
            snapshotListenOptions : {
                includeMetadataChanges : true
            }
        }
    ));

    const [assignments, assignmentsLoading] = useCollection(user && query(
        collection(firestore, `/users/${user.uid}/assignments`), {
            snapshotListenOptions : {
                includeMetadataChanges : true
            }
        }
    ));

    if(loading || dataLoading || assignmentsLoading){
        return (
            <>
            <Header />
            <div className="bg-primary-600 flex flex-col items-center justify-center px-6 py-8 md:h-screen lg:py-0"> 
                <h1>Loading...</h1>
            </div>
            </>
        );
    }
    if(user && value && assignments){
        return (
            <>
            <Header />
            <div className="bg-primary-600 px-6 py-8 h-full lg:py-0"> 
            <CourseDisplay 
                user={user} 
                courses={value.docs
                    .map((item) => item.data())} 
                assignments={assignments.docs
                    .map((item) => item.data())} />
                
            </div>
            </>
        );
    }
    return (
        <>
        <Header />
        <div className="h-screen bg-primary-600 flex flex-col items-center justify-center px-6 py-8 lg:py-0"> 
            <h1> Login to add courses </h1>
        </div>
        </>
    )
}

const CourseDisplay = (props) => {

    const createCourse = async () => {

        // get last index
        let len = props.courses.length;
        let newIndex = len > 0 ? props.courses[len-1].index+1 : 0

        const docData = {
            id: uuidv4(),
            index: newIndex,
            name: "",
            code: "",
            description: "",
            completion: 0,
            draft: true
        };

        try {
            await setDoc(doc(firestore, `/users/${props.user.uid}/courses/`, docData.id), docData).then((result) => {
            })
        }catch(error) {
            console.log(error);
        }
    }
    const DeleteCourse = (id) => {
            deleteDoc(doc(firestore, `/users/${auth.currentUser.uid}/courses`, id))
                .then((result) => {
                    console.log(result);
                })
                .catch((error) => {
                    console.log(error);
                })
    }

    const UpdateCourse = async (newValue) => {
        try {
            await setDoc(doc(firestore, `/users/${props.user.uid}/courses/`, newValue.id), newValue).then((result) => {
            })
        }catch(error) {
            console.log(error);
        }
    }

    return (
        <>
        <div className="p-2 bg-primary-650 rounded">
            <div className="flex items-center justify-between">
                <h1 className="rounded bg-primary-650 p-2 text-white text-xl font-bold"> Courses </h1>
                <button 
                    className="text-primary-600 bg-white hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-primary-300 font-bold rounded-lg text-sm px-5 py-2 text-center"
                    onClick={() => {
                        createCourse();
                    }}
                >
                    Add Course
                </button>
            </div>
            {props.courses
                .map((item) => (
                    <CourseCard 
                    key={item.id}
                    DeleteCourse={DeleteCourse} 
                    UpdateCourse={UpdateCourse} 
                    assignments={props.assignments
                            .filter((assignment) => assignment.courseId == item.id)}  
                    data={item}/>
            ))}
        </div>
        </>
    )
};

export default Courses;
