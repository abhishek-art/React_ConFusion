import * as ActionTypes from './actionTypes';

const Leaders = (state= {
    isLoading: true,
    errmess: null,
    leaders: []
}, action) =>{
    switch(action.type) {
        case ActionTypes.ADD_LEADERS:
            return {
                ...state,
                isLoading: false,
                errmess: null,
                leaders: action.payload
            }
        case ActionTypes.LEADERS_LOADING:
            return {...state,
            isLoading: true,
            errmess: null,
            leaders: []};
        case ActionTypes.LEADERS_FAILED: 
                return {
                    ...state,
                    isLoading: false,
                    errmess: action.payload,
                    leaders: []
                };
        default: 
        return state
    }
}

export default Leaders