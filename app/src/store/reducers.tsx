// src/reducers/index.tsx
import { combineReducers } from 'redux';
import leaderboardReducer from './leaderboard-reducer';

const rootReducer = combineReducers({
    leaderboard: leaderboardReducer,
});

export default rootReducer;