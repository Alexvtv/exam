import React from 'react';
import {View, Text, Image, Pressable} from 'react-native';

export const Prompt = ({setPromptIsShown}) => {
    return <Pressable
        onPress={() => setPromptIsShown(false)}
        style={{
            position: 'absolute',
            zIndex: 1000,
            backgroundColor: 'rgba(43, 43, 43, 0.6)',
            justifyContent: 'space-around',
            alignItems: 'flex-start',
            paddingTop: 150,
            width: '100%',
            height: '100%',
            flexDirection: 'row'
        }}>
        <View style={{
            justifyContent: 'center',
            alignItems: 'center',
            width: 100,
            position: 'relative'
        }}>
            <Image
                style={{
                    width: 100,
                    height: 100,
                    resizeMode: 'contain',
                    marginBottom: 30,
                    transform: [{scaleX: -1}]
                }}
                source={require(`../../../../assets/elements/swipe.png`)}/>
            <Text style={{
                display: 'flex',
                textAlign: 'center',
                color: '#FFFFFF',
                fontFamily: 'rubik',
                fontSize: 18,
                textShadowColor: '#000',
                textShadowOffset: {width: 1, height: 1},
                textShadowRadius: 1
            }}>Таблица Менделеева</Text>
        </View>
        <View style={{
            justifyContent: 'center',
            alignItems: 'center',
            width: 140,
            position: 'relative'
        }}>
            <Image
                style={{
                    width: 100,
                    height: 100,
                    resizeMode: 'contain',
                    marginBottom: 30,
                }}
                source={require(`../../../../assets/elements/swipe.png`)}/>
            <Text style={{
                display: 'flex',
                textAlign: 'center',
                color: '#FFFFFF',
                fontFamily: 'rubik',
                fontSize: 18,
                textShadowColor: '#000',
                textShadowOffset: {width: 1, height: 1},
                textShadowRadius: 1
            }}>Таблица растворимости</Text>
        </View>
    </Pressable>;
};
