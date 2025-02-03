import { fromJS } from 'immutable';

export interface User {
	uid: string;
	bananas: number;
	lastDayPlayed: string;
	longestStreak: number;
	name: string;
	stars: number;
	subscribed: boolean;
	rank: number;
	userMatch?: boolean;
};

export interface LeaderboardState {
    members: User[];
	foundUserIndex?: number;
    userFound: boolean;
};

export const SET_LEADERBOARD = 'SET_LEADERBOARD';
export const SET_FILTERED_LEADERBOARD = 'SET_FILTERED_LEADERBOARD';

export const setLeaderboard = (leaderboard: User[]) => {
	return {
		type: SET_LEADERBOARD,
		payload: fromJS(leaderboard),
	};
};

export const setFilteredLeaderboard = (filteredLeaderboard: LeaderboardState) => ({
	type: SET_FILTERED_LEADERBOARD,
	payload: fromJS(filteredLeaderboard),
});

const actions = {
	SET_FILTERED_LEADERBOARD,
    SET_LEADERBOARD,
    setLeaderboard,
	setFilteredLeaderboard,
};

export default actions;
