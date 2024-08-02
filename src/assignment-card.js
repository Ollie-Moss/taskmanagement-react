import { useEffect, useRef, useState } from 'react'
import PercentageBar from './percentage-bar'
import { v4 as uuidv4 } from 'uuid'
import userEvent from '@testing-library/user-event'

const AssignmentCard = (props) => {
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

    const name = useRef(null)

    const setLocalState = (open, edit, playAnim) => {
        setState({
            open: open,
            edit: edit,
            playAnim: playAnim,
        })
    }

    const deleteAssignment = () => {
        if (window.confirm('Are you sure you want to delete this assignment')) {
            props.DeleteAssignment(props.data.id)
        }
    }
    const toggleDropDown = () => {
        setLocalState(!state.open, state.edit, true)
    }
    const edit = () => {
        setLocalState(true, true, !state.open)
    }
    const Save = (courseId, type, description, tasks, completion) => {
        let updatedAssignment = { ...props.data }
        updatedAssignment.name = name.current.innerText
        updatedAssignment.type = type.current.innerText
        updatedAssignment.description = description.current.innerText
        updatedAssignment.tasks = tasks
        updatedAssignment.courseId = courseId
        updatedAssignment.completion = completion
        updatedAssignment.draft = false

        props.DeleteAssignment(props.data.id, true)
        props.UpdateAssignment(updatedAssignment)
        setLocalState(false, false, true)
    }

    const Cancel = () => {
        if (props.data.draft) {
            props.DeleteAssignment(props.data.id, true)
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
                        ref={name}
                        suppressContentEditableWarning={true}
                        contentEditable="plaintext-only"
                        className="empty:before:content-['Enter_name_here...'] focus:outline-none empty:before:text-accent-600/75 py-1 text-xl"
                    >
                        {props.data.name}
                    </h1>
                ) : (
                    <>
                        <button
                            className="text-xl"
                            onClick={() => toggleDropDown()}
                        >
                            {props.data.name}
                        </button>
                        <div>
                            <button
                                onClick={() => edit()}
                                className="px-4 py-1 bg-primary-600 rounded-md text-lg font-bold text-white hover:bg-primary-400 inline"
                            >
                                <a> Edit </a>
                            </button>
                            <button
                                onClick={() => deleteAssignment()}
                                className="mx-4 px-4 py-1 bg-red-600 rounded-md text-lg font-bold text-white hover:bg-red-400 inline"
                            >
                                <a> Delete </a>
                            </button>
                        </div>
                    </>
                )}
            </div>
            {state.edit ? (
                <AssignmentEdit
                    Cancel={Cancel}
                    Save={Save}
                    state={state}
                    data={props.data}
                    courses={props.courses}
                />
            ) : (
                <AssignmentDetails UpdateAssignment={props.UpdateAssignment} state={state} data={props.data} />
            )}
        </>
    )
}

const AssignmentEdit = (props) => {
    let animation = ''
    if (props.state.playAnim) {
        animation = props.state.open ? 'animate-slidedown' : 'animate-slideup'
    } else {
        animation = props.state.open ? '' : 'hidden'
    }

    const [tasks, setTasks] = useState(props.data.tasks)
    const [completion, setCompletion] = useState(props.data.completion)

    const type = useRef(null)
    const description = useRef(null)
    const taskInput = useRef(null)
    const courseId = useRef(null)

    useEffect(() => {
        updateCompletion()
    }, [tasks])

    const AddTask = () => {
        setTasks((prev) => [
            ...prev,
            { id: uuidv4(), completed: false, name: taskInput.current.value },
        ])
        console.log(tasks)
    }

    const RemoveTask = (id) => {
        setTasks((prev) => prev.filter((task) => task.id != id))
    }

    const ToggleTask = (id) => {
        setTasks((prev) =>
            prev.map((item) => {
                if (item.id === id) {
                    let newItem = { ...item }
                    newItem.completed = !item.completed
                    return newItem
                }
                return item
            })
        )
    }

    const updateCompletion = () => {
        let total = tasks
            .map((task) => (task.completed ? 1 : 0))
            .reduce((accum, cur) => accum + cur, 0)
        if (total > 0) {
            total = Math.round((total / tasks.length) * 100)
        }

        setCompletion(total)
    }

    return (
        <div className={`${animation} grid grid-rows-0`}>
            <div className="bg-gray-300 overflow-hidden">
                <div
                    className={`md:flex pb-5 md:justify-between bg-gray-300 rounded-b`}
                >
                    <div className="text-center p-5 md:text-left md:ml-10 md:my-5 w-full md:max-w-[45%] md:w-1/2">
                        <p
                            ref={type}
                            suppressContentEditableWarning={true}
                            contentEditable="plaintext-only"
                            className="focus:outline-none empty:before:text-primary-600/60 empty:before:content-['Enter_type_here...'] p-1 bg-gray-200 rounded-md overflow-hidden inline-block max-w-[90%] w-[90%] md:text-xl text-sm font-bold text-primary-600"
                        >
                            {props.data.type}
                        </p>
                        <p
                            ref={description}
                            suppressContentEditableWarning={true}
                            contentEditable="plaintext-only"
                            className="focus:outline-none empty:before:text-primary-600/60 empty:before:content-['Enter_description_here...'] p-1 bg-gray-200 rounded overflow-hidden inline-block max-w-[90%] w-[90%] text-sm font-medium text-primary-600"
                        >
                            {props.data.description}
                        </p>
                        <label htmlFor="course-select"> Course: </label>
                        <select ref={courseId} id="course-select">
                            {props.courses.map((course) => (
                                <option key={course.id} value={course.id}>
                                    {course.name}
                                </option>
                            ))}
                        </select>
                        <h1 className="pt-3 pb-2 text-xl font-bold text-primary-600">
                            Total Completion:
                        </h1>
                        <PercentageBar percent={completion} />
                    </div>
                    <div className="rounded-lg pb-2 px-10 md:px-0 md:mr-10 md:my-5 w-full md:max-w-[45%] md:w-1/2 bg-gray-200">
                        <TaskView
                            AddTask={AddTask}
                            RemoveTask={RemoveTask}
                            ToggleTask={ToggleTask}
                            tasks={tasks}
                        />
                        <>
                            <input
                                onKeyDown={(e) => {
                                    if (e.key == 'Enter') {
                                        AddTask()
                                    }
                                }}
                                ref={taskInput}
                                placeholder="Task name..."
                            />
                            <button onClick={() => AddTask()}>add</button>
                        </>
                    </div>
                </div>
                <div className="text-right">
                    <button
                        onClick={() => {
                            props.Save(
                                courseId.current.options[
                                    courseId.current.selectedIndex
                                ].value,
                                type,
                                description,
                                tasks,
                                completion
                            )
                        }}
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

const AssignmentDetails = (props) => {
    let animation = ''
    if (props.state.playAnim) {
        animation = props.state.open ? 'animate-slidedown' : 'animate-slideup'
    } else {
        animation = props.state.open ? '' : 'hidden'
    }


    const [tasks, setTasks] = useState(props.data.tasks)
    const [completion, setCompletion] = useState(props.data.completion)

    const taskInput = useRef(null)

    useEffect(() => {
        updateCompletion()
    }, [tasks])

    useEffect(() => {
        let newAssignment = {...props.data}
        newAssignment.completion = completion;
        newAssignment.tasks = tasks;
        props.UpdateAssignment(newAssignment);
    }, [tasks, completion])

    const AddTask = () => {
        setTasks((prev) => [
            ...prev,
            { id: uuidv4(), completed: false, name: taskInput.current.value },
        ])
        console.log(tasks)
    }

    const RemoveTask = (id) => {
        setTasks((prev) => prev.filter((task) => task.id != id))
    }

    const ToggleTask = (id) => {
        setTasks((prev) =>
            prev.map((item) => {
                if (item.id === id) {
                    let newItem = { ...item }
                    newItem.completed = !item.completed
                    return newItem
                }
                return item
            })
        )
    }

    const updateCompletion = () => {
        let total = tasks
            .map((task) => (task.completed ? 1 : 0))
            .reduce((accum, cur) => accum + cur, 0)
        if (total > 0) {
            total = Math.round((total / tasks.length) * 100)
        }

        setCompletion(total)
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
                        <TaskView
                            AddTask={AddTask}
                            RemoveTask={RemoveTask}
                            ToggleTask={ToggleTask}
                            tasks={tasks}
                        />
                        <>
                            <input
                                onKeyDown={(e) => {
                                    if (e.key == 'Enter') {
                                        AddTask()
                                    }
                                }}
                                ref={taskInput}
                                placeholder="Task name..."
                            />
                            <button onClick={() => AddTask()}>add</button>
                        </>
                    </div>
                </div>
            </div>
        </div>
    )
}

const TaskView = (props) => {
    return (
        <ul>
            {props.tasks.map((item) => (
                <div key={item.id}>
                    <input
                        onClick={() => props.ToggleTask(item.id)}
                        defaultChecked={item.completed}
                        className="inline"
                        type="checkbox"
                    />
                    <li
                        className={`inline ${item.completed ? 'line-through' : ''}`}
                    >
                        {item.name}
                    </li>
                    <button onClick={() => props.RemoveTask(item.id)}>
                        Remove
                    </button>
                </div>
            ))}
        </ul>
    )
}

export default AssignmentCard
