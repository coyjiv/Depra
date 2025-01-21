import React from 'react';
import { Text } from 'react-native';
import Animated, { useAnimatedStyle, withTiming } from 'react-native-reanimated';

const AnimatedErrorText = ({ error, customCriteria=false }:{error:string; customCriteria?:boolean}) => {
    const isVisible = !!error && customCriteria;
    const animatedStyle = useAnimatedStyle(() => {
        return {
            opacity: withTiming(isVisible ? 1 : 0, { duration: 300 }),
            height: withTiming(isVisible ? 30 : 0, { duration: 300 }),
            overflow: 'hidden',
        };
    });

    return (
        <Animated.View style={[animatedStyle]}>
            {isVisible && (
                <Text style={{ color: 'red', marginTop: 10 }}>
                    {error}
                </Text>
            )}
        </Animated.View>
    );
};

export default AnimatedErrorText;
