import config from '../config.js'
import { loadProfile } from './api.js'

const auth = window.solid.auth

async function popupLogin() {
    let session = await auth.currentSession()
    return !session ? 
        await auth.popupLogin({ popupUri: config.popupUri }) : 
        session
}

export const recoverSession = () => (dispatch) => {
    auth.currentSession().then( session => {
        if (!!session) dispatch(login())
    })
} 

export const login = () => dispatch => {
    dispatch({ type: 'AUTHENTICATION_LAUNCH', payload: null })
    // Get the session
    popupLogin().then(
        session => {
            dispatch({ type: 'AUTHENTICATION_SUCCESS', payload: session })
            dispatch({ type: 'REQUEST_USER_PROFILE_LAUNCH', payload: null })     
            // Request the profile
            loadProfile(session.webId, dispatch).then(
                (parsed) => dispatch({ type: 'REQUEST_USER_PROFILE_SUCCESS', payload: parsed }), 
                (error) => dispatch({ type: 'REQUEST_USER_PROFILE_ERROR', payload: error })
            )
        },
        error => dispatch({ type: 'AUTHENTICATION_ERROR', payload: error })
    )    
}