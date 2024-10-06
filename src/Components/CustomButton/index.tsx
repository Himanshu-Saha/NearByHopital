import React from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import { heightPercentageToDP, widthPercentageToDP } from 'react-native-responsive-screen';

interface customButtonProps {
  text: string;
  onPress: () => void;
}
export default function CustomButton({text, onPress}: customButtonProps) {
  return (
    <TouchableOpacity onPress={onPress} style={style.container}>
      <Text style={style.text}>{text}</Text>
    </TouchableOpacity>
  );
}

const style = StyleSheet.create({
  container: {
    backgroundColor: 'rgb(107,78,255)',
    borderRadius: 50,
    padding: 10,
    width: widthPercentageToDP('70%'),
    alignSelf:'center',
    marginVertical:heightPercentageToDP('1%'),
  },
  text: {
    color: 'white',
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
  },
});
