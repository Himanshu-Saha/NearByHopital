import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React, {useEffect} from 'react';
import Login from '../Screens/Login';
import Home from '../Screens/Home';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import Hospitals from '../Screens/Hospitals';
import {useAppDispatch, useAppSelector} from '../Store/store';
import {updateUser} from '../Store/userDetails';

type StackParamList = {
  Login: undefined;
  Home: undefined;
  Hospitals: undefined;
};

export default function Navigation() {
  const Stack = createNativeStackNavigator<StackParamList>();
  const isLoggedIn = useAppSelector(state => state.user.isLoggedIn);
  const dispatch = useAppDispatch();
  useEffect(() => {
    const hasPreviousSignIn = async () => {
      const hasPreviousSignIn = GoogleSignin.hasPreviousSignIn();
      dispatch(updateUser(hasPreviousSignIn));
    };
    hasPreviousSignIn();
  }, [dispatch]);
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        {!isLoggedIn ? (
          <>
            <Stack.Screen name="Login" component={Login} options={{headerShown:false}}/>
          </>
        ) : (
          <>
            <Stack.Screen
              name="Home"
              component={Home}
              options={{headerShown: false}}
            />
            <Stack.Screen name="Hospitals" component={Hospitals} options={{headerTitleAlign:'center'}}/>
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
