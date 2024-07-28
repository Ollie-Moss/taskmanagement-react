import { deleteDoc, doc } from "firebase/firestore";
import { auth } from "./firebase-config";
import { useRef, useState } from "react";
import { firestore } from "./firebase-config";
import PercentageBar from "./percentage-bar";

const CourseCard = (props) => {
    const [dropDown, setDropDown] = useState(null);

    const deleteCourse = () => {
        deleteDoc(doc(firestore, `/users/${auth.currentUser.uid}/courses`, props.data.code))
            .then((result) => {
                console.log(result);
            })
            .catch((error) => {
                console.log(error);
            })
    }
    const edit = () => {
        
    }

    return (
        <>
        <div className={`text-primary-600 font-bold flex justify-between w-full bg-white ${dropDown ? "rounded-t" : "rounded"} p-2 mt-2`}> 
            <button className="text-xl" onClick={() => setDropDown(!dropDown)} >{props.data.code}</button>
            <div>
                <button onClick={() => edit()} className='px-4 py-1 bg-primary-600 rounded-md text-lg font-bold text-white hover:bg-primary-400 inline'> 
                    <a > Edit </a>
                </button>
                <button onClick={() => deleteCourse()} className='mx-4 px-4 py-1 bg-red-600 rounded-md text-lg font-bold text-white hover:bg-red-400 inline'> 
                    <a > Delete </a>
                </button>
            </div>
        </div>
        <CourseEdit open={dropDown} data={props.data}/>
        </>
    )
};

const CourseEdit = (props) => {
    let animation = props.open == null ? "hidden" : props.open ? "animate-slidedown" : "animate-slideup"

    return (
        <div className={`${animation} grid grid-rows-0`}>
            <div className="overflow-hidden">
                <div className={`flex pb-5 justify-between bg-gray-200 rounded-b`}>
                    <div className="ml-10 my-5 w-full">
                        <h1 className="py-2 text-2xl font-bold text-primary-600"> {props.data.name} </h1>
                        <span contentEditable="plaintext-only" className="max-w-ma text-sm font-medium text-primary-600"> {props.data.description} </span>
                        <h1 className="pt-3 pb-2 text-xl font-bold text-primary-600"> Total Completion: </h1>
                        <PercentageBar percent={props.data.completion} />
                    </div>
                    <div className="rounded-lg mx-10 my-5 w-full bg-white">
                        <h1 className="px-5 py-4 text-xl font-bold text-primary-600"> Assignments: {props.data.assignments.length}</h1>
                        {props.data.assignments.map((item, index) => ( 
                            <AssignmentCard key={index} data={item} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
};

const CourseDetails = (props) => {
    let animation = props.open == null ? "hidden" : props.open ? "animate-slidedown" : "animate-slideup"

    return (
        <div className={`${animation} grid grid-rows-0`}>
            <div className="overflow-hidden">
                <div className={`flex pb-5 justify-between bg-gray-200 rounded-b`}>
                    <div className="ml-10 my-5 w-full">
                        <h1 className="py-2 text-2xl font-bold text-primary-600"> {props.data.name} </h1>
                        <p className="text-sm font-medium text-primary-600"> {props.data.description} </p>
                        <h1 className="pt-3 pb-2 text-xl font-bold text-primary-600"> Total Completion: </h1>
                        <PercentageBar percent={props.data.completion} />
                    </div>
                    <div className="rounded-lg mx-10 my-5 w-full bg-white">
                        <h1 className="px-5 py-4 text-xl font-bold text-primary-600"> Assignments: {props.data.assignments.length}</h1>
                        {props.data.assignments.map((item, index) => ( 
                            <AssignmentCard key={index} data={item} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
};

const AssignmentCard = (props) => {
    return (
        <div className="px-3 pb-4 mb-4 mx-4 bg-primary-600 rounded-xl">
            <div className="flex justify-between">
                <h1 className="pt-3 pb-2 text-lg font-bold text-white"> {props.data.name} - {props.data.type} </h1>
                <button className='px-4 my-3  bg-white rounded-md text-lg font-bold text-primary-600 hover:bg-gray-200 inline'> 
                    <a > More </a>
                </button>
            </div>
            <PercentageBar percent={props.data.completion} />
        </div>
    )
};


export default CourseCard;
