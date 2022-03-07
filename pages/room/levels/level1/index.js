import React from 'react';
import {StyleSheet, Text, View, Pressable} from 'react-native';
import {BoxShadow} from 'react-native-shadow';

import {stringPreparing} from '../utils';
import {changeStatScores} from '../../../../utils';
import {Indicator} from './parts';

import sizes, {general} from './styles';

export const Type1 = ({props}) => {
    const {
        user, setRoomData, currentTaskIndex, currentTask, roomId, accData, setAccData,
        setCurrentTaskIndex, roomData, socket, width, finishGame, isCompleted
    } = props;
    const {userId, answers} = user;
    const {taskNum, question} = currentTask;

    const styles = StyleSheet.create(sizes[width]);
    const gStyles = StyleSheet.create(general);

    const handleConfirm = () => {
        const users = roomData.users.map(user => (user.userId === userId)
            ? {
                ...user, answers: user.answers.map((answer, i) => (i === currentTaskIndex)
                    ? {
                        ...answer,
                        status: (() => {
                            const {progress} = answer;
                            const correctAnswer = currentTask.answers.filter(({isCorrect}) => isCorrect).map(e => e.answer);
                            return ((progress.length === correctAnswer.length)
                                && (progress.sort().every((e, i) => e === correctAnswer.sort()[i])))
                                ? (() => {
                                    changeStatScores({isCorrect: true, accData, taskNum, setAccData});
                                    return 'correct';
                                })()
                                : (() => {
                                    changeStatScores({isCorrect: false, accData, taskNum, setAccData});
                                    return 'wrong';
                                })();
                        })()
                    }
                    : answer)
            }
            : user);
        const user = users.find(user => user.userId === userId);

        setRoomData(prev => {
            socket.emit('round result to server', {roomId, user});

            return {...prev, users};
        });
        setTimeout(() => {
            if (roomData.tasks.length > currentTaskIndex + 1) {
                setCurrentTaskIndex(prev => prev + 1);
            } else {
                finishGame({answers: user.answers});
            }
        }, 1000);
    };

    const changeAnswer = ({item}) => {
        setRoomData(prev => ({
            ...prev, users: prev.users.map(user => (user.userId === userId)
                ? {
                    ...user, answers: user.answers.map((answer, i) => (i === currentTaskIndex)
                        ? {
                            ...answer,
                            progress: user.answers[currentTaskIndex].progress.includes(item) ? [...answer.progress].filter(e => e !== item) : [...answer.progress, item]
                        }
                        : answer)
                }
                : user)
        }));
    };

    const buttonClass = (answer) => {
        if (answers[currentTaskIndex].status === 'unsolved') {
            return answers[currentTaskIndex].progress.includes(answer)
                ? {class: gStyles.active, shadowColor: '#0094df'}
                : {class: gStyles.inactive, shadowColor: '#8c8c8c'};
        } else {
            return answers[currentTaskIndex].progress.includes(answer)
                ? currentTask.answers.find(e => e.answer === answer).isCorrect
                    ? {class: gStyles.correct, shadowColor: '#00d95a'}
                    : {class: gStyles.wrong, shadowColor: '#de0000'}
                : currentTask.answers.find(e => e.answer === answer).isCorrect
                    ? {class: gStyles.prompt, shadowColor: '#bed400'}
                    : {class: gStyles.inactive, shadowColor: '#8c8c8c'};
        }
    };

    const canPress = !isCompleted && answers[currentTaskIndex].progress.length > 0;

    return (
        <View style={[gStyles.level, styles.level]}>
            <View style={[gStyles.question, styles.question]}>
                {stringPreparing({
                    string: question,
                    isBigExample: true,
                    width,
                    style: [gStyles.questionText, styles.questionText]
                })}
            </View>
            <View style={gStyles.buttons}>
                {currentTask.answers.map(({answer}, i) => (
                    <BoxShadow key={i} setting={{
                        width: sizes[width].button.width,
                        height: sizes[width].button.height,
                        color: '#000',
                        border: 2,
                        radius: 8,
                        opacity: 0.3,
                        x: 1,
                        y: 3,
                        style: {marginVertical: 7}
                    }}>
                        <Pressable
                            style={[gStyles.button, styles.button, buttonClass(answer).class]}
                            onPress={() => answers[currentTaskIndex].status === 'unsolved' ? changeAnswer({item: answer}) : {}}>
                            <Indicator isActive={answers[currentTaskIndex].progress.includes(answer)} width={width}/>
                            {stringPreparing({
                                string: answer,
                                width,
                                style: [gStyles.answer, styles.answer,
                                    answer.length < 6 ? styles.answerBigFontSize : {},
                                    answer.length > 17 ? styles.answerSmallFontSize : {}]
                            })}
                        </Pressable>
                    </BoxShadow>))}
            </View>
            <Pressable
                style={[gStyles.confirmBtn, styles.confirmBtn, canPress > 0 ? gStyles.activeConfirmBtn : '']}
                onPress={canPress ? handleConfirm : () => {
                }}>
                <Text style={[gStyles.confirmBtnText, styles.confirmBtnText]}>Проверить</Text>
            </Pressable>
        </View>
    );
};
