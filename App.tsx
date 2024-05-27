import 'react-native-gesture-handler';
import React from 'react';
import 'intl';
import 'intl/locale-data/jsonp/pt-BR';

import { ThemeProvider } from 'styled-components/native';
import  AppLoading from 'expo-app-loading';

import {
  useFonts,
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_700Bold
} from '@expo-google-fonts/poppins'

import theme from './src/Global/styles/theme';
import { StatusBar } from 'react-native';


import { AuthProvider, useAuth } from './src/Hooks/auth';

import { Routes } from './src/Routes';

export default function App() {
  const [fontLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_700Bold
  });

  const { isLoading } = useAuth();

  if(!fontLoaded || isLoading){
    return <AppLoading/>
  };

  return (
    <ThemeProvider theme={theme} >
      <StatusBar barStyle='light-content'/> 
      <AuthProvider>
        <Routes />
      </AuthProvider>
    </ThemeProvider>
  );
}