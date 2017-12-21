import {
	CHANGE_USERS_NEW_PROJECT_FORM,
	CHANGE_ID_NEW_PROJECT_FORM,
	CHANGE_PROJECT_SAVED,
    CHANGE_RESPONSIBLE_USER,
    CHANGE_PROJECT_WILL_CREATE,
    CHANGE_FIND_TEAM_BUGDET_ERROR,
    SET_ACCEPT_SUGGESTION_STATUS
} from './ProjectConstants'

const NOT_DECIDED = -1, ACCEPTED = 1, DECLINED = 0;
const initialState = {
	projectSaved:{

	},
    projectWillCreate:{
        budget: 0,
        start_day: new Date(),
        end_day: new Date(),
        duration: 0
    },
	responsible_user: [],
    findTeamBudgetError: false,
    acceptSuggestionStatus: NOT_DECIDED
	// _id :{
 //    	'project_id': 0,
 //    },
 //    users: {
 //    	'users': []	
 //    }
    // 'budget': 0,
    // 'deadline': new Date(),
    // 'description': '',
    // 'language_programming': [],
    // 'belong_company' : 0,
    // 'created_by' : 0,
    
};

export function projectReducer(state = initialState, action) {
    switch (action.type) {
        case CHANGE_USERS_NEW_PROJECT_FORM:
            return {
                ...state,
                users: action.newState
            };
        case CHANGE_ID_NEW_PROJECT_FORM:
            return {
                ...state,
                _id: action.newState
            };
        case CHANGE_PROJECT_SAVED:
            return {
                ...state,
                projectSaved: action.newState
            };
        case CHANGE_RESPONSIBLE_USER:
            return {
                ...state,
                responsible_user: action.newState
            };
        case CHANGE_PROJECT_WILL_CREATE:
            return {
                ...state,
                projectWillCreate: action.newState
            };
        case CHANGE_FIND_TEAM_BUGDET_ERROR:
            return {
                ...state,
                findTeamBudgetError: action.newState
            };
        case SET_ACCEPT_SUGGESTION_STATUS:
            return {
                ...state,
                acceptSuggestionStatus: action.newState
            };
            
        default:
            return state;
    }
}

