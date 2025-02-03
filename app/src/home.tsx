import React, { useEffect, useState, useRef } from 'react';
import { View, FlatList, StyleSheet, ActivityIndicator, Image, Alert, Clipboard, TouchableOpacity } from 'react-native';
import { Appbar, FAB, TextInput, Button, Card, Text, SegmentedButtons, Icon, Divider } from 'react-native-paper';
import leaderboardData from './hooks/leaderboard-data';
import { useTranslation } from 'react-i18next';

import FuzzySearchDialog from './fuzzy-search-dialog';
import LanguageSelector from './components/language-selector';

import firstPrize from '../../assets/icons/1-prize.png';
import secondPrize from '../../assets/icons/2-prize.png';
import thirdPrize from '../../assets/icons/3-prize.png';

const styles = StyleSheet.create({
	page: {
        flex: 1,
	},
    container: {
        flex: 1,
        padding: 20,
    },
    inputContainer: {
        flexDirection: 'row',
        marginBottom: 20,
    },
    input: {
        flex: 1,
        marginRight: 10,
    },
    button: {
        justifyContent: 'center',
    },
    card: {
        marginBottom: 10,
        padding: 10,
    },
	no1: { backgroundColor: '#b2dfdb' },
	no2: { backgroundColor: '#e0f2f7' },
	top10Card: {
		backgroundColor: '#fff9c4'
	},
    highlight: {
        backgroundColor: '#ffeb3b',
    },
	listContainer: {
        flex: 1,
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
    },
	memberList: {
		marginTop: 15,
		width: '100%',
	},
	header: {
		backgroundColor: '#f0f0f0',
		padding: 3,
		alignItems: 'center',
		borderBottomWidth: 1,
		borderBottomColor: '#ddd',
		marginBottom: 5
	},
	headerText: {
		fontSize: 20,
		fontWeight: 'bold',
		color: '#333',
	},
	overlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(255, 255, 255, 0.3)',
        justifyContent: 'center',
        alignItems: 'center',
    },
	txtUserNotFound: {
		color: 'red',
	},
	top10IndicatorCont: {
        width: '100%',
        paddingVertical: 2,
        backgroundColor: '#eee',
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
        alignItems: 'center',
		marginBottom: 5,
    },
    top10Text: {
        fontWeight: 'bold',
        color: '#666',
		fontSize: 11
    },
	icnPrize: {
		width: 25,
		height: 25,
		resizeMode: 'stretch',
	},
	foundUserContainer: {
		width: '100%',
        paddingVertical: 2,
        backgroundColor: '#eee',
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
        alignItems: 'center',
		marginBottom: 5,
	},
	fuzzySearchContainer: {
		width: '100%',
        paddingVertical: 2,
        paddingLeft: 2,
        backgroundColor: '#eee',
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
		marginBottom: 5,
	},
});

const Home = () => {
	const flatListRef = useRef<FlatList>(null);
	const dialogRef = useRef(null);
	const { t } = useTranslation();
    const {
		username,
        setUsername,
        sortValue,
        handleSearch,
        handleSortChange,
        leaderboard,
        loading,
		wasFuzzySearch,
    } = leaderboardData();
	const [ searchTriggered, setSearchTriggered ] = useState(false);

	useEffect(() => {
		if (searchTriggered) {
			dialogRef?.current?.setFuzzySearch('');
			handleSearch();
			setSearchTriggered(false);
		}
	}, [searchTriggered, handleSearch]);

	useEffect(() => {
		// if for what ever reason the fuzzy search hasn't been reset yet then set it here
		if (!wasFuzzySearch && dialogRef?.current?.fuzzySearch) {
			dialogRef?.current?.setFuzzySearch('');
		}

		// we only need to show this modal if the search was not a fuzzy search
		if (!wasFuzzySearch && !!username && !leaderboard.get('userFound')) {
			Alert.alert(
				'Error',
				t('user-doesnt-exist'),
				[
					{ text: t('ok') },
				],
				{ cancelable: false }
			);
		}
		// If a user is found then scroll to the found index
		else if (typeof leaderboard.get('foundUserIndex') === 'number') {
			flatListRef.current.scrollToIndex({
				index: leaderboard.get('foundUserIndex'),
				animated: true,
			});
		}

	}, [leaderboard]);

	const prizeImages = {
		1: firstPrize,
		2: secondPrize,
		3: thirdPrize,
	};

	const handleCopyName = (name) => Clipboard.setString(name);

    return (
		<View style={styles.page}>

			<Appbar.Header mode="center-aligned" elevated={true}>

				<Appbar.Content title={t('leaderboard')} />

				<Appbar.Action icon="magnify" onPress={() => { dialogRef.current && dialogRef.current.show() }} />

			</Appbar.Header>

			<View style={styles.container}>

				<View style={styles.inputContainer}>

					<TextInput
						mode="outlined"
						label={t('enter-username')}
						value={username}
						onChangeText={setUsername}
						style={styles.input}
						right={<TextInput.Icon icon="close" onPress={() => {
							setUsername('');
							setSearchTriggered(true);
						}} />}
					/>

					<Button mode="contained" style={styles.button} icon="magnify" onPress={() => {
						dialogRef?.current?.setFuzzySearch('');
						handleSearch();
					}}>

						{ t('search') }

					</Button>

				</View>

				{dialogRef?.current?.fuzzySearch && <View style={styles.fuzzySearchContainer}>
					
					<Text>

						{ t('fuzzy-search-results', { term: dialogRef?.current?.fuzzySearch }) }
						
					</Text>

				</View>}

				<SegmentedButtons
					value={sortValue}
					onValueChange={handleSortChange}
					buttons={[
						{
							value: 'rank',
							label: t('rank'),
						},
						{
							value: 'name',
							label: t('name'),
						},
						{
							value: 'lowestRank',
							label: t('lowest-rank'),
						},
					]}
				/>

				<View style={styles.listContainer}>

					{/* <Text>{leaderboard.get('members').toString()}</Text> */}

					<FlatList
						ref={flatListRef}
						style={styles.memberList}
						data={leaderboard.get('members').toArray()}
						keyExtractor={(item) => item.get('uid')}
						ListHeaderComponent={() => (
							<View style={styles.header}>

								<Text style={styles.headerText}>
									
									{ t('total-members', { count: leaderboard.get('members')?.size ?? 0 }) }

								</Text>

							</View>
						)}
						renderItem={({ item, index }) => (
							<View>
								{(index === 0 && sortValue === 'rank') && (
									<View style={styles.top10IndicatorCont}>

										<Text style={styles.top10Text}>{t('top-10-members')}</Text>

									</View>
								)}

								{item.get('userMatch') && <View style={styles.foundUserContainer}>

									<Text>{ t('user-found') }</Text>

								</View>}

								<Card
									style={[
										styles.card,
										index === 0 ? styles.no1 : index === 1 ? styles.no2 : index < 10 && styles.top10Card,
										item.get('userMatch') && styles.highlight
									]}
								>
									<Card.Content style={{ flexDirection: 'row', alignItems: 'center' }}>

										<View style={{ flex: 1 }}>

											<TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center' }} onPress={() => handleCopyName(item.get('name'))}>

												<Text style={{ paddingRight: 5 }} variant="titleMedium">

													{item.get('name')}

												</Text>

												<Icon
													source="content-copy"
													size={15} 
													color="gray"
												/>

											</TouchableOpacity>

											<View style={{ flexDirection: 'row' }}>

												<Text>{t('rank')}: #{item.get('rank')}</Text>

												<Text style={{ marginLeft: 5 }}>{t('bananas')}: {item.get('bananas')}</Text>

											</View>

										</View>

										{(index < 3 && sortValue === 'rank') && (
											<View style={{ justifyContent: 'center', alignItems: 'center' }}>

												<Image source={prizeImages[index + 1]} style={styles.icnPrize} />

											</View>
										)}

									</Card.Content>

								</Card>

								{item.get('userMatch') && <View style={{ marginBottom: 10 }} />}

								{index == 9 && <View style={styles.top10IndicatorCont}>
									<Text style={styles.top10Text}>{t('top-10-members-end')}</Text>
								</View>}

							</View>
						)}
					/>

					{loading && (
						<View style={styles.overlay}>
							<ActivityIndicator size="large" color="#0000ff" style={styles.loader} />
						</View>
					)}

				</View>

			</View>

			<LanguageSelector />

			<FuzzySearchDialog
                ref={dialogRef}
                onOkPressed={(searchValue: string) => {
					handleSearch(searchValue);
				}}
            />

		</View>
    );
};

export default Home;