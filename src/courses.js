import { useState } from "react";
import { auth, firestore } from "./firebase-config";
import { doc, getDoc, setDoc, collection, query } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollection } from "react-firebase-hooks/firestore";

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
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0"> 
                <h1>Loading...</h1>
            </div>
            </>
        );
    }
    if(user && value){
        console.log(value.docs);
        return (
            <>
            <Header />
            <CourseDisplay courses={value.docs}/>
            </>
        );
    }
    return (
        <Header />
    )
}

const AddCourse = () => {
    const [courseName, setCourseName] = useState("");
    const [courseCode, setCourseCode] = useState("");
    const [courseDescription, setCourseDescription] = useState("");

    const addCourse = async (e) => {
        e.preventDefault();
        let currentData = await getDoc(doc(firestore, "courses", auth.currentUser.uid));
        if(!currentData.exists()){
            console.log("No data");
            return;
        }
        const docData = [{
            name: courseName,
            code: courseCode,
            description: courseDescription
        }];

        try {
            await setDoc(doc(firestore, "courses", auth.currentUser.uid), docData).then((result) => {
                console.log(result);
            })
        }catch(error) {
            console.log(error.value);
        }
    }
    return (
        <form onSubmit={addCourse}>
            <label>
                Name: <input 
                        className="border border-gray-300 text-black rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" 
                        value={courseName}
                        onChange={e => setCourseName(e.target.value)}
                        />
            </label>
            <label>
                Code: <input 
                        className="border border-gray-300 text-black rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" 
                        value={courseCode}
                        onChange={e => setCourseCode(e.target.value)}
                        />
            </label>
            <label>
                Description: <input 
                        className="border border-gray-300 text-black rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" 
                        value={courseDescription}
                        onChange={e => setCourseDescription(e.target.value)}
                        />
            </label>
            <input 
                className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center justify-between mr-2 mb-2"
                type="submit" 
                value="Add Course" />

        </form>
    )
};

const CourseDisplay = (props) => {
    return props.courses.map((item, index) => (
        <CourseCard key={item.data().code} data={item.data()}/>
    ))
};
const CourseCard = (props) => {
    return (
        <ul>
            <li>Name: {props.data.name}</li>
            <li>Code: {props.data.code}</li>
            <li>Description: {props.data.description}</li>
        </ul>
    )
};

export default Courses;
