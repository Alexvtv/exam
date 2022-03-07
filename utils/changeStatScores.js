import AsyncStorage from '@react-native-async-storage/async-storage';
import {serverUrl} from '../config';

export const changeStatScores = ({isCorrect, accData, taskNum, setAccData}) => {
    const {userId, isAuthorized} = accData;

    const stat = accData.stat.map(stat => stat.subject === 'chemistry'
        ? {
            ...stat,
            scores: stat.scores + (isCorrect ? 3 : (-2)),
            tasks: stat.tasks.map(task => {
                const {correct, wrong, num} = task;

                return num.toString() === taskNum
                    ? isCorrect
                        ? {...task, correct: correct + 1}
                        : {...task, wrong: wrong + 1}
                    : task;
            })
        }
        : stat);

    setAccData(prev => ({...prev, stat}));
    AsyncStorage.setItem('ACCOUNT_DATA', JSON.stringify({...accData, stat}));

    if (isAuthorized) fetch(`${serverUrl}api/updateStat`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({userId, stat})
    });
};
