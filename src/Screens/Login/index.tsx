/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useRef, useState} from 'react';
import {
  GoogleSignin,
  isErrorWithCode,
  isSuccessResponse,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import {useAppDispatch, useAppSelector} from '../../Store/store';
// import GoogleLogo from '../../assets/google.svg';
import {updateUser} from '../../Store/userDetails';
import {
  Alert,
  Image,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import {SafeAreaView} from 'react-native-safe-area-context';

export default function Login() {
  const isConnected = useAppSelector(state => state.network.isAvailable);
  const networkStatus = useRef<boolean>(false);
  const dispatch = useAppDispatch();
  const [isSigningIn, setIsSigningIn] = useState(false); // State for loading indicator

  useEffect(() => {
    networkStatus.current = isConnected;
    checkConnection();

    // Initialize Google Sign-In
    const initGoogleSignIn = async () => {
      try {
        await GoogleSignin.configure();
      } catch (error) {
        console.error('Google Sign-In configuration error:', error);
      }
    };

    initGoogleSignIn();
  }, [isConnected]);

  const signIn = async () => {
    if (isSigningIn) return; // Prevent multiple sign-ins
    setIsSigningIn(true); // Set signing in state

    try {
      await GoogleSignin.hasPlayServices();
      const response = await GoogleSignin.signIn();
      if (isSuccessResponse(response)) {
        dispatch(updateUser(true));
      } else {
        Alert.alert('Sign-in cancelled', 'You cancelled the sign-in process.');
      }
    } catch (error) {
      handleSignInError(error);
    } finally {
      setIsSigningIn(false); // Reset signing in state
    }
  };

  const handleSignInError = (error: any) => {
    if (isErrorWithCode(error)) {
      switch (error.code) {
        case statusCodes.IN_PROGRESS:
          Alert.alert(
            'Sign-in in progress',
            'You are already trying to sign in.',
          );
          break;
        case statusCodes.PLAY_SERVICES_NOT_AVAILABLE:
          Alert.alert(
            'Error',
            'Google Play Services are not available or outdated.',
          );
          break;
        default:
          Alert.alert(
            'Error',
            'An unexpected error occurred. Please try again later.',
          );
          console.log('Sign-in error:', error);
      }
    } else {
      Alert.alert(
        'Error',
        'An unexpected error occurred. Please try again later.',
      );
      console.log('Sign-in error:', error);
    }
  };

  const checkConnection = () => {
    if (!networkStatus.current) {
      Alert.alert(
        'No Internet Connection',
        'Please check your internet connection and try again.',
        [
          {
            text: 'Retry',
            onPress: () => checkConnection(),
          },
        ],
      );
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.innerContainer}>
        <Image
          source={require('../../assets/hospital.png')}
          style={styles.logo}
        />
        <View style={styles.google}>
          <TouchableOpacity
            onPress={signIn}
            activeOpacity={0.6}
            disabled={isSigningIn} // Disable button while signing in
          >
            <View style={styles.googleContainer}>
              {/* <GoogleLogo
                height={heightPercentageToDP('3.8%')}
                width={heightPercentageToDP('3.4%')}
              /> */}
              <Text style={styles.text}>
                {isSigningIn ? 'Signing in...' : 'Sign in with Google'}
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  innerContainer: {
    alignItems: 'center',
  },
  logo: {
    height: heightPercentageToDP('30%'),
    width: heightPercentageToDP('30%'),
    alignSelf: 'center',
  },
  google: {
    paddingTop: heightPercentageToDP('5%'),
    alignSelf: 'center',
  },
  googleContainer: {
    flexDirection: 'row',
    borderRadius: 50,
    backgroundColor: 'white',
    width: widthPercentageToDP('82%'),
    padding: widthPercentageToDP('4%'),
    alignContent: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
      },
      android: {
        elevation: 3,
      },
    }),
  },
  text: {
    fontSize: heightPercentageToDP('3%'),
    paddingLeft: widthPercentageToDP('4%'),
    color: '#757575',
    fontWeight: 'bold',
  },
});
