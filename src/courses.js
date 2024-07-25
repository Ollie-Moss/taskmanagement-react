import { useState } from "react";
import { auth, firestore } from "./firebase-config";
import { doc, setDoc, collection, query, deleteDoc } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollection } from "react-firebase-hooks/firestore";

import AddCourse from "./add-course.js";
import CourseCard from "./course-card.js";
import Header from "./header";

const Courses = () => {
    const [user, loading, error] = useAuthState(auth);

    const [value, dataLoading, dataError] = useCollection(user && query(
        collection(firestore, `/users/${user.uid}/courses`), {
            snapshotListenOptions : {
                includeMetadataChanges : true
            }
        }
    ));

    if(loading || dataLoading){
        return (
            <>
            <Header />
            <div className="bg-primary-600 flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0"> 
                <h1>Loading...</h1>
            </div>
            </>
        );
    }
    if(user && value){
        return (
            <>
            <Header />
            <div className="bg-primary-600 px-6 py-8 h-full lg:py-0"> 
            <CourseDisplay user={user} courses={value.docs}/>
            </div>
            </>
        );
    }
    return (
        <>
        <Header />
        <div className="h-screen bg-primary-600 flex flex-col items-center justify-center px-6 py-8 mx-auto lg:py-0"> 
            <h1> Login to add courses </h1>
        </div>
        </>
    )
}

const CourseDisplay = (props) => {
    const [addCourse, setAddCourse] = useState(false);

    const closeCourse = () => {
        setAddCourse(false);
    }

    return (
        <>
        <div className="p-2 bg-primary-800 rounded">
            {addCourse ?
                <>
                <AddCourse close={closeCourse} user={props.user}/>
                <div className="backdrop-blur-sm fixed z-20 top-0 left-0 w-full h-full"></div>
                </>
            :
                <>
                </>
            }
            <div className="flex items-center justify-between">
                <h1 className="rounded bg-primary-800 p-2 text-white text-xl font-bold"> Courses </h1>
                <button 
                    className="text-primary-600 bg-white hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2 text-center"
                    onClick={() => {
                        setAddCourse(true);
                    }}
                >
                    Add Course
                </button>
            </div>
            {props.courses.map((item, index) => (
            <CourseCard key={item.data().code} data={item.data()}/>
            ))}
        </div>
        </>
    )
};

export default Courses;
