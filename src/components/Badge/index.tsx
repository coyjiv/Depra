import { Icon, Layout, Text, useTheme } from '@ui-kitten/components'
import React, { useState } from 'react'
import { Dimensions, StyleSheet, TouchableNativeFeedback } from 'react-native'
import Slider from '@react-native-community/slider';

const Badge = ({ title, onCross, emotionPercentage, onBadgePercentageChange, withBadgePercentage = false }) => {

    const theme = useTheme();

    return (
        <Layout style={styles.badgeWrapper}>
            <Layout style={styles.badge}>
                <Text style={{ fontSize: 18 }}>{title}</Text>
                <TouchableNativeFeedback onPress={onCross}>
                    <Icon
                        style={styles.icon}
                        fill='#8F9BB3'
                        name='close-circle-outline'
                    />
                </TouchableNativeFeedback>
            </Layout>
            {withBadgePercentage && <Layout style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginVertical: 10 }}>
                <Slider
                    style={{ width: Dimensions.get('screen').width - 100, height: 40 }}
                    minimumValue={0}
                    maximumValue={1}
                    value={emotionPercentage}
                    onSlidingComplete={(value) => onBadgePercentageChange({ title, emotionPercentage: value })}
                    // onValueChange={(value) => onBadgePercentageChange({ title, emotionPercentage: value })}
                    minimumTrackTintColor={theme[ 'color-primary-400' ]}
                    maximumTrackTintColor="#000000"
                    thumbTintColor={theme[ 'color-primary-500' ]}
                />
                <Text style={{ fontSize: 16 }}>{(emotionPercentage * 100).toFixed() + '%'}</Text>
            </Layout>}
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