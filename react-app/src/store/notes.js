const ONE_NOTE = 'notes/one'
const CREATE_NOTE = 'notes/new'
const EDIT_NOTE = 'notes/edit'
const DELETE_NOTE = 'notes/delete'
const ALL_NOTES = 'notes/all'

// ACTION CREATORS
const oneNote = payload => {
    return {
        type: ONE_NOTE,
        payload
    }
}

const allNotes = payload => {
    return {
        type: ALL_NOTES,
        payload
    }
}

const createNoteAction = (payload) => {
    return {
        type: CREATE_NOTE,
        payload
    }
}

const editNoteAction = (note) => {
    return {
        type: EDIT_NOTE,
        note
    }
}

const removeNoteAction = (noteId) => {
    return {
        type: DELETE_NOTE,
        noteId
    }
}
export const getAllNotes = () => async dispatch =>{
    const response = await fetch(`/api/all/notes`)

    if (response.ok){
        const notes = await response.json()
        dispatch(allNotes(notes))
        return notes
    }
}
// THUNKS
export const getOneNote = (id) => async dispatch => {
    const response = await fetch(`/api/all/notes/${id}`)

    if (response.ok) {
        const singleNote = await response.json();
        dispatch(oneNote(singleNote))
        return singleNote
    }
}

export const createNoteThunk = (payload, id) => async dispatch => {
    const response = await fetch(`/api/all/${id}/new_note`,
    {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    });

    if (response.ok) {
        const data = await response.json()
        await dispatch(createNoteAction(data))
        return data
    } else { // any bad requests and errors
        throw new Error("Bad Note Thunk")
    }
}

export const editNoteThunk = (note, id) => async dispatch => {
    const response = await fetch(`/api/all/notes/${id}`, {
        method: "PUT",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(note)
    });
    if (response.ok) {
        const note = await response.json();
        dispatch(editNoteAction(note))
        return note
    }
    throw new Error ("Edit Note Thunk Bad")
}

export const deleteNoteThunk = (noteId) => async dispatch => {
    const response = await fetch(`/api/all/notes/${noteId}`, {
        method: "DELETE",
        headers: {"Content-Type": "application/json"}
    });
    if (response.ok) {
        const note = `${noteId}`
        dispatch(removeNoteAction(note))
    }
}

// REDUCER
const initialState = {}

const noteReducer = (state=initialState, action) => {
    let newState = {};
    switch (action.type) {
        case ALL_NOTES:{
            action.payload.notes.forEach(note => {
                newState[note.id] = note
            })
            return newState
        }



        case ONE_NOTE: {
            newState = {...state}
            newState[action.payload.id] = action.payload
            return newState
        }

        case CREATE_NOTE: {
            
            newState = { ...state }
            newState[action.payload.id] = action.payload
            
            return newState
        }

        case EDIT_NOTE:
            return {
                ...state,
                [action.note.id]: action.note
            }

        case DELETE_NOTE:
            newState = {...state}
            delete newState[action.noteId]
            return newState;

        default: {
            return state;
        }
    }
}


export default noteReducer;
