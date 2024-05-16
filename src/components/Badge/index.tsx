import { Icon, Layout, Text } from '@ui-kitten/components'
import React, { useState } from 'react'
import { StyleSheet, TouchableNativeFeedback } from 'react-native'
import Slider from '@react-native-community/slider';

const Badge = ({ title, onCross, emotionPercentage, onEmotionPercentageChange }) => {


    return (
        <Layout style={styles.badgeWrapper}>
            <Layout style={styles.badge}>
                <Text>{title}</Text>
                <TouchableNativeFeedback onPress={onCross}>
                    <Icon
                        style={styles.icon}
                        fill='#8F9BB3'
                        name='close-circle-outline'
                    />
                </TouchableNativeFeedback>
            </Layout>
            <Layout style={{ flexDirection: 'row', justifyContent: 'space-between', marginVertical: 10 }}>
                <Slider
                    style={{ width: 200, height: 40 }}
                    minimumValue={0}
                    maximumValue={1}
                    value={emotionPercentage}
                    onSlidingComplete={(value) => onEmotionPercentageChange({ title, emotionPercentage: value })}
                    // onValueChange={(value) => onEmotionPercentageChange({ title, emotionPercentage: value })}
                    minimumTrackTintColor="#FFFFFF"
                    maximumTrackTintColor="#000000"
                    thumbTintColor='#8F9BB3'
                />
                <Text>{(emotionPercentage * 100).toFixed() + '%'}</Text>
            </Layout>
        </Layout>
    )
}

export default Badge

const styles = StyleSheet.create({
    badge: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 8,
        borderRadius: 4,
        backgroundColor: '#F7F9FC',
        margin: 4,
    },
    icon: {
        width: 32,
        height: 32,
    },
    container: {
        backgroundColor: 'transparent',
    },
    badgeWrapper: {
        marginVertical: 15
    }

});