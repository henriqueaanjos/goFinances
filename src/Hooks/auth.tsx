import React, { useContext, createContext, ReactNode, useState, useEffect } from 'react';
import * as AuthSession from 'expo-auth-session';
import * as AppleAuthentication from 'expo-apple-authentication';

import AsyncStorage from '@react-native-async-storage/async-storage';

const { CLIENT_ID } = process.env;
const { REDIRECT_URI } = process.env;

interface AuthContextProps{
    children: ReactNode
}
interface User{
    id: string,
    name: string,
    email: string,
    photo?: string
}
interface AuthDataProps{
    user: User,
    signInWithGoogle():Promise<void>
    signInWithApple():Promise<void>
    signOut():Promise<void>
    isLoading: boolean
}

interface AuthorizationResponse{
    params: {
        access_token: string
    },
    type: string
}
const AuthContext = createContext({} as AuthDataProps);

export function AuthProvider({ children }: AuthContextProps){
    const [user, setUser] = useState<User>({} as User);
    const [isLoading, setIsLoading] = useState(true);
    const [social, setSocial] = useState('');

    const userKey = '@gofinances:user';

    function validName(name : string){
        if(name.length >= 20 ){
            return name.substring(0, name.indexOf(' '));
        }
        return name;
    }

    async function signInWithGoogle(){
        try{
            //const CLIENT_ID='355044269672-7bjbhvjfv618t4d2c6kg269cjhhcv9nq.apps.googleusercontent.com';
            //const REDIRECT_URI='https://auth.expo.io/@henrique_anjos/gofinances';
            const RESPONSE_TYPE = 'token';
            const SCOPE = encodeURI('profile email');

            const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=${SCOPE}`;

            const {type, params} = await AuthSession.startAsync({ authUrl }) as AuthorizationResponse;
            if(type === 'success'){
                const response = await fetch(`https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${params.access_token}`);
                const userInfo = await response.json();
                const name = validName(userInfo.given_name);
                const userLogged = {
                    id: userInfo.id,
                    name,
                    email: userInfo.email,
                    photo: userInfo.picture
                };
                console.log(userInfo);
                setUser(userLogged);
                setSocial('Google');
                await AsyncStorage.setItem(userKey, JSON.stringify(userLogged));
            }
        }catch(error){
            throw new Error(error);
        }
    }

    async function signInWithApple(){
        try {
            const credentials = await AppleAuthentication.signInAsync({
                requestedScopes:[
                    AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
                    AppleAuthentication.AppleAuthenticationScope.EMAIL
                ]
            });

            if(credentials){
                let userLogged = {
                    id: credentials.user,
                    name: credentials.fullName!.givenName!,
                    email: credentials.email!,
                    photo: `https://ui-avatars.com/api/?name=${credentials.fullName!.givenName}+${credentials.fullName!.familyName}&length=2&background=random&bold=true`
                };
                setUser(userLogged);
                setSocial('Apple');
                console.log(user);
                await AsyncStorage.setItem(userKey, JSON.stringify(userLogged));
            }

        } catch (error) {
            throw new Error(error)
        }
    }

    async function signOut(){
        setUser({} as User);
        await AsyncStorage.removeItem(userKey);
    }
    
    useEffect(() => {
        async function loadStorageUserData(){
            const userData = await AsyncStorage.getItem(userKey);
            if(userData){
                const userLogged = JSON.parse(userData) as User;
                setUser(userLogged);
            }
            setIsLoading(false);
        }
        loadStorageUserData();
    }, []);

    return(
        <AuthContext.Provider value={{ 
            user, 
            signInWithGoogle, 
            signInWithApple, 
            signOut,
            isLoading
        }}>
            {children}
        </AuthContext.Provider>
    )
}

export function useAuth(){
    const context = useContext(AuthContext);
    return context;
}