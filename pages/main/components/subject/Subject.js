import React from 'react';
import {Image, Pressable, Text, View} from 'react-native';

export const Subject = ({sub, gStyles, styles, navigate, stat}) => {
    const {subject, locale} = sub;
    const {scores} = stat.find(e => e.subject === subject) || {};

    return (
        <Pressable
            style={[gStyles.button, styles.button, !subject ? {filter: 'grayscale(60%)'} : {}]}
            onPress={() => subject ? navigate('Search', {subject, locale}) : {}}>
            <View style={gStyles.buttonInner}>
                <Text style={[gStyles.buttonText, styles.buttonText]}>{locale.toUpperCase()}</Text>
                <View style={gStyles.stars}>
                    <Image source={require('../../../../assets/common/star.png')}
                           style={styles.starImg}/>
                    <Text style={[gStyles.buttonText, styles.starsQty]}>{scores || 'error'}</Text>
                </View>
            </View>
            <Image source={require('../../../../assets/common/subjects/chemistry.png')}
                   style={styles.subjectImg}/>
        </Pressable>
    );
}
