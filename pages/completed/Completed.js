import React, {useEffect, useState} from 'react';
import {StyleSheet, View, Image, Pressable} from 'react-native';
import {useRoute} from '@react-navigation/native';

import {GamesList} from './components';
import {serverUrl} from '../../config';

import sizes, {general} from './styles';

export const Completed = ({navigation, socket, accData, width}) => {
    const {userId} = accData;
    const {subject, locale} = useRoute().params;
    const {navigate} = navigation;

    const [rooms, setRooms] = useState(null);

    const size = sizes[width];
    const styles = StyleSheet.create(size);
    const gStyles = StyleSheet.create(general);
    const {titleWrapper} = size;

    useEffect(() => {
        fetch(`${serverUrl}api/getCompletedRooms`, {
            method: 'POST',
            body: JSON.stringify({userId}),
            headers: {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'}
        })
            .then((res) => res.json())
            .then(data => {
                if (data.length > 0) setRooms(data);
            });

        return () => console.log('unmount');
    }, []);

    const enterRoom = (id) => {
        if (socket) navigate('Room', {roomId: id, isCompleted: true});
    };

    return (
        <View style={gStyles.wrapper}>
            <Pressable
                style={[gStyles.back, styles.back]}
                onPress={() => subject && locale
                    ? navigate('Search', {subject, locale})
                    : navigate('Main')}>
                <Image
                    style={{width: '100%', height: '100%', resizeMode: 'contain', transform: [{rotate: '180deg'}]}}
                    source={require(`../../assets/elements/arrow.png`)}/>
            </Pressable>
            <GamesList
                gStyles={gStyles}
                styles={styles}
                rooms={rooms}
                titleWrapper={titleWrapper}
                userId={userId}
                enterRoom={enterRoom}/>
        </View>
    );
};
