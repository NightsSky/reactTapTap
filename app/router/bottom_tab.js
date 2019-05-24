
/**
 * tab 层
 */
import React from 'react';
import { createBottomTabNavigator } from 'react-navigation';
import Icon from 'react-native-vector-icons/AntDesign';

import Other from '../view/other';
import Found from '../view/found';
import {HomeTopNavigator} from "./home_tab";
import BBS from "./bbs_tab";


const Tab = createBottomTabNavigator(
    {
        Home: {
            screen: HomeTopNavigator,
            navigationOptions: {
                title: "首页",
                gesturesEnabled: true,
                tabBarVisible: true,
                tabBarIcon: ({tintColor, focused}) => (
                    <Icon
                        name={focused ? 'appstore1' : 'appstore-o'}
                        size={26}
                        style={{color: tintColor}}
                    />
                )
            }
        },
        Found: {
            screen: Found,
            navigationOptions: {
                title: "发现",
                gesturesEnabled: true,
                tabBarVisible: true,
                tabBarLabel: '发现',
                tabBarIcon: ({tintColor, focused}) => (
                    <Icon name='API' size={26} style={{color: tintColor}}/>
                )
            }
        },
        BBS: {
            screen: BBS,
            navigationOptions: {
                title: "论坛",
                gesturesEnabled: true,
                tabBarVisible: true,
                tabBarLabel: '论坛',
                tabBarIcon: ({tintColor, focused}) => (
                    <Icon name={focused ? 'appstore1' : 'appstore-o'}
                          size={26}
                          style={{color: tintColor}}/>
                )
            }
        },
        Other: {
            screen: Other,
            navigationOptions: {
                headerTitle: 'DOC',
                gesturesEnabled: true,
                tabBarVisible: true,
                tabBarLabel: 'DOC',
                tabBarIcon: ({tintColor, focused}) => (
                    <Icon name='rocket1' size={26} style={{color: tintColor}}/>
                )
            }
        }
    },
    {

        tabBarPosition: 'bottom',
        lazy: true,
        initialRouteName: 'Found',
        navigationOptions:{
            defaultNavigationOptions:true,
        }

    }
);
export default Tab