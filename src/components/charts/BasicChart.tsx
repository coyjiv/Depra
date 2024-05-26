import React, { useEffect, useMemo } from 'react';
import { View } from "react-native";
import { Area, CartesianChart, Line, useChartPressState } from "victory-native";
import { LinearGradient, useFont, vec, Line as SkiaLine, Text as SkiaText } from "@shopify/react-native-skia";
import { Nunito_400Regular, Nunito_600SemiBold } from "@expo-google-fonts/nunito";
import moment from 'moment';
import { Circle } from "@shopify/react-native-skia";
import { SharedValue, useDerivedValue } from 'react-native-reanimated';
import { useTheme } from '@ui-kitten/components';
import { useColorScheme } from 'react-native';
import { createFullTimeline } from '../../utils/date';
import { appColors } from '../../constants/colors';

interface BasicChartProps {
    data: any[],
    xKey: string,
    yKeys: string[]
}

export const BasicChart = ({ data = [], xKey, yKeys }: BasicChartProps) => {
    // const fullData = useMemo(() => createFullTimeline(data), [ data ]);
    // console.log('data', fullData);

    const theme = useTheme();

    const font = useFont(Nunito_400Regular, 12);
    const { state, isActive } = useChartPressState({ x: 0, y: { score: 0 } });

    const indicatorColor = useDerivedValue(() => {
        if (!(isActive)) return theme[ 'color-primary-500' ];
        return theme[ 'color-primary-500' ];
    });

    const formattedData = data
        .map(item => ({
            ...item,
            createdDate: new Date(item.createdDate),
            displayDate: moment(item.createdDate).format('DD/MM/YY')
        }))
        .sort((a, b) => a.createdDate - b.createdDate);


    if (data.length === 0) {
        return null;
    }



    // console.log('formattedData', formattedData);


    return (
        <View style={{ flex: 1, minHeight: 500, backgroundColor: 'white' }}>
            <CartesianChart
                chartPressState={state}
                data={formattedData}
                xKey="displayDate"
                yKeys={[ "score" ]}
                domainPadding={{ left: 15, right: 15, top: 90 }}
                axisOptions={{
                    font,
                    labelColor: '#666',
                    formatXLabel: (value) => value ?? '',
                    labelOffset: { x: 12, y: 15 },
                    labelPosition: { x: "outset", y: "outset" },
                    axisSide: { x: "bottom", y: "left" },
                    tickCount: { x: 4, y: 5 },
                }}
            >
                {({ points, chartBounds }) => (
                    <>
                        <Area
                            points={points.score}
                            chartBounds={chartBounds}
                            connectMissingData={true}
                            curveType='natural'
                            color={theme[ 'color-primary-500' ]}
                            y0={chartBounds.bottom}
                        >
                            <LinearGradient
                                start={vec(0, chartBounds.top)}
                                end={vec(0, chartBounds.bottom)}
                                colors={[ theme[ 'color-primary-500' ], theme[ 'color-primary-100' ] ]}
                            />
                        </Area>
                        {isActive && (
                            <>
                                <ActiveValueIndicator
                                    xPosition={state.x.position}
                                    yPosition={state.y.score.position}
                                    bottom={chartBounds.bottom}
                                    top={chartBounds.top}
                                    activeValue={state.y.score.value}
                                    textColor={'black'}
                                    lineColor={"#71717a"}
                                    indicatorColor={indicatorColor}
                                />
                            </>
                        )}
                    </>
                )}
            </CartesianChart>
        </View>
    );
};

function ToolTip({ x, y }) {
    useEffect(() => {
        console.log('ToolTip rendered with x:', x, 'and y:', y);
    }, [ x, y ]);  // Logs every time x or y changes

    return <Circle cx={x.value} cy={y.value} r={8} color="black" />;
}

const ActiveValueIndicator = ({
    xPosition,
    yPosition,
    top,
    bottom,
    activeValue,
    textColor,
    lineColor,
    indicatorColor,
    topOffset = 0,
}: {
    xPosition: SharedValue<number>;
    yPosition: SharedValue<number>;
    activeValue: SharedValue<number>;
    bottom: number;
    top: number;
    textColor: string;
    lineColor: string;
    indicatorColor: SharedValue<string>;
    topOffset?: number;
}) => {
    const FONT_SIZE = 16;
    const font = useFont(Nunito_600SemiBold, FONT_SIZE);
    const start = useDerivedValue(() => vec(xPosition.value, bottom));
    const end = useDerivedValue(() =>
        vec(xPosition.value, top + 1.5 * FONT_SIZE + topOffset),
    );
    // Text label
    const activeValueDisplay = useDerivedValue(
        () => activeValue.value.toFixed(),
    );
    const activeValueWidth = useDerivedValue(
        () => font?.getTextWidth(activeValueDisplay.value) || 0,
    );
    const activeValueX = useDerivedValue(
        () => xPosition.value - activeValueWidth.value / 2,
    );



    return (
        <>
            <SkiaLine p1={start} p2={end} color={lineColor} strokeWidth={1} />
            <Circle cx={xPosition} cy={yPosition} r={10} color={indicatorColor} />
            <Circle
                cx={xPosition}
                cy={yPosition}
                r={8}
                color="hsla(0, 0, 100%, 0.25)"
            />
            <SkiaText
                color={textColor}
                font={font}
                text={activeValueDisplay}
                x={activeValueX}
                y={top + FONT_SIZE + topOffset}
            />
        </>
    );
};