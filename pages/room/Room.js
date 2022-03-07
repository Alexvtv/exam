import React, {useState, useEffect, useRef} from 'react';
import {ScrollView, StyleSheet, Text, View, Image, Dimensions, Pressable, AppState} from 'react-native';
import {useRoute} from '@react-navigation/native';
import {PanGestureHandler, Directions, State} from 'react-native-gesture-handler';

import {Type1, Type2, Type3} from './levels';
import {Table, Prompt} from './parts';
import {serverUrl} from '../../config';

import sizes, {general} from './styles';

let interval;

export const Room = ({navigation, socket, accData, width, setAccData}) => {
    const {userId, stat} = accData;
    const {roomId, isCompleted, isNew} = useRoute().params;
    const {navigate, replace} = navigation;

    const scrollViewRef = useRef();
    const styles = StyleSheet.create(sizes[width]);
    const gStyles = StyleSheet.create(general);

    const [state, setState] = useState(null);
    const [optionIndex, setOptionIndex] = useState(0);
    const [roomData, setRoomData] = useState(null);
    const [currentTaskIndex, setCurrentTaskIndex] = useState(0);
    const [swipedDirection, setSwipedDirection] = useState(null);
    const [time, setTime] = useState(300);
    const [promptIsShown, setPromptIsShown] = useState(stat.find(({subject}) => subject === 'chemistry').tasks
            .every(({correct, wrong}) => (correct === 0 && wrong === 0)));

    const finishGame = (p) => {
        clearInterval(interval);
        replace('GameResult', {
            answers: p?.answers || roomData.users.find(user => user.userId === userId).answers,
            roomId
        });
    };
    const timeOver = () => {
        setRoomData(prev => {
            const users = prev.users.map(user => (user.userId === userId)
                ? {
                    ...user, answers: user.answers.map((answer) => (answer.status === 'unsolved')
                        ? {
                            ...answer,
                            status: answer.status === 'unsolved'
                                ? 'wrong'
                                : status
                        }
                        : answer)
                }
                : user);
            if (roomId && userId) {
                socket.emit('round result to server', {
                    roomId,
                    user: users.find(user => user.userId === userId)
                });
            }

            setTimeout(() => finishGame(users.find(user => user.userId === userId)), 100);

            return {
                ...prev, users
            };
        });
    };

    useEffect(() => {
        if (state === 'active' && !isCompleted) {
            fetch(`${serverUrl}api/findRoom`, {
                method: 'POST',
                body: JSON.stringify({roomId, userId}),
                headers: {'Content-Type': 'application/json'}
            })
                .then((res) => res.json())
                .then(data => {
                    const {access} = data;
                    const user = data?.users.find(user => user.userId === userId);
                    const {time, answers} = user || {};

                    if (time && access) {
                        answers.some(answer => answer.status === 'unsolved')
                            ? setTime(time)
                            : finishGame();
                    } else {
                        navigate('Main');
                    }
                });
        }
    }, [state]);

    useEffect(() => {
        setOptionIndex(0);
    }, [currentTaskIndex]);

    useEffect(() => {
        if (swipedDirection !== null) {
            scrollViewRef.current?.scrollTo({
                y: 0,
                animated: true,
            });
        }
    }, [swipedDirection]);

    useEffect(() => {
        AppState.addEventListener('change', () => setState(AppState.currentState));

        fetch(`${serverUrl}api/findRoom`, {
            method: 'POST',
            body: JSON.stringify({roomId, userId}),
            headers: {'Content-Type': 'application/json'}
        })
            .then((res) => res.json())
            .then(data => {
                const {access} = data;
                if (!access) {
                    navigate('Main');
                } else {
                    const time = data?.users.find(user => user.userId === userId)?.time;

                    if (time && !isNew) setTime(time);
                    setRoomData(data);
                }
            });

        socket.on('new user', (data) => {
            setRoomData(prev => ({
                ...prev, users: prev.users.length === 1
                    ? [...prev.users, data]
                    : prev.users
            }));
        });
        socket.on('round result', (user) => {
            setRoomData(prev => ({
                ...prev, users: prev.users.map(prevUser => (prevUser.userId === user.userId && (user.answers
                    .filter(e => e.status === 'unsolved').length !== prev.users
                    .find(({userId}) => userId === user.userId).answers.filter(e => e.status === 'unsolved').length))
                    ? user
                    : prevUser)
            }));
        });

        if (!isCompleted) {
            interval = setInterval(() => {
                setTime(prev => {
                    if (prev > 0) {
                        return prev - 1;
                    } else if (prev === 0) {
                        timeOver();
                    }
                });
            }, 1000);
        }

        return () => clearInterval(interval);
    }, []);

    if (roomData === null) return <View style={{
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.4)',
        justifyContent: 'center',
        alignItems: 'center'
    }}>
        <Image source={require('../../assets/flask.gif')} style={{width: 240, height: 320}}/>
    </View>;

    const {tasks, users} = roomData;
    const user = users.find(user => user.userId === userId);
    const currentTask = tasks[currentTaskIndex];

    const typesResolver = () => {
        const props = {
            user, setRoomData, currentTaskIndex, currentTask, accData, setAccData, optionIndex, setOptionIndex,
            roomId, setCurrentTaskIndex, roomData, socket, width, finishGame, isCompleted
        };
        const {type} = currentTask;

        if ([1].includes(type)) {
            return <Type1 props={props}/>;
        } else if ([2, 3].includes(type)) {
            return <Type2 props={props}/>;
        } else if ([4, 5].includes(type)) {
            return <Type3 props={props}/>;
        }
    };

    const windowHeight = Dimensions.get('window').height;

    return (
        <PanGestureHandler
            direction={Directions.RIGHT | Directions.LEFT}
            onHandlerStateChange={({nativeEvent}) => {
                const {velocityX} = nativeEvent;
                if (velocityX > 130 || velocityX < -130) {
                    if (nativeEvent.state === State.ACTIVE) {
                        if (velocityX > 0) {
                            setSwipedDirection(prev => !prev ? 'left' : null);
                        } else {
                            setSwipedDirection(prev => !prev ? 'right' : null);
                        }
                    }
                }
            }}
            minPointers={swipedDirection === null ? 1 : 2}
            minDeltaX={130}>
            <ScrollView
                ref={scrollViewRef}
                style={{width: '100%', height: '100%', position: 'relative'}}
                scrollEnabled={swipedDirection === null}>
                {promptIsShown ? <Prompt setPromptIsShown={setPromptIsShown}/> : null}
                {['left', 'right'].map((direction, index) => <Table
                    key={index}
                    direction={direction}
                    swipedDirection={swipedDirection}
                    setSwipedDirection={setSwipedDirection}/>)}
                <View style={[gStyles.main, {minHeight: windowHeight}]}>
                    <View style={[gStyles.panelWrapper]}>
                        <View style={[gStyles.panel, styles.panel]}>
                            <Pressable
                                style={[gStyles.back, styles.back]}
                                onPress={() => navigate('Main', {
                                    time, roomId, user: {
                                        ...user,
                                        answers: user.answers.map((answer, index) => (answer.status === 'unsolved')
                                            ? {
                                                ...answer,
                                                status: (() => {
                                                    const {progress} = answer;
                                                    const correctAnswer = tasks[index].answers.filter(({isCorrect}) => isCorrect).map(e => e.answer);

                                                    return ((progress.length === correctAnswer.length) && (progress.sort().every((e, i) => e === correctAnswer.sort()[i])))
                                                        ? 'correct'
                                                        : 'wrong';
                                                })()
                                            }
                                            : answer)
                                    }
                                })}>
                                <Image
                                    style={{
                                        width: '100%',
                                        height: '100%',
                                        resizeMode: 'contain',
                                        transform: [{rotate: '180deg'}]
                                    }}
                                    source={require(`../../assets/elements/arrow.png`)}/>
                            </Pressable>
                            <View style={[gStyles.timer, styles.timer]}>
                                <Text style={[gStyles.timerText, styles.timerText]}>
                                    <Text style={{
                                        width: 21,
                                        justifyContent: 'flex-end'
                                    }}>{(isCompleted || !time) ? '0' : Math.floor(time / 60)}</Text>:
                                    <Text style={{
                                        width: 21,
                                    }}>{(isCompleted || !time) ? '00' : ('0' + time % 60).slice(-2)}</Text>
                                </Text>
                            </View>
                            <View style={[gStyles.taskNum, styles.taskNum]}>
                                <Text
                                    style={[gStyles.taskNumText, styles.taskNumText]}>№ {currentTask?.taskNum}</Text></View>
                        </View>
                    </View>
                    <View style={[gStyles.field, styles.field]}>
                        {typesResolver()}
                        <View style={[gStyles.usersData, styles.usersData]}>
                            {users.map(({name, answers}, index) => (
                                <View
                                    style={{flexDirection: 'row'}}
                                    key={index}>
                                    <Text style={[gStyles.userName, styles.userName]}>{name}</Text>
                                    <View style={gStyles.roundsRow}>
                                        {answers.map(({status}, i) => (
                                            <Pressable
                                                key={i}
                                                style={[
                                                    styles.round,
                                                    gStyles[status],
                                                    gStyles[(currentTaskIndex === i && accData.name === name) ? 'current' : {}],
                                                    index === 1 ? gStyles.rotated : '']}
                                                onPress={() => setCurrentTaskIndex(i)}/>
                                        ))}
                                    </View>
                                </View>))}
                            {users.length === 1
                                ? <View><Text style={styles.waitingText}>Ожидание соперника...</Text></View>
                                : null}
                        </View>
                    </View>
                </View>
            </ScrollView>
        </PanGestureHandler>
    );
};
