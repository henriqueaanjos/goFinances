import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';

import { SignIn} from '../Screens/SignIn';
import { DashBoard } from '../Screens/DashBoard';

const { Navigator, Screen } =  createStackNavigator();

export function AuthRoutes(){
    return(
        <Navigator screenOptions={{
            headerShown: false
        }} >
            <Screen
                name='SignIn'
                component={SignIn}
            />
        </Navigator>
    );
}