import { useState } from "react";
import { auth, firestore } from "./firebase-config";
import { doc, setDoc, collection, query, deleteDoc } from "firebase/firestore";
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
            <div className="bg-primary-600 flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0"> 
                <AddCourse user={user} />
                <CourseDisplay courses={value.docs}/>
            </div>
            </>
        );
    }
    return (
        <>
        <Header />
        <div className="bg-primary-600 flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0"> 
            <h1> Login to add courses </h1>
        </div>
        </>
    )
}

const AddCourse = (props) => {
    const [courseName, setCourseName] = useState("");
    const [courseCode, setCourseCode] = useState("");
    const [courseDescription, setCourseDescription] = useState("");

    const addCourse = async (e) => {
        e.preventDefault();
        const docData = {
            name: courseName,
            code: courseCode,
            description: courseDescription
        };

        console.log(docData);
        try {
            await setDoc(doc(firestore, `/users/${props.user.uid}/courses/`, docData.code), docData).then((result) => {
                console.log(result);
            })
        }catch(error) {
            console.log(error);
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
    const [dropDown, setDropDown] = useState(false);

    const deleteCourse = () => {
        deleteDoc(doc(firestore, `/users/${auth.currentUser.uid}/courses`, props.data.code))
            .then((result) => {
                console.log(result);
            })
            .catch((error) => {
                console.log(error);
            })
    }
    return (
        dropDown ?
        <>
        <div className="flex justify-between w-full bg-white rounded p-2 mt-2"> 
            <button onClick={() => setDropDown(!dropDown)} >{props.data.code}</button>
            <button onClick={() => deleteCourse()}> 
            <svg className="h-8 w-8 text-red-500"  width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">  <path stroke="none" d="M0 0h24v24H0z"/>  <line x1="18" y1="6" x2="6" y2="18" />  <line x1="6" y1="6" x2="18" y2="18" /></svg>
            </button>
        </div>
        <ul className="bg-white w-full rounded">
            <li>Name: {props.data.name}</li>
            <li>Code: {props.data.code}</li>
            <li>Description: {props.data.description}</li>
        </ul>
        </>
        :
        <div className="flex justify-between w-full bg-white rounded p-2 mt-2"> 
            <button onClick={() => setDropDown(!dropDown)} >{props.data.code}</button>
            <button onClick={() => deleteCourse()}> 
            <svg className="h-8 w-8 text-red-500"  width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">  <path stroke="none" d="M0 0h24v24H0z"/>  <line x1="18" y1="6" x2="6" y2="18" />  <line x1="6" y1="6" x2="18" y2="18" /></svg>
            </button>
        </div>
    )
};

export default Courses;
