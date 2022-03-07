import React, {useEffect, useRef, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Text, View, TextInput, Image, StyleSheet, Animated, Pressable} from 'react-native';
import {serverUrl} from '../../../../config';

const emailReg = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
const passwordReg = /^(?=.*\d)(?=.*[a-z])[0-9a-zA-Z]{7,}$/;

export const AuthPopup = ({setAuthPopupIsShowing, toProfile, accData, setAccData}) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [repeat, setRepeat] = useState('');
    const [isRegistration, setIsRegistration] = useState(false);

    const animValue = useRef(new Animated.Value(isRegistration ? 1.1 : 0.1)).current;

    useEffect(() => {
        Animated.timing(
            animValue,
            {
                toValue: isRegistration ? 1.1 : 0.1,
                duration: 400,
                useNativeDriver: false
            }
        ).start();
    }, [isRegistration]);

    const handleLogin = () => {
        if (emailReg.test(email) && passwordReg.test(password)) {

            fetch(`${serverUrl}api/login`, {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({email, password})
            })
                .then(res => res.json())
                .then(({status, data}) => {
                    if (status === 'success') {
                        const {name, userId, stat} = data;
                        AsyncStorage.setItem('ACCOUNT_DATA', JSON.stringify({
                            isAuthorized: true, name, userId, stat
                        }), async (err) => {
                            if (!err) await setAccData({name, userId, stat, isAuthorized: true});
                            setAuthPopupIsShowing(false);
                        });
                    } else {
                        console.log('Ошибка авторизации (сервер)');
                    }
                });
        }
    };

    const handleReg = async () => {
        if (emailReg.test(email) && passwordReg.test(password) && password === repeat && !accData.isAuthorized) {

            fetch(`${serverUrl}api/reg`, {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({email, password, accData})
            })
                .then(res => res.json())
                .then(({status}) => {
                    if (status === 'success') {
                        AsyncStorage.mergeItem('ACCOUNT_DATA', JSON.stringify({isAuthorized: true}));
                        setAccData(prev => ({...prev, isAuthorized: true}));
                        setAuthPopupIsShowing(false);
                    } else {
                        console.log('ошибка регистрации (сервер)');
                    }
                });
        }
    };

    return (
        <View style={styles.popup} onStartShouldSetResponder={() => setAuthPopupIsShowing(false)}>
            <View style={styles.popupInner} onStartShouldSetResponder={(e) => {
                console.log(e.target);
                e.stopPropagation();
            }}>
                <View
                    style={{position: 'absolute', zIndex: 100, left: '50%', top: 15}}>
                    <Pressable style={styles.user} onPress={toProfile}>
                        <Text style={styles.userName}>{accData.name}</Text>
                        <Image
                            style={{width: 20, height: 20}}
                            source={require(`../../../../assets/elements/avatar.png`)}/>
                    </Pressable>
                </View>
                <Animated.View style={[styles.field, {
                    marginLeft: animValue.interpolate({
                        inputRange: [0.1, 1.1],
                        outputRange: ['0%', '-100%']
                    })
                }]}>
                    <TextInput
                        style={styles.input}
                        onChangeText={value => setEmail(value)}
                        value={email}
                        placeholder="Почта"
                    />
                    <TextInput
                        style={styles.input}
                        onChangeText={value => setPassword(value)}
                        value={password}
                        placeholder="Пароль"
                    />
                    <Pressable
                        style={styles.button}
                        onPress={handleLogin}>
                        <Text style={styles.buttonText}>Авторизация</Text>
                    </Pressable>
                    <Text style={styles.question}> Нет аккаунта?</Text>
                    <Pressable style={styles.chaneOptionWrap} onPress={() => setIsRegistration(true)}>
                        <Text style={styles.changeOption}>Зарегистрироваться</Text>
                    </Pressable>
                </Animated.View>
                <View style={styles.field}>
                    <TextInput
                        style={styles.input}
                        onChangeText={value => setEmail(value)}
                        value={email}
                        placeholder="Почта"
                    />
                    <TextInput
                        style={styles.input}
                        onChangeText={value => setPassword(value)}
                        value={password}
                        placeholder="Пароль"
                    />
                    <TextInput
                        style={styles.input}
                        onChangeText={value => setRepeat(value)}
                        value={repeat}
                        placeholder="Повтор пароля"
                    />
                    <Pressable style={styles.button} onPress={handleReg}>
                        <Text style={styles.buttonText}>Регистрация</Text>
                    </Pressable>
                    <Text style={styles.question}>Уже есть аккаунт?</Text>
                    <Pressable style={styles.chaneOptionWrap} onPress={() => setIsRegistration(false)}>
                        <Text style={styles.changeOption}>Авторизоваться</Text>
                    </Pressable>
                </View>
            </View>
        </View>);
};

const styles = StyleSheet.create({
    popup: {
        overflow: 'visible',
        width: '100%',
        height: '100%',
        position: 'absolute',
        backgroundColor: 'rgba(130, 130, 130, 0.6)',
        borderWidth: 1,
        borderColor: '#20232a',
        zIndex: 100,
        justifyContent: 'center',
        alignItems: 'center'
    },
    popupInner: {
        borderRadius: 15,
        overflow: 'hidden',
        width: '40%',
        minWidth: 260,
        height: 350,
        borderWidth: 1,
        borderColor: '#20232a',
        position: 'absolute',
        backgroundColor: '#eeeeee',
        flexDirection: 'row'
    },
    field: {
        paddingTop: 70,
        width: '100%',
        height: '100%',
        paddingBottom: 25,
        paddingHorizontal: 15,
    },
    input: {
        borderWidth: 2,
        borderColor: '#b3b3b3',
        backgroundColor: '#c9c9c9',
        height: 33,
        borderRadius: 5,
        color: '#1a1c1a',
        paddingLeft: 7,
        marginBottom: 10,
        fontFamily: 'rubikSemiBold',
    },
    button: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 8,
        marginTop: 15,
        marginBottom: 25,
        borderRadius: 7,
        borderWidth: 2,
        backgroundColor: '#00a843',
        borderColor: '#008c38',
    },
    buttonText: {
        fontFamily: 'rubikSemiBold',
        letterSpacing: 1,
        color: '#F5F5F5',
        fontSize: 18
    },
    question: {
        marginTop: 'auto',
        color: '#1a1c1a',
        fontWeight: '400',
        fontFamily: 'rubik',
    },
    chaneOptionWrap: {
        width: 200,
        marginLeft: 'auto',
        marginRight: 'auto'
    },
    changeOption: {
        fontFamily: 'rubikSemiBold',
        fontSize: 16,
        color: '#1a1c1a',
    },
    user: {
        position: 'relative',
        right: 113,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        marginBottom: 11,
        paddingVertical: 4,
        paddingHorizontal: 15,
        borderRadius: 8,
        backgroundColor: '#daf2f0',
        borderWidth: 2,
        borderColor: '#008c38',
    },
    userName: {
        fontFamily: 'rubik',
        fontSize: 18,
        marginRight: 10,
    }
});

