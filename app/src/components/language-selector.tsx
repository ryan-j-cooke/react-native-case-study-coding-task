import { useState } from 'react';
import { StyleSheet } from 'react-native';
import { FAB, Portal, PaperProvider, Image } from 'react-native-paper';
import i18n from '../locales/i18n';

const styles = StyleSheet.create({
	fab: {
        position: 'absolute',
		margin: 16,
		right: 0,
		bottom: 0,
    },
	icnFlag: {
        width: 15,
		height: 10,
	},
});

const LanguageSelector = () => {
	const [ state, setState ] = useState({ open: false });

	const onStateChange = ({ open }) => setState({ open });

	const { open } = state;

	return (
		<FAB.Group
			style={styles.fab}
			open={open}
			visible
			icon={open ? 'flag-outlined' : 'flag'}
			actions={[
				{
					icon: 'select',
					label: 'English',
					onPress: () => {
						i18n.changeLanguage('en');
						setState(false);
					},
				},
				{
					icon: 'select',
					label: 'ไทย',
					onPress: () => {
						i18n.changeLanguage('th');
						setState(false);
					},
				}
			]}
			onStateChange={onStateChange}
		/>
	);
};

export default LanguageSelector;