const ALL_TASKS = 'tasks/all'
const ONE_TASK = 'tasks/one'
const CREATE_TASK = 'tasks/new'
const EDIT_TASK = '/tasks/edit'






const getAllTasksAction = payload => {

    return {
        type: ALL_TASKS,
        payload
    }
}

const oneTask = payload => {
    return {
        type: ONE_TASK,
        payload
    }
}

const createTaskAction = payload => {
    return {
        type: CREATE_TASK,
        payload
    }
}


const editTaskAction = (task) => {
    return {
        type: EDIT_TASK,
        task
    }
}



// thunkville




// read / get tasks 


// pebbles Thunk


export const fetchTasks = () => async dispatch => {
    const res = await fetch('/api/all');
    
    if (res.ok) {

        const tasks = await res.json();

        dispatch(getAllTasksAction(tasks));

        return tasks

    }
}

// notes / task details thunk

export const fetchOneTask = id => async dispatch => {
        
    const res = await fetch(`/api/all/${id}`)
    if (res.ok) {

        const singleTask = await res.json()

        dispatch(oneTask(singleTask))

        return singleTask
    }
}

// create a task thunk

export const createTaskThunk = (payload) => async dispatch => {
    const response = await fetch('/api/all/new_task',
    {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    })

    const data = await response.json()

    
    if (response.ok) {
        await dispatch(createTaskAction(data))
        return data
    } else { // any bad requests and errors
        return data
    }
}

export const editTaskThunk = (task) => async dispatch => {
    const response = await fetch(`/api/all/tasks/${task.id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(task)
    });
    if (response.ok) {
        const task = await response.json();
        dispatch(edit(task))
        return task
    }
    // error handling
    throw new Error("Not this time")
}

// wasted away in reducerville


const initialState = {}


const taskReducer = (state = initialState, action) => {
    let newState = {};

    switch (action.type) {

        case ALL_TASKS: {
            action.payload.tasks.forEach(task => {
                newState[task.id] = task
            })
            return newState
        }

        case ONE_TASK: {

            newState = {...state}
            newState[action.payload.id] = action.payload

            return newState
        }

        case CREATE_GROUP: { 
            newState = { ...state }
            newState[action.payload.id] = action.payload
            return newState
        }

        case EDIT_TASK:
            return {
                ...state,
                [action.task.id]: action.task
            }


        default: {
            return state;
        }
    }
}


export default taskReducer