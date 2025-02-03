import { fromJS } from 'immutable';

export const SET_LEADERBOARD = 'SET_LEADERBOARD';
export const SET_USER_NOT_FOUND = 'SET_USER_NOT_FOUND';
export const SORT_BY_NAME = 'SORT_BY_NAME';
export const SORT_BY_RANK = 'SORT_BY_RANK';
export const SORT_BY_LOWEST_RANK = 'SORT_BY_LOWEST_RANK';

export const setLeaderboard = (leaderboard: any) => ({
    type: SET_LEADERBOARD,
    payload: fromJS(leaderboard),
});

export const sortByName = () => ({
    type: SORT_BY_NAME,
});

export const sortByRank = () => ({
    type: SORT_BY_RANK,
});

export const sortByLowestRank = () => ({
    type: SORT_BY_LOWEST_RANK,
});

const actions = {
  SET_LEADERBOARD,
  SET_USER_NOT_FOUND,
  SORT_BY_NAME,
  SORT_BY_RANK,
  SORT_BY_LOWEST_RANK,
  setLeaderboard,
  sortByName,
  sortByRank,
  sortByLowestRank
};

export default actions;