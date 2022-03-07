import React, {useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import sizes, {general} from './styles';

import {Account, AuthPopup, Subject} from './components';
import {BoxShadow} from 'react-native-shadow';

export const Main = ({navigation, accData, setAccData, width, props}) => {
    const {subjects} = props;
    const {stat} = accData;
    const {navigate} = navigation;
    const [authPopupIsShowing, setAuthPopupIsShowing] = useState(false);

    const size = sizes[width];
    const gStyles = StyleSheet.create(general);
    const styles = StyleSheet.create(size);

    const {titleWrapper} = size;

    return (
        <View style={[gStyles.main, styles.main]}>
            {authPopupIsShowing
                ? <AuthPopup
                    setAuthPopupIsShowing={setAuthPopupIsShowing}
                    toProfile={() => navigate('Profile')}
                    accData={accData}
                    setAccData={setAccData}/> : null}
            <Account
                accData={accData}
                gStyles={gStyles}
                styles={styles}
                navigate={navigate}
                setAuthPopupIsShowing={setAuthPopupIsShowing}/>
            <View style={[gStyles.subjects, styles.subjects]}>
                <BoxShadow setting={{
                    width: titleWrapper.width,
                    height: titleWrapper.height,
                    color: '#000',
                    border: 7,
                    radius: 10,
                    opacity: 0.3,
                    x: 2,
                    y: 4,
                    style: {marginLeft: 'auto', marginRight: 'auto', marginBottom: 40}
                }}>
                    <Text style={[gStyles.subjectsTitle, styles.subjectsTitle, {maxHeight: titleWrapper.height}]}>выбери
                        предмет</Text>
                </BoxShadow>
                {subjects.map((sub, i) => <Subject
                    key={i}
                    sub={sub}
                    gStyles={gStyles}
                    styles={styles}
                    navigate={navigation.navigate} stat={stat}/>)}
            </View>
        </View>
    );
};
