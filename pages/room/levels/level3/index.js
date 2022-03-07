import React from 'react';
import {StyleSheet, Text, View, Pressable} from 'react-native';
import {BoxShadow} from 'react-native-shadow';

import {stringPreparing} from '../utils';
import {changeStatScores} from '../../../../utils';

import sizes, {general} from './styles';

export const Type3 = ({props}) => {
    const {
        user, setRoomData, currentTaskIndex, currentTask, roomId, setCurrentTaskIndex,
        roomData, socket, width, finishGame, accData, setAccData, optionIndex, setOptionIndex,
    } = props;
    const {userId, answers} = user;
    const {progress, status} = answers[currentTaskIndex];
    const {taskNum, question} = currentTask;

    const size = sizes[width]({type: currentTask.type});
    const gStyles = StyleSheet.create(general);
    const styles = StyleSheet.create(size);

    const handleConfirm = () => {
        const users = roomData.users.map(user => (user.userId === userId)
            ? {
                ...user, answers: user.answers.map((answer, i) => (i === currentTaskIndex)
                    ? {
                        ...answer,
                        status: (() => {
                            const {progress} = answer;

                            return (progress.length === currentTask.options.length)
                            && (progress.every((e, i) => currentTask.answers[e]?.id?.includes(i)))
                                ? (() => {
                                    changeStatScores({isCorrect: true, accData, taskNum, setAccData});
                                    return 'correct';
                                })()
                                : (() => {
                                    changeStatScores({isCorrect: false, accData, taskNum, setAccData});
                                    return 'wrong';
                                })();
                        })(),
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
            (roomData.tasks.length > currentTaskIndex + 1)
                ? setCurrentTaskIndex(prev => prev + 1)
                : finishGame({answers: user.answers});
        }, 1000);
    };

    const changeAnswer = (answer) => {
        setRoomData(prev => ({
            ...prev, users: prev.users.map(user => (user.userId === userId)
                ? {
                    ...user, answers: user.answers.map((item, i) => (i === currentTaskIndex)
                        ? {
                            ...item,
                            progress: [...item.progress.map((e, i) => i === optionIndex
                                ? answer
                                : e)]
                        }
                        : item)
                }
                : user)
        }));
        setOptionIndex(prev => {
            const newOptionIndex = progress.findIndex((e, i) => e === null && i !== prev);
            return newOptionIndex >= 0 ? newOptionIndex : prev;
        });
    };

    const changeOption = (i) => {
        setOptionIndex(i);
    };

    const getOptionColor = (i) => {
        if (status === 'unsolved') {
            return (progress[i] !== null)
                ? {backgroundColor: '#e8f0a1', borderColor: '#d3de6d'} //желтый
                : {backgroundColor: '#cfcfcf', borderColor: (i === optionIndex) ? '#d3de6d' : '#b3b3b3'};

        } else {
            return (progress[i] === currentTask.answers.findIndex(({id}) => id.includes(i)))
                ? {backgroundColor: '#8af2b5', borderColor: (i === optionIndex) ? '#d3de6d' : '#5cdb91'} //зеленый
                : {backgroundColor: '#f29b9b', borderColor: (i === optionIndex) ? '#d3de6d' : '#de8585'}; //красный
        }
    };

    const getButtonColor = (answer) => {
        return ((status !== 'unsolved') && (currentTask.answers.find(({id}) => id.includes(optionIndex)).answer === answer))
            ? {backgroundColor: '#e8f0a1', borderColor: '#d3de6d'}
            : {backgroundColor: 'rgba(161, 189, 151, 0.9)', borderColor: '#d1ae52'};
    };

    const canPress = ((status === 'unsolved') && !progress.includes(null));
    const optionStyle = size.option;

    return (
        <View style={[gStyles.level, styles.level]}>
            <View style={[gStyles.question, styles.question]}>
                {question.split('\n').map((row, index) => index === 1
                    ? stringPreparing({
                        index,
                        string: row,
                        isBigExample: true,
                        width,
                        style: [gStyles.questionText, styles.questionText]
                    })
                    : <Text key={index} style={[gStyles.questionText, styles.questionText]}>{row}</Text>)}
            </View>
            <View style={gStyles.options}>
                {progress.map((option, i) => (
                    <BoxShadow key={i} setting={{
                        width: optionStyle.width,
                        height: optionStyle.height,
                        color: (i === optionIndex) ? '#dede35' : '#000',
                        border: (i === optionIndex) ? 6 : 0,
                        radius: 10,
                        opacity: 0.4,
                        x: (i === optionIndex) ? 0 : 2,
                        y: (i === optionIndex) ? 0 : 4,
                        style: {marginVertical: 6}
                    }}>
                        <View
                            style={[gStyles.option, styles.option, getOptionColor(i)]}
                            onStartShouldSetResponder={() => changeOption(i)}>
                            <View style={[gStyles.optionTextWrap, styles.optionTextWrap]}>
                                {stringPreparing({
                                    string: currentTask.options[i],
                                    isBigExample: false,
                                    width,
                                    style: [gStyles.optionText, styles.optionText, currentTask.options[i].length > 19 ? styles.optionTextSmallFontSize : {}]
                                })}
                            </View>
                            <View style={gStyles.optionNumberWrapper}>
                                <Text style={gStyles.optionNumber}>{option !== null ? option + 1 : ''}</Text>
                            </View>
                        </View>
                    </BoxShadow>))}
            </View>
            <View style={gStyles.buttons}>
                {currentTask.answers.map(({answer}, i) => (
                    <View
                        key={i}
                        style={[gStyles.button, getButtonColor(answer), styles.button]}
                        onStartShouldSetResponder={() => status === 'unsolved' ? changeAnswer(i) : {}}>
                        <View style={gStyles.buttonNumberWrapper}>
                            <Text style={[gStyles.buttonNumber, styles.buttonNumber]}>{i + 1}:</Text>
                        </View>
                        <View style={gStyles.optionTextWrap}>
                            {stringPreparing({
                                string: answer,
                                isBigExample: false,
                                width,
                                style: [gStyles.buttonText, styles.buttonText,
                                    answer.length < 14 ? styles.buttonTextBigFontSize : {},
                                    answer.length > 35 ? styles.buttonTextSmallFontSize : {}]
                            })}
                        </View>
                    </View>))}
            </View>
            <Pressable
                style={[gStyles.confirmBtn, styles.confirmBtn, canPress ? gStyles.activeConfirmBtn : '']}
                onPress={canPress ? handleConfirm : () => {}}>
                <Text style={[gStyles.confirmBtnText, styles.confirmBtnText]}>Проверить</Text>
            </Pressable>
        </View>
    );
};
