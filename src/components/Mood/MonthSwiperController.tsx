import moment from "moment";
import { Gesture, GestureDetector } from "react-native-gesture-handler"
import Animated, { runOnJS, useSharedValue, withTiming } from "react-native-reanimated";
import { Dimensions } from 'react-native';
import { format } from "date-fns";
import { getClosestMonthsDays } from "../../utils/date";
import { useTranslation } from "react-i18next";
import { useEffect } from "react";
import { useMoodStore } from "../../store/moodDiarySlice";

export const MonthSwiperController = ({ children, monthToRender, updateClosestMonthDays }) => {
    const { i18n } = useTranslation();
    const { selectedDate, setSelectedDate: handleSelect, setVisibleMonth, visibleMonth } = useMoodStore(state => state);


    const screenWidth = Dimensions.get('window').width;
    const isTransitioning = useSharedValue(false);



    const translateX = useSharedValue(0);

    useEffect(() => {
        translateX.value = -screenWidth;
    }, [])

    const swipeToNextMonth = () => {
        setVisibleMonth(visibleMonth.clone().add(1, 'month'))
        updateClosestMonthDays(getClosestMonthsDays(visibleMonth.clone().add(1, 'month'), i18n.language));
    };

    const swipeToPreviousMonth = () => {
        setVisibleMonth(visibleMonth.clone().subtract(1, 'month'));
        updateClosestMonthDays(getClosestMonthsDays(visibleMonth.clone().subtract(1, 'month'), i18n.language));
    };


    const panGesture = Gesture.Pan()
        .onUpdate((e) => {
            if (!isTransitioning.value) {
                translateX.value = -screenWidth + e.translationX;
            }
        })
        .onEnd((e) => {
            const threshold = 50;

            if (e.translationX < -threshold && !isTransitioning.value) {
                // свайп влево — следующий месяц
                isTransitioning.value = true;
                translateX.value = withTiming(-screenWidth * 2, {}, () => {
                    runOnJS(swipeToNextMonth)();
                });
            } else if (e.translationX > threshold && !isTransitioning.value) {
                // свайп вправо — предыдущий месяц
                isTransitioning.value = true;
                translateX.value = withTiming(0, {}, () => {
                    runOnJS(swipeToPreviousMonth)();
                });
            } else {
                // недосвайп — вернуться в центр
                translateX.value = withTiming(-screenWidth);
            }
        });

    // useEffect(() => {
    //     console.log("VISIBLE MONTH UPDATED:", visibleMonth.format('MMMM'));
    // }, [ visibleMonth ]);

    useEffect(() => {
        if (isTransitioning.value) {
            let timeout;
            requestAnimationFrame(() => {
                // timeout = setTimeout(() => {
                    translateX.value = -screenWidth;
                    isTransitioning.value = false;    
                // }, 1000);
            });
        }
    }, [ visibleMonth ]);


    return (
        <GestureDetector gesture={panGesture}>
            <Animated.View
                style={{
                    flexDirection: 'row',
                    width: screenWidth * 3,
                    transform: [ { translateX } ],
                }}
            >
                {children}
            </Animated.View>
        </GestureDetector>
    )
}