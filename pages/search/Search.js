import React, {useState} from 'react';
import {StyleSheet, Text, View, Pressable, TextInput} from 'react-native';
import sizes, {general} from './styles';
import {useRoute} from '@react-navigation/native';
import {BoxShadow} from 'react-native-shadow';

export const Search = ({navigation, socket, accData, width}) => {
    const {subject, locale} = useRoute().params;
    const {userId, name} = accData;
    const {navigate} = navigation;

    //const [roomId, setRoomId] = useState('');

    const size = sizes[width];
    const gStyles = StyleSheet.create(general);
    const styles = StyleSheet.create(size);

    const search = () => {
        if (socket) socket.emit('search', {userId, name}, ({roomId, isNew}) => {
            if (roomId) {
                navigate('Room', {roomId, isNew});
            } else {
                navigate('Main');
            }
        });
    };

    /*const searchTest = () => {
        console.log('test', socket);

        if (socket) socket.emit('test room', {userId, id: roomId}, (roomId) => {
            console.log(roomId, 'roomId');

            if (!!roomId) {
                navigation.navigate('Room', {roomId});
            } else {
                navigation.navigate('Main');
            }
        });
    }*/

    const button = (text, func, style) => <Pressable style={[gStyles.button, styles.button, style]} onPress={func}>
        <Text style={[gStyles.buttonText, styles.buttonText]}>{text.toUpperCase()}</Text>
    </Pressable>;

    const {localeWrapper} = size;

    //const changeRoomId = (id) => setRoomId(id);

    return (
        <View style={[gStyles.main, styles.main]}>
            <BoxShadow setting={{
                width: localeWrapper.width,
                height: localeWrapper.height,
                color: '#000',
                border: 7,
                radius: 12,
                opacity: 0.3,
                x: 2,
                y: 4,
                style: {marginLeft: 'auto', marginRight: 'auto', marginBottom: 70}
            }}>
                <Text style={[gStyles.locale, styles.locale, {maxHeight: localeWrapper.height}]}>{locale}</Text>
            </BoxShadow>
            {button('Случайный соперник', search)}
            {/* {button('Тестовая комната', searchTest)}
            <TextInput
                style={gStyles.nameInput}
                value={roomId}
                onChangeText={changeRoomId}/>*/}
            {button('завершенные игры', () => navigate('Completed', {subject, locale}))}
            {button('главное меню', () => navigate('Main'), {marginTop: 50})}
        </View>
    );
};

