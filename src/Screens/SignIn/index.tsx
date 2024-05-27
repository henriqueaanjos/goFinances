import React, { useState } from 'react';
import { ActivityIndicator, Alert, Platform } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { useTheme } from 'styled-components';

import LogoSVG from '../../Assets/logo.svg';
import GoogleSVG from '../../Assets/google.svg';
import AppleSVG from '../../Assets/apple.svg';

import {
    Container,
    Header,
    TitleWrapper,
    Title,
    SignInTitle,
    Footer,
    FooterWrapper
} from './styles';

import { ButtonSignIn } from '../../Components/ButtonSignIn';
import { useAuth } from '../../Hooks/auth';

export function SignIn(){
    const [isLoading, setIsLoading] = useState(false);

    const theme = useTheme();
    const { user, signInWithGoogle, signInWithApple } = useAuth();

    async function handleSignInWithGoogle(){
        try{
            setIsLoading(true);
            return await signInWithGoogle();
        }catch(error){
            console.log(error);
            Alert.alert('Não foi possivel conectar a conta Google ');
            setIsLoading(false);
        }
    }
    async function handleSignInWithApple(){
        try{
            setIsLoading(true);
            return await signInWithApple();
        }catch(error){
            console.log(error);
            Alert.alert('Não foi possivel conectar a conta Google ');
            setIsLoading(false);
        }
    }

    return(
        <Container>
            <Header>
                <TitleWrapper>
                    <LogoSVG
                    width={RFValue(120)}
                    height={RFValue(68)}/>
                    <Title>
                        Controle suas{'\n'}
                        finanças de forma {'\n'}
                        muito simples
                    </Title>
                </TitleWrapper>
                <SignInTitle>
                    Faça seu login com {'\n'}
                    uma das contas abaixo
                </SignInTitle>
            </Header>
            <Footer>
                <FooterWrapper>
                    <ButtonSignIn 
                        title='Entrar com Google'
                        svg={GoogleSVG}
                        onPress={handleSignInWithGoogle}
                    />{
                    Platform.OS === 'ios' &&
                        <ButtonSignIn 
                            title='Entrar com Apple'
                            svg={AppleSVG}
                            onPress={handleSignInWithApple}
                        />
                    }
                </FooterWrapper>
                {isLoading && <ActivityIndicator color={theme.colors.shape} style={{marginTop: 18}}/>}
            </Footer>
        </Container>
    );
}