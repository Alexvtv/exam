import React, {useEffect, useState} from 'react';
import {Text, useWindowDimensions, View, ImageBackground, StatusBar, Image} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import io from 'socket.io-client';
import {NavigationContainer, DefaultTheme} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {pages} from './pages';
import {subjects, serverUrl} from './config';
import {useFonts} from 'expo-font';

const {Main, Room, Search, GameResult, Completed, Profile} = pages;

const Stack = createStackNavigator();

let socket;

export default function App() {
    const {width} = useWindowDimensions();
    let size;

    if (width < 400) {
        size = 'sm';
    } else if (width < 750) {
        size = 'md';
    } else {
        size = 'lg';
    }

    const [accData, setAccData] = useState(null);

    let [fontsLoaded] = useFonts({
        'rubik': require('./assets/fonts/Rubik-Regular.ttf'),
        'rubikItalic': require('./assets/fonts/Rubik-Italic.ttf'),
        'rubikBold': require('./assets/fonts/Rubik-Bold.ttf'),
        'rubikBoldItalic': require('./assets/fonts/Rubik-BoldItalic.ttf'),
        'rubikSemiBold': require('./assets/fonts/Rubik-SemiBold.ttf'),
        'rubikSemiBoldItalic': require('./assets/fonts/Rubik-SemiBoldItalic.ttf'),
    });

    useEffect(() => {
        socket = io(serverUrl);

        AsyncStorage.getItem('ACCOUNT_DATA', async (err, data) => {
            if (err) console.log(err);

            const accountData = JSON.parse(data);

            const getNewData = () => {
                const number = Math.round(Math.random() * 100000);

                return fetch(`${serverUrl}api/createUser`)
                    .then((res) => res.json())
                    .then(({userId}) => ({
                        name: `user${number}`,
                        userId,
                        isAuthorized: false,
                        stat: subjects.filter(({subject}) => subject !== null).map(({subject, tasksQty}) => ({
                            subject,
                            tasks: new Array(tasksQty).fill('').map((e, i) => ({num: i + 1, correct: 0, wrong: 0})),
                            scores: 100,
                        }))

                    }));
            };

            if (!accountData || !accountData.stat) {
                const newData = await getNewData();
                socket.emit('initiate', newData.userId);
                setAccData(newData);
                AsyncStorage.setItem('ACCOUNT_DATA', JSON.stringify(newData));
            } else {
                socket.emit('initiate', accountData.userId);
                setAccData({
                    ...accountData,
                    stat: [...accountData.stat,
                        ...subjects.filter(({subject}) => (subject !== null) && accountData.stat.find(e => e.subject !== subject)).map(({subject, tasksQty}) => ({
                            subject,
                            tasks: new Array(tasksQty).fill('').map((e, i) => ({num: i + 1, correct: 0, wrong: 0})),
                            scores: 100,
                        }))]
                });
            }
        });

        return () => disconnectSocket;
    }, []);

    const disconnectSocket = () => {
        console.log('Disconnecting socket...');
        if (socket) socket.disconnect({userId: accData?.userId});
    };

    const MyTheme = {
        ...DefaultTheme,
        colors: {
            ...DefaultTheme.colors,
            background: 'transparent',
        },
    };

    const Component = (Child, navigation, props) => (
        <ImageBackground
            style={{width: '100%', height: '100%', position: 'absolute'}}
            source={require('./assets/bg.jpg')}
            resizeMode='cover'
            blurRadius={1}>
            <Child
                width={size}
                socket={socket}
                accData={accData}
                setAccData={setAccData}
                navigation={navigation}
                props={props}/>
        </ImageBackground>);

    return (!!accData && !!fontsLoaded) ? (
        <NavigationContainer theme={MyTheme}>
            <StatusBar hidden={true}/>
            <Stack.Navigator screenOptions={{headerShown: false}}>
                <Stack.Screen name="Main"
                              options={{headerShown: false, cardStyle: {backgroundColor: 'transparent'}}}>
                    {({navigation}) => Component(Main, navigation, {subjects})}
                </Stack.Screen>
                <Stack.Screen name="Search" options={{headerShown: false}}>
                    {({navigation}) => Component(Search, navigation)}
                </Stack.Screen>
                <Stack.Screen name="Room" options={{headerShown: false}}>
                    {({navigation}) => Component(Room, navigation)}
                </Stack.Screen>
                <Stack.Screen name="GameResult" options={{headerShown: false}}>
                    {({navigation}) => Component(GameResult, navigation)}
                </Stack.Screen>
                <Stack.Screen name="Completed" options={{headerShown: false}}>
                    {({navigation}) => Component(Completed, navigation)}
                </Stack.Screen>
                <Stack.Screen name="Profile" options={{headerShown: false}}>
                    {({navigation}) => Component(Profile, navigation)}
                </Stack.Screen>
            </Stack.Navigator>
        </NavigationContainer>
    ) : (<View style={{
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.4)',
        justifyContent: 'center',
        alignItems: 'center'
    }}>
        <Image source={require('./assets/flask.gif')} style={{width: 240, height: 320}}/>
    </View>);
}
