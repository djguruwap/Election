import {useNavigation} from '@react-navigation/native';
import axios from 'axios';
import {Formik} from 'formik';
import React, {useContext, useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {showMessage} from 'react-native-flash-message';
import Spinner from 'react-native-loading-spinner-overlay/lib';
import {CommonButton} from '../../../components/Buttons/CommonButton';
import {Input} from '../../../components/Inputs/Input';
import {AuthContext} from '../../../navigation/AuthProvider';
import Apis from '../../../services/apis';
import {base_url, COLORS, FONT_FAMILY, FONT_SIZE} from '../../../utils/constants';
import {loginSchema} from '../validate';

export const LoginForm = () => {
  const {login} = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const {navigate} = useNavigation();

  const onSubmitHandler = values => {
        // login({ token: 'dksjankdnsakndsandnsd' });
    setLoading(true);
    const body = {
      email: values?.email,
      password: values?.password
    }
    Apis.Login(body).then(res => {
      setLoading(false);
        const { success } = res
        if(success){
          showMessage({ message: 'Login Successfull!', type: 'success' })
          setTimeout(() => {
            login(res)
          }, 2000)
        }
    }).catch(error => {
      setLoading(false);
      if (error.response.status === 401) {
          showMessage({ message: error?.response?.data?.message, type: 'danger' })
       }else{
    	    showMessage({ message: 'Something went wrong!', type: 'danger' })
       }
    })
  };
  return (
    <Formik
      initialValues={{
        email: '',
        password: '',
      }}
      validationSchema={loginSchema}
      onSubmit={onSubmitHandler}>
      {({
        values,
        handleChange,
        errors,
        setFieldTouched,
        touched,
        handleSubmit,
      }) => (
        <>
          <Spinner visible={loading} textContent={'Loading...'} />
          <Input
            value={values.email}
            onChange={handleChange('email')}
            onBlur={() => setFieldTouched('email')}
            icon="account"
            borderColor="#D0EEFF"
            error={errors.email}
            touched={touched.email}
            maxLength={30}
            placeholder="Username"
          />
          <Input
            value={values.password}
            onChange={handleChange('password')}
            onBlur={() => setFieldTouched('password')}
            icon="lock"
            borderColor="#D0EEFF"
            error={errors.password}
            touched={touched.password}
            maxLength={30}
            isSecure
            placeholder="Password"
          />
          <View style={styles.forgetPassBox}>
            <TouchableOpacity onPress={() => navigate('ForgetPassword')}>
              <Text style={styles.signUpText}>Forget Password?</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.buttonBox}>
            <CommonButton onPress={handleSubmit} width={'80%'} text="LOG IN" />
          </View>
        </>
      )}
    </Formik>
  );
};

const styles = StyleSheet.create({
  forgetPassBox: {
    alignSelf: 'flex-end',
    marginVertical: 8,
  },
  buttonBox: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30,
    marginTop: 12,
  },
  signUpText: {
    fontFamily: FONT_FAMILY.REGULAR,
    fontSize: FONT_SIZE.SMALL,
    color: COLORS.PRIMARY_1,
    alignSelf: 'center',
    // marginTop: 8
  },
});
