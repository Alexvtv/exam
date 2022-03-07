import React from 'react';
import {Text, View} from 'react-native';

export const stringPreparing = ({string, isBigExample = false, style, width}) => {
    const child = (string) => {
        const result = string.split('$').filter(e => e.length > 0).map((e, i) => (i % 2 === 0)
            ? e.split('^').map((e, i) => ({text: e, stylesType: (i % 2 === 0) ? 1 : 3}))
            : [{text: e, stylesType: 2}]).flat();

        const bigExampleSizeResolver = {
            sm: 12, md: 14, lg: 16
        };

        return <View style={{flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center'}}>
            {result.map(({text, stylesType}, i) => (
                <View key={i}>
                    <View
                        style={[{marginHorizontal: 0}, stylesType === 1 ? {} : {
                            top: stylesType === 2 ? 4 : -6,
                        }]}>
                        <Text
                            style={[...style, {paddingHorizontal: 0}, stylesType === 1
                                ? isBigExample
                                    ? {
                                        fontSize: bigExampleSizeResolver[width]
                                    }
                                    : {}
                                : {
                                    fontSize: 11,
                                }]}>
                            {text}
                        </Text>
                    </View>
                </View>))}
        </View>;
    };

    return !isBigExample
        ? string.split(' + ').map((string, i, arr) => i === arr.length - 1
            ? <View key={i} style={{flexDirection: 'row', flexWrap: 'wrap'}}>{child(`${string}`)}</View>
            : <View key={i} style={{flexDirection: 'row', flexWrap: 'wrap'}}>{child(`${string} + `)}</View>)
        : child(string);
};
