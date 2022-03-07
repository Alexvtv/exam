import React, {useEffect, useRef, createRef} from 'react';
import {StyleSheet, TouchableOpacity, Animated, Image, Dimensions} from 'react-native';
import ReactNativeZoomableView from '@dudigital/react-native-zoomable-view/src/ReactNativeZoomableView';

import {general} from './styles';

export const Table = ({direction, swipedDirection, setSwipedDirection}) => {
    const gStyles = StyleSheet.create(general);

    const animValue = useRef(new Animated.Value(0.1)).current;
    const zoomableViewRef = createRef();

    useEffect(() => {
        Animated.timing(
            animValue,
            {
                toValue: swipedDirection === direction ? 1.1 : 0.1,
                duration: 200,
                useNativeDriver: false
            }
        ).start();

        zoomableViewRef.current.zoomTo(1);
    }, [swipedDirection]);

    const screen = Dimensions.get('window');

    return (
        <Animated.View style={[
            gStyles.table,
            {height: screen.height},
            {
                [direction]: animValue.interpolate({
                    inputRange: [0.1, 1.1],
                    outputRange: ['-100%', '0%']
                })
            }
        ]}>
            <TouchableOpacity
                onPress={() => setSwipedDirection(null)}
                style={gStyles.crossWrap}>
                <Image
                    source={require('../../../../assets/elements/cross.png')} style={gStyles.cross}/>
            </TouchableOpacity>
            <ReactNativeZoomableView
                ref={zoomableViewRef}
                zoomEnabled={true}
                maxZoom={2.5}
                minZoom={0.99}
                zoomStep={0.2}
                initialZoom={1}
                bindToBorders={true}
                onZoomAfter={() => {
                }}
                style={{
                    maxHeight: '90%',
                    maxWidth: '100%',
                    width: '100%',
                    position: 'relative',
                    top: '2%',
                    overflow: 'hidden',
                }}
            >
                <Image
                    source={direction === 'left'
                        ? require('../../../../assets/left-table.jpg')
                        : require('../../../../assets/right-table.jpg')}
                    style={{height: '100%', maxWidth: '100%', resizeMode: 'contain', position: 'relative'}}/>
            </ReactNativeZoomableView>
        </Animated.View>
    );
};
