import React from 'react';
import {StyleSheet, Text, View, Pressable} from 'react-native';
import {BoxShadow} from 'react-native-shadow';

import {stringPreparing} from '../utils';
import {changeStatScores} from '../../../../utils';

import sizes, {general} from './styles';

export const Type2 = ({props}) => {
        const {
            user, setRoomData, currentTaskIndex, currentTask, roomId, setCurrentTaskIndex,
            roomData, socket, width, finishGame, accData, setAccData, optionIndex, setOptionIndex,
        } = props;
        const {userId, answers} = user;
        const {progress, status} = answers[currentTaskIndex];
        const {taskNum, question} = currentTask;

        const size = sizes[width]({
            answersQty: currentTask.answers.length,
            optionsQty: progress.length
        });

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

                                const correctAnswer = currentTask.answers.filter(e => e.index !== null).sort((a, b) => a.index - b.index).map(e => e.answer);

                                return (progress.length === correctAnswer.length) && (progress.every((e, i) => e === correctAnswer[i]))
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
                if (roomData.tasks.length > currentTaskIndex + 1) {
                    setCurrentTaskIndex(prev => prev + 1);
                } else {
                    finishGame({answers: user.answers});
                }
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
                                    : !currentTask.reuse && e === answer
                                        ? null
                                        : e)]
                            }
                            : item)
                    }
                    : user)
            }));
            setOptionIndex(prev => {
                const newOptionIndex = progress.findIndex((e, i) => e === null && i !== prev || e === answer && !currentTask.reuse);
                return newOptionIndex >= 0 ? newOptionIndex : prev;
            });
        };

        const isLg = width === 'lg';

        const questionPreparing = (string) => {
            const strings = string.split('\n');
            const arr = strings.map(string => string.split('__'));

            return <View style={{width: '100%', flexDirection: 'column'}}>
                {arr.map((stringsArr, i) => <View style={gStyles.questionInner} key={i}>
                    {stringsArr.map((string, i) => <View
                        key={i}
                        style={(i % 2 === 0)
                            ? i > 0 ? {
                                marginLeft: isLg ? -9 : -7,
                                flexDirection: 'row',
                                flexWrap: 'wrap',
                            } : {flexDirection: 'row'}
                            : {
                                position: 'relative',
                                paddingTop: isLg ? 3 : 0,
                                height: isLg ? 32 : 28,
                                left: isLg ? -15 : -12,
                                flexDirection: 'row',
                                flexWrap: 'wrap',
                            }}>
                        {stringPreparing({
                            string,
                            isBigExample: true,
                            width,
                            style: [gStyles.questionText, (i % 2 !== 0) ? {fontSize: isLg ? 14 : 12} : styles.questionText]
                        })}
                    </View>)}

                </View>)}
            </View>;
        };

        const getOptionColor = (i) => {
            if (status === 'unsolved') {
                return (progress[i] !== null)
                    ? {backgroundColor: '#e8f0a1', borderColor: '#d3de6d'} //желтый
                    : {backgroundColor: '#cfcfcf', borderColor: (i === optionIndex) ? '#d3de6d' : '#b3b3b3'};
            } else {
                return (progress[i] === currentTask.answers.find(e => e.index === i)?.answer)
                    ? {backgroundColor: '#8af2b5', borderColor: (i === optionIndex) ? '#d3de6d' : '#5cdb91'} //зеленый
                    : {backgroundColor: '#f29b9b', borderColor: (i === optionIndex) ? '#d3de6d' : '#de8585'}; //красный

            }
        };

        const getButtonColor = (answer) => {
            return ((status !== 'unsolved') && (currentTask.answers.find(({index}) => index === optionIndex).answer === answer))
                ? {backgroundColor: '#e8f0a1', borderColor: '#d3de6d'}
                : {backgroundColor: '#d9d9d9', borderColor: '#d1ae52'};
        };

        const canPress = ((status === 'unsolved') && !progress.includes(null));

        const {optionWrapper, button, buttonShadow} = size;

        return (
            <View style={[gStyles.level, styles.level]}>
                <View style={[gStyles.question, styles.question]}>
                    {questionPreparing(question)}
                </View>
                <View style={[gStyles.options, styles.options]}>
                    {progress.map((option, i) => (
                        <View key={`${currentTaskIndex}-${i}`}>
                            <Pressable
                                style={[gStyles.optionWrapper, styles.optionWrapper]}
                                onPress={() => setOptionIndex(i)}>
                                <BoxShadow setting={{
                                    width: optionWrapper.width,
                                    height: optionWrapper.height,
                                    color: (i === optionIndex) ? '#dede35' : '#000',
                                    border: (i === optionIndex) ? 6 : 0,
                                    radius: 10,
                                    opacity: 0.4,
                                    x: (i === optionIndex) ? 0 : 2,
                                    y: (i === optionIndex) ? 0 : 4,
                                    style: {}
                                }}>
                                    <View style={[gStyles.option, getOptionColor(i), styles.optionWrapper]}>
                                        {option
                                            ? stringPreparing({
                                                string: option,
                                                width,
                                                style: [gStyles.optionText, styles.optionText, option?.length < 6
                                                    ? styles.buttonTextBigFontSize
                                                    : {}]
                                            })
                                            : null}
                                    </View>
                                    {(currentTask.type === 2 && i !== 0) ?
                                        <Text style={styles.arrow}>&rArr;</Text> : null}
                                </BoxShadow>
                            </Pressable>
                            {(currentTask.type === 3)
                                ? <Pressable
                                    style={[gStyles.conformity, styles.conformity]}
                                    onPress={() => setOptionIndex(i)}>
                                    {stringPreparing({
                                        string: currentTask.options[i],
                                        width,
                                        style: [gStyles.conformityText, styles.conformityText, currentTask.options[i].length < 6
                                            ? styles.buttonTextBigFontSize
                                            : {}]
                                    })}
                                </Pressable>
                                : null}
                        </View>))}
                </View>
                <View style={gStyles.buttons}>
                    {currentTask.answers.map(({answer}, i) => (
                        <BoxShadow key={i} setting={{
                            width: button.width,
                            height: button.height,
                            color: '#000',
                            border: 0,
                            radius: 8,
                            opacity: 0.3,
                            x: 2,
                            y: 4,
                            style: {marginBottom: 10, marginHorizontal: buttonShadow.marginHorizontal}
                        }}>
                            <Pressable
                                style={[gStyles.button, getButtonColor(answer), styles.button]}
                                onPress={() => status === 'unsolved' ? changeAnswer(answer) : {}}>
                                <View style={{
                                    flexDirection: 'row',
                                    flexWrap: 'wrap',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                }}>
                                    {stringPreparing({
                                        string: answer,
                                        width,
                                        style: [gStyles.buttonText, styles.buttonText, answer.length < 6
                                            ? styles.buttonTextBigFontSize
                                            : {}]
                                    })}
                                </View>
                            </Pressable>
                        </BoxShadow>))}
                </View>
                <Pressable
                    style={[gStyles.confirmBtn, styles.confirmBtn, canPress ? gStyles.activeConfirmBtn : '']}
                    onPress={canPress ? handleConfirm : () => {
                    }}>
                    <Text style={[gStyles.confirmBtnText, styles.confirmBtnText]}>Проверить</Text>
                </Pressable>
            </View>
        );
    }
;
