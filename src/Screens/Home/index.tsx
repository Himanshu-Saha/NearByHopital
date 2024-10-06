/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {Image, SafeAreaView, View} from 'react-native';
import CustomButton from '../../Components/CustomButton';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {useNavigation} from '@react-navigation/native';
import {useDispatch} from 'react-redux';
import {updateUser} from '../../Store/userDetails';
import {heightPercentageToDP} from 'react-native-responsive-screen';

export default function Home() {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const signOut = async () => {
    try {
      await GoogleSignin.signOut().then(() => navigation.navigate('Login'));
      dispatch(updateUser(false));
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <SafeAreaView>
      <Image
        source={require('../../assets/hospital.png')}
        style={{
          height: heightPercentageToDP('30%'),
          width: heightPercentageToDP('30%'),
          alignSelf: 'center',
          marginTop: '20%',
        }}
      />
      <View style={{marginTop: heightPercentageToDP('6%')}}>
        <CustomButton
          text="Near By Hopitals"
          onPress={() => {navigation.navigate('Hospitals')}}
        />
        <CustomButton text="Sign Out" onPress={() => signOut()} />
      </View>
    </SafeAreaView>
  );
}
