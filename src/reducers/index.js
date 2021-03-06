import { combineReducers } from 'redux'
import layout from './layout'
import user from './user'
import discussionForm from './discussionForm'
import explorer from './explorer'
import entities from './entities'
import discussions from './discussions'

export default combineReducers({
	layout,
	user,
	discussions,
	entities,
	explorer,
    discussionForm,
})