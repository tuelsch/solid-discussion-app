import * as utils from './utilities'
import slug from 'slug'

const initialState = {
    path: null,
    name: null,
    nameError: null,
    storageUrl: null,
    folderName: null,
    addToPrivateTypeIndex: true,
    isValid: false,
    loading: false,
    saving: false,
}

const newDiscussionLaunch = (state, action) => state

const newDiscussionStorageUrlUpdate = (state, action) => ({ ...state, 
    storageUrl: action.payload
})

const newDiscussionAddToPrivateTypeIndexUpdate = (state, action) => ({ ...state, 
    addToPrivateTypeIndex: action.payload
})

const newDiscussionPathUpdate = (state, action) => ({ ...state, 
    path: action.payload
})

const newDiscussionNameUpdate = (state, action) => ({ ...state, 
    name: action.payload,
    nameError: null,
    folderName: action.payload != '' ? slug(action.payload).toLowerCase() : null    
})

const newDiscussionValidate = (state, action) => { 
    if (state.name == '' || state.name == null) 
        return { ...state,
            nameError: 'This field is mandatory.',
            isValid: false,
        }

    return { ...state, isValid: true }
}

const newDiscussionSaving = (state, action) => ({ ...state,
    saving: true,
    error: null
})

const newDiscussionSaveSuccess = (state, action) => ({ ...state,
    saving: false,
})

const newDiscussionSaveError = (state, action) => ({ ...state,
    saving: false,
    error: action.payload
})


const discussionForm = utils.createReducer(initialState, {
    'NEW_DISCUSSION_LAUNCH' : newDiscussionLaunch,
    'NEW_DISCUSSION_STORAGE_URL_UPDATE' : newDiscussionStorageUrlUpdate,
    'NEW_DISCUSSION_NAME_UPDATE' : newDiscussionNameUpdate,
    'NEW_DISCUSSION_ADD_TO_PRIVATE_TYPE_INDEX_UPDATE' : newDiscussionAddToPrivateTypeIndexUpdate,
    'NEW_DISCUSSION_PATH_UPDATE' : newDiscussionPathUpdate,
    'EXPLORER_SELECT_FOLDER' : newDiscussionPathUpdate,
    'NEW_DISCUSSION_VALIDATE' : newDiscussionValidate,
    'NEW_DISCUSSION_SAVING' : newDiscussionSaving,
    'NEW_DISCUSSION_SAVE_SUCCESS' : newDiscussionSaveSuccess,
    'NEW_DISCUSSION_SAVE_ERROR' : newDiscussionSaveError,
});

export default discussionForm 