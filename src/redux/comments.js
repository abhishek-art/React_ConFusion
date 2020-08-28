import { COMMENTS } from "../shared/comments"
import * as ActionTypes from './actionTypes';

const Comments = (state= {
    errmess: null,
    comments: []
}, action) =>{
    switch(action.type) {
        case ActionTypes.ADD_COMMENTS:
            return {
                ...state,
                errmess: null,
                comments: action.payload
            }
        case ActionTypes.COMMENTS_FAILED: 
            return {
                ...state,
                errmess: action.payload,
                comments: []
            }
        case ActionTypes.ADD_COMMENT:
            var comment = action.payload;
            return {...state, comments: state.comments.concat(comment)}
        default: 
            return state
    }
}

export default Comments