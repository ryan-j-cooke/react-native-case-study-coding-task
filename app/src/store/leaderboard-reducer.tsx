import { fromJS, List } from 'immutable';
import { SET_LEADERBOARD, SET_USER_NOT_FOUND, SORT_BY_NAME, SORT_BY_RANK, SORT_BY_LOWEST_RANK } from './leaderboard-actions';

const initialState = fromJS({
    leaderboard: List(),
    userNotFound: false,
});

const leaderboardReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_LEADERBOARD:
            return state.set('leaderboard', fromJS(action.payload));

        case SET_USER_NOT_FOUND:
            return state.set('userNotFound', action.payload);

        case SORT_BY_NAME:
            return state.update('leaderboard', (list) => list.sort((a, b) => a.get('name').localeCompare(b.get('name'))));

        case SORT_BY_RANK:
            return state.update('leaderboard', (list) => list.sort((a, b) => b.get('bananas') - a.get('bananas')));

        case SORT_BY_LOWEST_RANK:
            return state.update('leaderboard', (list) => {
                const sortedByBananas = list.sort((a, b) => a.get('bananas') - b.get('bananas'));
                return sortedByBananas.sort((a, b) => {
                    if (a.get('bananas') === b.get('bananas')) {
                        return a.get('name').localeCompare(b.get('name'));
                    }
                    return a.get('bananas') - b.get('bananas');
                });
            });

        default:
            return state;
    }
};

export default leaderboardReducer;