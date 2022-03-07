import React, {useState} from 'react';
import {StyleSheet, Text, View, ScrollView, Image, Pressable, TextInput} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {serverUrl, subjects} from '../../config';

import sizes, {general} from './styles';

export const Profile = ({navigation, accData, width, setAccData}) => {
    const {userId, name, isAuthorized} = accData;
    const {navigate} = navigation;

    const size = sizes[width];
    const styles = StyleSheet.create(size);
    const gStyles = StyleSheet.create(general);

    const [newName, setNewName] = useState(name);
    const [activeSubjects, setActiveSubjects] = useState(null);

    const changeName = (string) => {
        const preparedString = string.replace(/[^A-Za-za-яА-Я0-9_-]/g, '');

        if (preparedString.length < 12) {
            setNewName(string.replace(/[^A-Za-za-яА-Я0-9_-]/g, ''));
        }
    };

    const confirmName = () => {
        if (newName.length > 3) {
            setAccData(prev => ({...prev, name: newName}));
            AsyncStorage.mergeItem('ACCOUNT_DATA', JSON.stringify({name: newName}));

            if (isAuthorized) fetch(`${serverUrl}api/updateName`, {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({userId, name: newName})
            });
        }
    };

    return (
        <View style={gStyles.wrapper}>
            <Pressable
                style={[gStyles.back, styles.back]}
                onPress={() => navigate('Main')}>
                <Image
                    style={{width: '100%', height: '100%', resizeMode: 'contain', transform: [{rotate: '180deg'}]}}
                    source={require(`../../assets/elements/arrow.png`)}/>
            </Pressable>
            <View style={[gStyles.profile]}>
                <ScrollView style={[gStyles.scrollView, styles.scrollView]}>
                    <View style={gStyles.titleWrap}>
                        <Text style={gStyles.title}>Профиль</Text>
                        <TextInput
                            style={gStyles.nameInput}
                            value={newName}
                            onChangeText={changeName}/>
                        <Pressable style={gStyles.nameBtn} onPress={confirmName}>
                            <Text style={gStyles.nameBtnText}>ОК</Text>
                        </Pressable>
                    </View>
                    <View style={{paddingBottom: 5}}>
                        <Text style={gStyles.statTitle}>Статистика</Text>
                        {accData.stat.map(({subject, tasks}, i) => {
                            const {locale} = subjects.find(s => s.subject === subject);
                            const isActive = activeSubjects === locale;

                            return (
                                <View key={i}>
                                    <Text
                                        style={gStyles.subject}
                                        onPress={() => setActiveSubjects(isActive ? null : locale)}
                                    >{locale}</Text>
                                    {tasks.map(({num, correct, wrong}) => isActive
                                        ? (
                                            <View key={num} style={gStyles.numWrap}>
                                                <Text style={gStyles.num}>№ {num}:</Text>
                                                <Text style={gStyles.numStat}>{correct + wrong === 0
                                                    ? 'Нет данных'
                                                    : `${(correct / (correct + wrong) * 100).toFixed(1)}%`}</Text>
                                            </View>
                                        )
                                        : null
                                    )}
                                </View>
                            );
                        })}
                    </View>
                </ScrollView>
            </View>
        </View>
    );
};
