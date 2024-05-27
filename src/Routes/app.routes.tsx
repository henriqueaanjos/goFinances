import React from 'react';
import { useTheme } from 'styled-components';
import { MaterialIcons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { DashBoard } from '../Screens/DashBoard';
import { Register } from '../Screens/Register';
import { Resume } from '../Screens/Resume';

import { Platform } from 'react-native';

const { Navigator, Screen } = createBottomTabNavigator();

export function AppRoutes(){
    const theme = useTheme();
    return(
        <Navigator
            tabBarOptions={{
                activeTintColor: theme.colors.secundary,
                inactiveTintColor: theme.colors.text,
                labelPosition: 'beside-icon',
                style:{
                    paddingVertical: Platform.OS === 'ios' ? 20 : 0,
                    height: 72
                }
            }}
        >
            <Screen
                name='Listagem'
                component={DashBoard}
                options={{
                    tabBarIcon: ({size, color}) => 
                        <MaterialIcons
                            name='format-list-bulleted'
                            size={size}
                            color={color}
                        />
                }}
            />
            <Screen
                name='Cadastrar'
                component={Register}
                options={{
                    tabBarIcon: ({size, color}) => 
                        <MaterialIcons
                            name='attach-money'
                            size={size}
                            color={color}
                        />
                }}
            />
            <Screen
                name='Resumo'
                component={Resume}
                options={{
                    tabBarIcon: ({size, color}) => 
                        <MaterialIcons
                            name='pie-chart'
                            size={size}
                            color={color}
                        />
                }}
            />
        </Navigator>
    );
}