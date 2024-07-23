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
            <div className="bg-primary-600 flex flex-col px-6 py-8 mx-auto md:h-screen lg:py-0"> 
            <CourseDisplay user={user} courses={value.docs}/>
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
    const cancel = (e) => {
        e.preventDefault();
        props.cancel();
        return;
    }

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
        props.cancel();
    }
    return (
        <form className='rounded p-10 bg-white absolute left-1/4 x-1/2 w-1/2 mr-10' >
            <h1 className="text-3xl font-bold"> New Course </h1>
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
            <button
                className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center justify-between mr-2 mb-2"
                onClick={addCourse}
            >
                Add Course
            </button>
            <button
                className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center justify-between mr-2 mb-2"
                onClick={cancel}
            >
                Cancel
            </button>

        </form>
    )
};

const CourseDisplay = (props) => {
    const [addCourse, setAddCourse] = useState(false);
    const cancelCourse = () => {
        setAddCourse(false);
    }

    return (
        <div className="p-2 bg-primary-800 rounded">
            {addCourse ?
                <AddCourse cancel={cancelCourse} user={props.user}/>
            :
                <>
                </>
            }
            <div className="flex items-center justify-between">
                <h1 className="rounded bg-primary-800 p-2 text-white text-xl font-bold"> Courses </h1>
                <button 
                    className="text-primary-600 bg-white hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2 text-center"
                    onClick={() => setAddCourse(true)}
                >
                    Add Course
                </button>
            </div>
            {props.courses.map((item, index) => (
            <CourseCard key={item.data().code} data={item.data()}/>
            ))}
        </div>
    )
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
        <div className="text-primary-600 font-bold flex justify-between w-full bg-white rounded p-2 mt-2"> 
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
        <div className="text-primary-600 font-bold flex justify-between w-full bg-white rounded p-2 mt-2"> 
            <button onClick={() => setDropDown(!dropDown)} >{props.data.code}</button>
            <button onClick={() => deleteCourse()}> 
            <svg className="h-8 w-8 text-red-500"  width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">  <path stroke="none" d="M0 0h24v24H0z"/>  <line x1="18" y1="6" x2="6" y2="18" />  <line x1="6" y1="6" x2="18" y2="18" /></svg>
            </button>
        </div>
    )
};

export default Courses;
