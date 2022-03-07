import React from 'react';
import {View, Text, Pressable, StyleSheet} from 'react-native';
import {useRoute} from '@react-navigation/native';

import sizes, {general} from './styles';

export const GameResult = ({navigation, socket, accData, width}) => {
    const {answers, roomId} = useRoute().params;
    const {userId, name} = accData;
    const {navigate} = navigation;

    const gStyles = StyleSheet.create(general);
    const styles = StyleSheet.create(sizes[width]);

    const search = () => {
        if (socket) socket.emit('search', {userId, name}, ({roomId, isNew}) => {
            navigate('Room', {roomId, isNew});
        });
    };

    const result = `${answers.filter(({status}) => status === 'correct').length}/${answers.length}`;

    const button = (text, func) => <Pressable style={[gStyles.button, styles.button]} onPress={func}>
        <Text style={[gStyles.buttonText, styles.buttonText]}>{text.toUpperCase()}</Text>
    </Pressable>;

    return <View style={[gStyles.main, styles.main]}>
        <View style={[gStyles.textWrapper, styles.textWrapper]}>
            <Text style={[gStyles.title, styles.title]}>Молодец!</Text>
            <Text style={[gStyles.result, styles.result]}>Верных ответов {result}{'\nРезультат не сохранён'}</Text>
        </View>
        {button('Начать новую игру', search)}
        {button('В главное меню', () => navigate('Main'))}
        {button('Вернуться в игру', () => navigate('Room', {roomId, isCompleted: true}))}
    </View>;
};
