import React from 'react';
import {Pressable, Text, View} from 'react-native';

export const Account = ({accData, gStyles, styles, navigate, setAuthPopupIsShowing}) => {
    const {name, isAuthorized} = accData;

    return (
        <View style={[gStyles.account, styles.account]}>
            <Pressable
                onPress={() => navigate('Profile')}
                style={[gStyles.accountData, styles.accountData]}>
                <Text style={[gStyles.accountName, styles.accountName]}>{name}</Text>
            </Pressable>
            {isAuthorized
                ? null
                : <Pressable
                    style={[gStyles.authBtn, styles.authBtn]}
                    onPress={() => setAuthPopupIsShowing(true)}>
                    <Text style={[gStyles.authBtnText, styles.authBtnText]}>авторизоваться</Text>
                </Pressable>}
        </View>
    );
}
