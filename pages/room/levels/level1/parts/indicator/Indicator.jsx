import React, {useRef, useEffect} from 'react';
import {Animated} from 'react-native';
import Svg, {Ellipse} from 'react-native-svg';

export const Indicator = ({isActive, width}) => {
    const animValue = useRef(new Animated.Value(isActive ? 1.1 : 0.1)).current;

    useEffect(() => {
        Animated.timing(
            animValue,
            {
                toValue: isActive ? 1.1 : 0.1,
                duration: 300,
                useNativeDriver: false
            }
        ).start();
    }, [isActive]);

    const AnimateEllipse = Animated.createAnimatedComponent(Ellipse);
    const styleTopResolver = {
        sm: 13,
        md: 16,
        lg: 19
    };

    return (
        <Animated.View style={{
            position: 'absolute',
            zIndex: 10,
            top: styleTopResolver[width],
            left: 3,
            width: 26,
            height: 26,
        }}>
            <Svg width={26} height={26}>
                <AnimateEllipse
                    stroke={animValue.interpolate({
                        inputRange: [0.1, 1.1],
                        outputRange: ['#705e02', '#f2d230']
                    })}
                    strokeWidth={4}
                    fill="none"
                    ry={10}
                    rx={10}
                    cy={12}
                    cx={12}
                    strokeDasharray={10}
                    strokeDashoffset={animValue.interpolate({
                        inputRange: [0.1, 1.1],
                        outputRange: [15, -14]
                    })}/>
            </Svg>
        </Animated.View>
    );
};
