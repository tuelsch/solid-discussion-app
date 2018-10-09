import * as requests from './discussions.requests'

export const newDiscussion = () => dispatch => {
    dispatch({ type: 'NEW_DISCUSSION_LAUNCH', payload: null })    
}


const getAbsoluteUrl = (baseUrl, relativeUrl) => {
    if (relativeUrl.substring(0,1) != '/') // not relative 
        return relativeUrl
    else return baseUrl + relativeUrl.substring(1, relativeUrl.length)
}

async function saveNewDiscussion(newDiscussion, webId, privateTypeIndexUrl, dispatch) {
    
    const containerRelativeUrl = await requests.saveContainer(newDiscussion).then(
        data => Promise.resolve(data),
        error => dispatch({ type: 'NEW_DISCUSSION_SAVE_ERROR', payload: error.message })  
    )
    if (containerRelativeUrl != undefined) {
        const containerUrl = getAbsoluteUrl(newDiscussion.storageUrl, containerRelativeUrl)
        const indexRelativeUrl = await requests.saveIndexFile(newDiscussion, webId, containerUrl).then(
            data => Promise.resolve(data),
            error => dispatch({ type: 'NEW_DISCUSSION_SAVE_ERROR', payload: error.message })  
        )
        if (indexRelativeUrl != undefined) {
            const indexUrl = getAbsoluteUrl(newDiscussion.storageUrl, indexRelativeUrl)
            dispatch({ type: 'NEW_DISCUSSION_SAVE_SUCCESS', payload: `The discussion has been created at ${indexUrl}` })
            if (newDiscussion.addToPrivateTypeIndex) {
                await requests.addDiscussionToPrivateRegistry(indexRelativeUrl, privateTypeIndexUrl).then(
                    data => Promise.resolve(data),
                    error => dispatch({ type: 'NEW_DISCUSSION_SAVE_ERROR', payload: error.message })  
                )
            } 
        }
    }
} 

export const changeNewDiscussionStorage = storageUrl => dispatch => {
    dispatch({ type: 'NEW_DISCUSSION_STORAGE_URL_UPDATE', payload: storageUrl })    
}

export const changeNewDiscussionName = name => dispatch => {
    dispatch({ type: 'NEW_DISCUSSION_NAME_UPDATE', payload: name })    
}

export const changeNewDiscussionPath = path => dispatch => {
    dispatch({ type: 'NEW_DISCUSSION_PATH_UPDATE', payload: path })    
}

export const changeNewDiscussionAddPrivateIndex = added => dispatch => {
    dispatch({ type: 'NEW_DISCUSSION_ADD_TO_PRIVATE_TYPE_INDEX_UPDATE', payload: added })    
}

export const cancelNewDiscussion = added => dispatch => {
    dispatch({ type: 'NEW_DISCUSSION_CANCEL', payload: added })    
}

export const createNewDiscussion = () => (dispatch, getStore) => {
    dispatch({ type: 'NEW_DISCUSSION_VALIDATE', payload: null })
    const store = getStore()
    const webId = store.user.webId
    const discussionForm = store.discussionForm
    const privateTypeIndexUrl = store.user.privateTypeIndexUrl
    if (discussionForm.isValid) 
        saveNewDiscussion(discussionForm, webId, privateTypeIndexUrl, dispatch)      
}