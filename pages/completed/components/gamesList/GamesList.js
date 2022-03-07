import React from 'react';
import {Image, Pressable, ScrollView, Text, View} from 'react-native';
import {BoxShadow} from 'react-native-shadow';

export const GamesList = ({gStyles, styles, rooms, titleWrapper, userId, enterRoom}) => {

    return (
        <View style={[gStyles.completedGames, styles.completedGames]}>
            <BoxShadow setting={{
                width: titleWrapper.width,
                height: titleWrapper.height,
                color: '#000',
                border: 7,
                radius: 10,
                opacity: 0.3,
                x: 2,
                y: 4,
                style: {marginLeft: 'auto', marginRight: 'auto', marginBottom: 30}
            }}>
                <Text style={[gStyles.completedGamesTitle, styles.completedGamesTitle]}>
                    {'Завершённые игры'.toUpperCase()}
                </Text>
            </BoxShadow>
            <ScrollView style={[gStyles.completedGamesList, styles.completedGamesList]}>
                {
                    rooms !== null
                        ? rooms.map(room => {
                            const {_id, users} = room;
                            const {answers} = users.find(e => e.userId === userId);
                            const rival = users.filter(e => e.userId !== userId)[0];

                            return (
                                <Pressable style={gStyles.room} key={_id} onPress={() => enterRoom(_id)}>
                                    <Text
                                        style={[gStyles.text, gStyles.bigFontSize]}>{rival ? `Игра против ${rival.name}` : `Ожидание соперника`}</Text>
                                    <Text style={gStyles.text}>Верных
                                        ответов: {answers.filter(({status}) => status === 'correct').length}/{answers.length}</Text>
                                </Pressable>);
                        })
                        : <Image source={require('../../../../assets/flask.gif')} style={[gStyles.image, styles.image]}/>
                }
            </ScrollView>
        </View>
    );
};
