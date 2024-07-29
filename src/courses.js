import { useState } from "react";
import { auth, firestore } from "./firebase-config";
import { collection, query, doc, setDoc } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollection } from "react-firebase-hooks/firestore";

import AddCourse from "./add-course.js";
import CourseCard from "./course-card.js";
import Header from "./header";
import { v4 as uuidv4 } from "uuid";

const Courses = () => {
    const [user, loading, error] = useAuthState(auth);
    const [tempCourses, setTempCourses] = useState([])

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
            <div className="bg-primary-600 flex flex-col items-center justify-center px-6 py-8 md:h-screen lg:py-0"> 
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
            <CourseDisplay 
                user={user} 
                tempCourses={tempCourses} 
                setTempCourses={setTempCourses} 
                courses={value.docs
                    .map((item) => item.data())
                    .sort((a, b) => a.index - b.index)}/>
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
    // sort list based off index biggest to smallest

    const createCourse = async () => {

        // get last index
        let len = props.courses.length;
        let newIndex = len > 0 ? props.courses[len-1].index+1 : 0

        const docData = {
            id: uuidv4(),
            index: newIndex,
            name: "Enter name... ",
            code: "Enter code..",
            description: "Enter description...",
            completion: 0,
            assignments: [
            ]
        };
        props.setTempCourses(prev => [...prev, docData]);
        //setSortedCourses([...sortedCourses, docData]);
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
            {props.tempCourses.map((item) => (
            <CourseCard key={item.id} temp={true} data={item}/>
            ))}
            {props.courses.map((item) => (
            <CourseCard key={item.id} temp={false} data={item}/>
            ))}
        </div>
        </>
    )
};

export default Courses;
