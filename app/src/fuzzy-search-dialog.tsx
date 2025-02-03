import React, { useState, forwardRef, useImperativeHandle } from 'react';
import { View, StyleSheet } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import Modal from 'react-native-modal';
import { useTranslation } from 'react-i18next';

const styles = StyleSheet.create({
    modalContent: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 8,
    },
    input: {
        width: '100%',
        marginBottom: 10,
    },
	buttonsRow: {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'flex-end',
	},
});

const FuzzySearchDialog = forwardRef(({ onOkPressed }: { onOkPressed: (searchValue: string) => void }, ref) => {
    const { t } = useTranslation();
    const [ showModal, setShowModal ] = useState(false);
    const [ fuzzySearch, setFuzzySearch ] = useState('');

    useImperativeHandle(ref, () => ({
		fuzzySearch,
        show: () => setShowModal(true),
        hide: () => setShowModal(false),
    }));

    return (
        <Modal isVisible={showModal} onBackdropPress={() => setShowModal(false)}>

            <View style={styles.modalContent}>

                <TextInput
                    mode="outlined"
                    label={t('enter-username')}
                    value={fuzzySearch}
                    onChangeText={setFuzzySearch}
                    style={styles.input}
                    right={<TextInput.Icon icon="close" onPress={() => setFuzzySearch('')} />}
                />

				<View style={styles.buttonsRow}>

					<Button style={{ marginRight: 5}} type="outlined" mode="contained-tonal" onPress={() => { setShowModal(false); }}>

						{ t('cancel') }

					</Button>

					<Button mode="contained" icon="magnify" onPress={async () => {
						if (onOkPressed) await onOkPressed(fuzzySearch);

						setShowModal(false);

						// setFuzzySearch('');			
					}}>
						{ t('ok') }

					</Button>

				</View>

            </View>

        </Modal>
    );
});

export default FuzzySearchDialog;