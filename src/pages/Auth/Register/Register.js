// Components
import React, {useState} from 'react';
import {ScrollView, Text, View} from 'react-native';
import {Button, Input, Animation} from '@components';

// Styles & Colors
import {CONSTANTS} from '@utils';
import THEMECOLORS from '@utils/colors';
import {getStyles} from './Register.style';

// Forms and Validations
import {Formik} from 'formik';
import {RegisterSchema} from '@utils/validationSchemas';

// Register
import {sendEmailVerification} from '../../../services/userServices';
import {showFlashMessage} from '@utils/functions';
import {useTheme} from '../../../context/ThemeContext';

const initialValues = {
  nameSurname: '',
  emailAddress: '',
  phoneNumber: '',
  password: '',
  passwordConfirm: '',
};

// validation ekle

const Register = ({navigation}) => {
  const [loading, setLoading] = useState(false);

  const {theme} = useTheme();
  const COLORS = theme === 'dark' ? THEMECOLORS.DARK : THEMECOLORS.LIGHT;
  const styles = getStyles(theme);

  if (!loading) {
    return (
      <View style={{backgroundColor: COLORS.pageBackground}}>
        <Button
          onPress={() => navigation.goBack()}
          icon={{
            name: 'chevron-left',
            size: CONSTANTS.fontSize.L7,
            color: COLORS.textColor,
          }}
          additionalStyles={{
            container: styles.additionalStylesContainer,
          }}
        />
        <ScrollView
          style={styles.container}
          contentContainerStyle={styles.formContainer}>
          <Text style={styles.appName}>{CONSTANTS.APP_NAME}</Text>
          <View style={styles.title} />
          <Formik
            initialValues={initialValues}
            onSubmit={async user => {
              setLoading(true);
              const response = await sendEmailVerification(user, '');
              if (response.status.toString().startsWith('2')) {
                navigation.navigate('EmailVerificationScreen', {
                  verificationCode: response.data,
                  user,
                  type: 'register',
                });
              } else {
                showFlashMessage(response.status, response.message);
              }
              setLoading(false);
            }}
            validationSchema={RegisterSchema}>
            {({handleChange, handleSubmit, values, errors, touched}) => (
              <>
                <Input
                  label={'Ad Soyad'}
                  onChangeText={handleChange('nameSurname')}
                  value={values.nameSurname}
                  errors={
                    touched.nameSurname &&
                    errors.nameSurname &&
                    errors.nameSurname
                  }
                />
                <Input
                  label={'E-posta Adresi'}
                  onChangeText={handleChange('emailAddress')}
                  value={values.emailAddress}
                  keyboardType="email-address"
                  errors={
                    touched.emailAddress &&
                    errors.emailAddress &&
                    errors.emailAddress
                  }
                  placeholder="info@secondeseller.com"
                />
                <Input
                  label={'Telefon Numarası'}
                  onChangeText={handleChange('phoneNumber')}
                  value={values.phoneNumber}
                  keyboardType="number-pad"
                  errors={
                    touched.phoneNumber &&
                    errors.phoneNumber &&
                    errors.phoneNumber
                  }
                  placeholder="0555-555-5555"
                />
                <Input
                  label={'Şifre'}
                  onChangeText={handleChange('password')}
                  value={values.password}
                  secret={true}
                  errors={
                    touched.password && errors.password && errors.password
                  }
                />
                <Input
                  label={'Şifre Tekrar'}
                  onChangeText={handleChange('passwordConfirm')}
                  value={values.passwordConfirm}
                  secret={true}
                  errors={
                    touched.passwordConfirm &&
                    errors.passwordConfirm &&
                    errors.passwordConfirm
                  }
                />
                <Button onPress={handleSubmit} label="KAYIT OL" />
              </>
            )}
          </Formik>
        </ScrollView>
      </View>
    );
  } else {
    return <Animation animationName={'loading'} />;
  }
};

export default Register;
