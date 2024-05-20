import React from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';
import { Modal } from '@ui-kitten/components';
import MoodForm from './MoodForm';

export const MoodCreationModal = ({
    visible,
    onClose
}): React.ReactElement => {
    return (
        <View style={styles.container}>
            <Modal
                visible={visible}
                backdropStyle={styles.backdrop}
                onBackdropPress={() => onClose()}
                style={styles.modal}
            >
                <MoodForm submitCallback={() => onClose()} />
            </Modal>

        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        minHeight: 230,
    },
    modal: {
        width: '100%',
        height: Dimensions.get('window').height,
    },
    backdrop: {
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    }
});