import * as utils from './utilities'

/*****************/
/* Reducer shape */
/*****************/

const initialState = {
    leftDrawer: {
        open: false
    },
    snackbar: {
        queue: [],
        open: false,
        messageInfo: {}
    },
    newDiscussionForm: {
        open: false
    },
    explorer: {
        open: false
    }
}

/*********************/
/* Utility functions */
/*********************/

const handleAddSnackbarMessage = (snackbarState, message) => {
    let newSnackbarState = {
        ...snackbarState,
        queue: [
            ...snackbarState.queue,
            { message, key: new Date().getTime() }  
        ]
    }
    
    if (newSnackbarState.open) {
        // immediately begin dismissing current message to start showing new one
        return { 
            ...newSnackbarState,
            open: false
        } 
    } else {
        return handleProcessSnackbarQueue(newSnackbarState);
    }
}

const handleProcessSnackbarQueue = snackbarState => {
    if (snackbarState.queue.length > 0) {
        return {
            ...snackbarState,
            messageInfo: snackbarState.queue[0],
            open: true,
            queue: [...snackbarState.queue.slice(0, snackbarState.queue.length - 1)] 
        }
    }

    return snackbarState
}

const handleSnackbarClose = (snackbarState, action) => {
    if (action.payload === 'clickaway') return snackbarState 
    return handleOpenClose(snackbarState, false)
}

const handleOpenClose = (storeObject, value) => ({ ...storeObject, open: value }) 

/**************************/
/* Case reducer functions */
/**************************/

const newDiscussionLaunch = (state, action) => ({ ...state, 
    newDiscussionForm: handleOpenClose(state.newDiscussionForm, true) 
})

const newDiscussionSaveSuccess = (state, action) => ({ ...state, 
    newDiscussionForm: handleOpenClose(state.newDiscussionForm, false),
    snackbar: handleAddSnackbarMessage(state.snackbar, action.payload) 
})

const newDiscussionCancel = (state, action) => ({ ...state, 
    newDiscussionForm: handleOpenClose(state.newDiscussionForm, false) 
})

const toggleLeftDrawer = (state, action) => ({ ...state, 
    leftDrawer: handleOpenClose(state.leftDrawer, !state.leftDrawer.open) 
})

const closeLeftDrawer = (state, action) => ({ ...state, 
    leftDrawer: handleOpenClose(state.leftDrawer, false) 
})

const openLeftDrawer = (state, action) => ({ ...state, 
    leftDrawer: handleOpenClose(state.leftDrawer, true) 
})

const snackbarClose = (state, action) => ({ ...state, 
    snackbar: handleSnackbarClose(state.snackbar, action) 
})

const snackbarExited = (state, action) => ({ ...state, 
    snackbar: handleProcessSnackbarQueue(state.snackbar) 
})

const parseProfileError = (state, action) => ({ ...state, 
    snackbar: handleAddSnackbarMessage(state.snackbar, action.payload) 
})

const requestProfileError = (state, action) => ({ ...state, 
    snackbar: handleAddSnackbarMessage(state.snackbar, action.payload)         
})

const newDiscussionSaveError = (state, action) => ({ ...state, 
    snackbar: handleAddSnackbarMessage(state.snackbar, action.payload) 
})

const explorerOpen = (state, action) => ({ ...state, 
    explorer: handleOpenClose(state.explorer, true)     
})

const explorerClose = (state, action) => ({ ...state, 
    explorer: handleOpenClose(state.explorer, false)     
})

/******************/
/* Reducer switch */
/******************/

const discussions = utils.createReducer(initialState, {
    'NEW_DISCUSSION_LAUNCH' : newDiscussionLaunch,
    'NEW_DISCUSSION_SAVE_SUCCESS' : newDiscussionSaveSuccess,
    'NEW_DISCUSSION_CANCEL' : newDiscussionCancel,
    'TOGGLE_LEFT_DRAWER' : toggleLeftDrawer,
    'CLOSE_LEFT_DRAWER' : closeLeftDrawer,
    'OPEN_LEFT_DRAWER' : openLeftDrawer,
    'SNACKBAR_CLOSE' : snackbarClose,
    'SNACKBAR_EXITED' : snackbarExited,
    'PARSE_PROFILE_ERROR' : parseProfileError,
    'REQUEST_PROFILE_ERROR' : requestProfileError,
    'NEW_DISCUSSION_SAVE_ERROR' : newDiscussionSaveError,
    'EXPLORER_OPEN' : explorerOpen,
    'EXPLORER_CLOSE' : explorerClose,
});

export default discussions        