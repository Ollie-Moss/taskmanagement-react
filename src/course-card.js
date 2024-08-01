import { useEffect, useRef, useState } from 'react'
import PercentageBar from './percentage-bar'

const CourseCard = (props) => {
    const [state, setState] = useState({
        open: props.data.draft,
        edit: props.data.draft,
        playAnim: false,
    })

    useEffect(() => {
        // Sets state on first render
        if (props.data.draft) {
            setLocalState(state.open, true, true)
        } else {
            setLocalState(state.open, false, false)
        }
    }, [props.data.draft])

    const code = useRef(null)

    const setLocalState = (open, edit, playAnim) => {
        setState({
            open: open,
            edit: edit,
            playAnim: playAnim,
        })
    }

    const deleteCourse = () => {
        if (window.confirm('Are you sure you want to delete this course')) {
            props.DeleteCourse(props.data.id, true)
        }
    }
    const toggleDropDown = () => {
        setLocalState(!state.open, state.edit, true)
    }
    const edit = () => {
        setLocalState(true, true, !state.open)
    }
    const Save = (name, description) => {
        let updatedCourse = { ...props.data }
        updatedCourse.name = name.current.innerText
        updatedCourse.code = code.current.innerText
        updatedCourse.description = description.current.innerText
        updatedCourse.draft = false

        props.UpdateCourse(updatedCourse)
        setLocalState(false, false, true)
    }

    const Cancel = () => {
        if (props.data.draft) {
            props.DeleteCourse(props.data.id)
        }
        setLocalState(false, false, true)
    }

    return (
        <>
            <div
                className={`text-accent-600 font-bold flex justify-between w-full bg-gray-200 ${state.open ? 'rounded-t' : 'rounded'} p-2 mt-2`}
            >
                {state.edit ? (
                    <h1
                        ref={code}
                        suppressContentEditableWarning={true}
                        contentEditable="plaintext-only"
                        className="empty:before:content-['Enter_code_here...'] focus:outline-none empty:before:text-accent-600/75 py-1 text-xl"
                    >
                        {props.data.code}
                    </h1>
                ) : (
                    <>
                        <button
                            className="text-xl"
                            onClick={() => toggleDropDown()}
                        >
                            {props.data.code}
                        </button>
                        <div>
                            <button
                                onClick={() => edit()}
                                className="px-4 py-1 bg-primary-600 rounded-md text-lg font-bold text-white hover:bg-primary-400 inline"
                            >
                                <a> Edit </a>
                            </button>
                            <button
                                onClick={() => deleteCourse()}
                                className="mx-4 px-4 py-1 bg-red-600 rounded-md text-lg font-bold text-white hover:bg-red-400 inline"
                            >
                                <a> Delete </a>
                            </button>
                        </div>
                    </>
                )}
            </div>
            {state.edit ? (
                <CourseEdit
                    Cancel={Cancel}
                    Save={Save}
                    state={state}
                    assignments={props.assignments}
                    data={props.data}
                />
            ) : (
                <CourseDetails
                    state={state}
                    assignments={props.assignments}
                    data={props.data}
                />
            )}
        </>
    )
}

const CourseEdit = (props) => {
    let animation = ''
    if (props.state.playAnim) {
        animation = props.state.open ? 'animate-slidedown' : 'animate-slideup'
    } else {
        animation = props.state.open ? '' : 'hidden'
    }

    const name = useRef(null)
    const description = useRef(null)

    const AddAssignment = () => {}

    return (
        <div className={`${animation} grid grid-rows-0`}>
            <div className="bg-gray-300 overflow-hidden">
                <div
                    className={`md:flex pb-5 md:justify-between bg-gray-300 rounded-b`}
                >
                    <div className="text-center p-5 md:text-left md:ml-10 md:my-5 w-full md:max-w-[45%] md:w-1/2">
                        <p
                            ref={name}
                            suppressContentEditableWarning={true}
                            contentEditable="plaintext-only"
                            className="focus:outline-none empty:before:text-primary-600/60 empty:before:content-['Enter_name_here...'] p-1 bg-gray-200 rounded-md overflow-hidden inline-block max-w-[90%] w-[90%] md:text-2xl text-sm font-bold text-primary-600"
                        >
                            {props.data.name}
                        </p>
                        <p
                            ref={description}
                            suppressContentEditableWarning={true}
                            contentEditable="plaintext-only"
                            className="focus:outline-none empty:before:text-primary-600/60 empty:before:content-['Enter_description_here...'] p-1 bg-gray-200 rounded overflow-hidden inline-block max-w-[90%] w-[90%] text-sm font-medium text-primary-600"
                        >
                            {props.data.description}
                        </p>
                        <h1 className="pt-3 pb-2 text-xl font-bold text-primary-600">
                            {' '}
                            Total Completion:{' '}
                        </h1>
                        <PercentageBar percent={props.data.completion} />
                    </div>
                    <div className="rounded-lg pb-2 px-10 md:px-0 md:mr-10 md:my-5 w-full md:max-w-[45%] md:w-1/2 bg-gray-200">
                        <h1 className="text-center md:text-left px-5 py-4 text-xl font-bold text-primary-600">
                            {' '}
                            Assignments: {props.assignments.length}
                        </h1>
                        {props.assignments.map((item, index) => (
                            <AssignmentCard key={index} data={item} />
                        ))}
                        <div className="text-center mx-auto">
                            <button
                                onClick={(e) => AddAssignment(e)}
                                className="px-4 py-1 bg-primary-600 rounded-md text-lg font-bold text-white hover:bg-primary-400 inline"
                            >
                                <a> Add </a>
                            </button>
                        </div>
                    </div>
                </div>
                <div className="text-right">
                    <button
                        onClick={() => props.Save(name, description)}
                        className="m-2 px-4 py-1 bg-primary-600 rounded-md text-lg font-bold text-white hover:bg-primary-400 inline"
                    >
                        <a> Save </a>
                    </button>
                    <button
                        onClick={() => props.Cancel()}
                        className="m-2 mr-6 px-4 py-1 bg-red-600 rounded-md text-lg font-bold text-white hover:bg-red-400 inline"
                    >
                        <a> Cancel </a>
                    </button>
                </div>
            </div>
        </div>
    )
}

const CourseDetails = (props) => {
    let animation = ''
    if (props.state.playAnim) {
        animation = props.state.open ? 'animate-slidedown' : 'animate-slideup'
    } else {
        animation = props.state.open ? '' : 'hidden'
    }

    return (
        <div className={`${animation} grid grid-rows-0`}>
            <div className="overflow-hidden">
                <div
                    className={`md:flex pb-5 md:justify-between bg-gray-300 rounded-b`}
                >
                    <div className="text-center p-5 md:text-left md:ml-10 md:my-5 w-full md:max-w-[45%] md:w-1/2">
                        <h1 className="py-2 md:text-2xl font-bold text-primary-600">
                            {' '}
                            {props.data.name}{' '}
                        </h1>
                        <p className="text-sm font-medium text-primary-600">
                            {' '}
                            {props.data.description}{' '}
                        </p>
                        <h1 className="pt-3 pb-2 text-xl font-bold text-primary-600">
                            {' '}
                            Total Completion:{' '}
                        </h1>
                        <PercentageBar percent={props.data.completion} />
                    </div>
                    <div className="rounded-lg pb-2 px-10 md:px-0 md:mr-10 md:my-5 w-full md:max-w-[45%] md:w-1/2 bg-gray-200">
                        <h1 className="text-center md:text-left px-5 py-4 text-xl font-bold text-primary-600">
                            {' '}
                            Assignments: {props.assignments.length}
                        </h1>
                        {props.assignments.map((item, index) => (
                            <AssignmentCard key={index} data={item} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

const AssignmentCard = (props) => {
    return (
        <div className="text-center lg:text-left mb-1 px-3 pb-4 md:mb-4 md:mx-4 bg-primary-600 rounded-xl">
            <div className="lg:flex lg:justify-between">
                <h1 className="pt-3 pb-2 md:text-lg font-bold text-white">
                    {' '}
                    {props.data.name} - {props.data.type}{' '}
                </h1>
                <div className="mb-2 md:mb-0">
                    <button className="px-4 mx-2 my-1 md:my-3 bg-white rounded-md md:text-lg font-bold text-primary-600 hover:bg-gray-200 inline">
                        <a> More </a>
                    </button>
                    <button className="px-4 mx-2 my-1 md:my-3 bg-red-600 rounded-md md:text-lg font-bold text-white hover:bg-red-400 inline">
                        <a> Delete </a>
                    </button>
                </div>
            </div>
            <PercentageBar percent={props.data.completion} />
        </div>
    )
}

export default CourseCard
