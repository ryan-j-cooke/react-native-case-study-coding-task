import { createStore } from 'redux';
import { fromJS, Map, List } from 'immutable';

const initialState = fromJS({
    leaderboard: [],
	filteredLeaderboard: {
		members: [], 
		userFound: false,
	},
});

const leaderboardReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_LEADERBOARD':
            return state.set('leaderboard', action.payload);

		case 'SET_FILTERED_LEADERBOARD':
			return state.set('filteredLeaderboard', action.payload);
			
        default:
            return state;
    }
};

const store = createStore(leaderboardReducer);

export default store;
