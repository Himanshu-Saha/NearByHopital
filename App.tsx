import React, {useEffect} from 'react';
import Navigation from './src/Navigation/navigation';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import { store } from './src/Store/store';
import { Provider } from 'react-redux';

export default function App() {
  useEffect(() => {
    GoogleSignin.configure({
      webClientId:
        '1043468313944-ig2s6c6m89ac21gp3npfm6s0fjqgtctp.apps.googleusercontent.com',
      iosClientId:
        '11043468313944-8d8uj84qn5uc1vbj3pocr81l0va12h7a.apps.googleusercontent.com',
      scopes: ['profile', 'email'],
    });
  }, []);

  return (
    <Provider store={store}>
      <Navigation />
    </Provider>
  );
}
