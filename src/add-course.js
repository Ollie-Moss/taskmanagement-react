import { useState } from "react";
import { doc, setDoc } from "firebase/firestore";
import { firestore } from "./firebase-config";

const AddCourse = (props) => {
    const [courseName, setCourseName] = useState("");
    const [courseCode, setCourseCode] = useState("");
    const [courseDescription, setCourseDescription] = useState("");
    const cancel = (e) => {
        e.preventDefault();
        props.close();
        return;
    }

    const addCourse = async (e) => {
        e.preventDefault();
        props.close();
        const docData = {
            name: courseName,
            code: courseCode,
            description: courseDescription,
            completion: 20,
            assignments: [
                {
                    name: "Assignment 1",
                    type: "Project",
                    completion: 85
                }

            ]
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
        <form className='z-30 rounded p-10 bg-white absolute left-1/4 x-1/2 w-1/2 mr-10' >
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

export default AddCourse;
