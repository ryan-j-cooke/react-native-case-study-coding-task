import React, { useState, useEffect } from 'react';
import { Alert, Keyboard } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { setLeaderboard, sortByName, sortByRank, sortByLowestRank } from '../store/leaderboard-actions';
import { useTranslation } from 'react-i18next';
import * as FileSystem from 'expo-file-system';

interface User {
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

interface LeaderboardState {
    members: User[];
	foundUserIndex?: number;
    userFound: boolean;
};

const leaderboardData = () => {
    const [ username, setUsername ] = useState('');
    const [ sortValue, setSortValue ] = useState('rank');
    const [ loading, setLoading ] = useState(true);
    const [ filteredLeaderboard, setFilteredLeaderboard ] = useState<LeaderboardState>({ 
		members: [], 
		userFound: false 
	});
    const leaderboard = useSelector((state: { leaderboard: { leaderboard: User[];} }) => state.leaderboard.leaderboard);
    const dispatch = useDispatch();
    const { t } = useTranslation();

	const fetchData = async () => {
		setLoading(true);

		try {
			const { exists } = await FileSystem.getInfoAsync(FileSystem.documentDirectory + 'leaderboard.json');

			if (!exists) {
				const leaderboardAsset = require('../../../assets/leaderboard.json');
				const assetString = JSON.stringify(leaderboardAsset);

				await FileSystem.writeAsStringAsync(FileSystem.documentDirectory + 'leaderboard.json', assetString);
			}

			const fileContent = await FileSystem.readAsStringAsync(FileSystem.documentDirectory + 'leaderboard.json');
			/**
			 * 1. Parse the file content
			 * 2. Sort on that amount of bannanas
			 * 3. Map the user object while setting a rank based on the index + 1
			 */
			const members: User[] = Object.values(JSON.parse(fileContent)).sort((a, b) => b.bananas - a.bananas).map((u, index) => ({
				...u,
				rank: index + 1,
				userMatch: false,
			}));

			dispatch(setLeaderboard(members));
			setFilteredLeaderboard({ members, userFound: false });
		}
		catch (error) {
			console.error('Error reading file:', error);
			Alert.alert(t('error-reading-file'));
		}
		finally {
			// set this timeout to give the UX / UI a bit of a better feel
			setTimeout(() => setLoading(false), 500);
		}
	};

    useEffect(() => { fetchData() }, [dispatch, t]);

    const handleSearch = () => {
		if (loading) return;

		Keyboard.dismiss();
	
		if (!username) {
			fetchData();
			return;
		}

		const out = { members: [], userFound: false };
	
		// Take the top 10 - This will take care of case
		filteredLeaderboard.members.slice(0, 10).forEach((user, index) => {
			const userMatch = user.name.toLowerCase() === username.toLowerCase();
			const newUser = { ...user, userMatch };
			out.members.push(newUser);

			if (userMatch) {
				out.userFound = true;
				out.foundUserIndex = index;
			}
		});

		/**
		 * Case 2:
		 *    1. If there was no user found in the top ten
		 *    2. Then we filter on the whole list
		 *    3. If found then we replace the last rank of the top ten 
		 */
		if (!out.userFound) {
			const filtered: User[] = filteredLeaderboard.members.filter(user =>
				user.name.toLowerCase() === username.toLowerCase()
			);

			// If a user is found
			if (filtered.length > 0) {
				// replace the last item
				const userToReplace = filtered[0];

				// If top 10 has less than 10 members, just add the found user
				if (out.members.length < 10) {
					out.members.push({...userToReplace, userMatch: true});
					out.foundUserIndex = out.members.length - 1;
				}
				// Otherwise replace the last element of top 10
				else {
					out.members[9] = { ...userToReplace, userMatch: true };
					out.foundUserIndex = 9;
				}

				out.userFound = true;
			}
		}

		setFilteredLeaderboard(out);
	};

    const handleSortChange = (value: string) => {
        if (loading) return;

		Keyboard.dismiss();

		// clear out any filtering
		setUsername('');

		setSortValue(value);

		// Here I'm filtering out users with no name as it didn't seem to make sense to show them
		const sortedList: User[] = filteredLeaderboard.members.filter(user => user.name !== '');

        switch (value) {
            case 'name':
                sortedList.sort((a, b) => a.name.localeCompare(b.name));
                break;

            case 'rank':
                sortedList.sort((a, b) => b.bananas - a.bananas);
                break;

            case 'lowestRank':
                sortedList.sort((a, b) => b.rank - a.rank);
                break;

            default: break;
        }

        setFilteredLeaderboard({ members: sortedList, userFound: false });
    };

    return {
        username,
        setUsername,
        sortValue,
        handleSearch,
        handleSortChange,
        leaderboard: filteredLeaderboard,
        loading,
    };
};

export default leaderboardData;