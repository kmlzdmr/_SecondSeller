import React, {useState} from 'react';
import {View, ScrollView, Image, Text} from 'react-native';
import {Button, Input, Animation} from '@components';

import styles from './EmailVerification.style';

import {register, updateUser} from '../../services/userServices';
import {useUser} from '../../context/UserProvider';
import {getUserFromToken, showFlashMessage} from '@utils/functions';
import Storage from '@utils/Storage';

const EmailVerification = ({navigation, route}) => {
  const [verificationCode, setVerificationCode] = useState('');
  const [loading, setLoading] = useState(false);
  const {setUser} = useUser();

  const {verificationCode: code, user, type} = route.params;
  const checkAndRegister = async () => {
    if (verificationCode === code) {
      setLoading(true);
      const response = await register(user);
      if (response.status.toString().startsWith('2')) {
        await Storage.storeData('token', response.data);
        const user = await getUserFromToken();
        console.log('USER', user);
        setUser(user);
      } else {
        showFlashMessage(response.status, response.message);
      }
      setLoading(false);
    }
  };

  const checkAndUpdate = async () => {
    if (verificationCode === code) {
      setLoading(true);
      const response = await updateUser(user.id, user.values);
      if (response.status.toString().startsWith('2')) {
        const user = await getUserFromToken();
        setUser(user);
        navigation.replace('ProfileStackScreen');
      } else {
        showFlashMessage(response.status, response.message);
      }
      setLoading(false);
    }
  };

  if (loading) {
    return <Animation animationName={'loading'} />;
  } else {
    return (
      <ScrollView contentContainerStyle={styles.container}>
        <Image
          source={require('@assets/images/emailValidation.png')}
          style={styles.image}
        />

        <View style={styles.textContainer}>
          <Text style={styles.infoMessage}>
            E-posta adresinize 6 haneli doğrulama kodu gönderildi.
          </Text>
          <Text style={styles.infoMessage}>Lütfen boşluğa giriniz.</Text>
        </View>

        <Input
          placeholder="Doğrulama Kodu"
          onChangeText={val => {
            let numberValue = val.replace(/[^0-9]/g, '');
            setVerificationCode(numberValue);
          }}
          value={verificationCode}
          keyboardType="number-pad"
          maxLength={6}
        />
        <Button
          onPress={() =>
            type == 'register' ? checkAndRegister() : checkAndUpdate()
          }
          label="Doğrula"
        />
      </ScrollView>
    );
  }
};

export default EmailVerification;
