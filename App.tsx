import React, {useEffect} from 'react';
import Navigation from './src/Navigation/navigation';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import { store } from './src/Store/store';
import { Provider } from 'react-redux';

export default function App() {
  useEffect(() => {
    GoogleSignin.configure({
      webClientId:
        '',
      iosClientId:
        '',
      scopes: ['profile', 'email'],
    });
  }, []);

  return (
    <Provider store={store}>
      <Navigation />
    </Provider>
  );
}
