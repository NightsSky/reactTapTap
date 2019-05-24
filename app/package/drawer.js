import React from 'react';
import {createDrawerNavigator, createStackNavigator} from "react-navigation"
import {routerList} from "../router/list";
import { Text, View } from 'react-native';

const StackNavigatorConfigs = {
    initialRouteName: 'Tab',

    cardOverlayEnabled: true,
    defaultNavigationOptions: {
        gesturesEnabled: true,
        headerBackTitle: null,
        headerTitleAllowFontScaling: false,
        headerTitleStyle: {
            // alignItems: 'center',
            color: Color.white,
            paddingTop: 3,
            fontSize: 20,
            // alignSelf: 'center',
            fontWeight: 'normal',
            // 设置标题居中
            // flex: 1,
            // textAlign: 'center'
        },
        headerStyle: {
            elevation: 1,
            backgroundColor: Color.theme,
            shadowOpacity: 0,
            borderBottomWidth: 0,
        },
        headerTintColor: Color.white,
    }
};

const StackNavigator = createStackNavigator(routerList, StackNavigatorConfigs);


/** 侧滑栏 */
const CustomDrawerContentComponent = () => {
    return (
        <View >
            <Text>CustomDrawerContentComponent</Text>
        </View>
    );
};

// 带有侧滑页的
const DrawerNavigator = createDrawerNavigator(
    {
        // ...TabConfig,
        StackNavigator: { screen: StackNavigator },
    },
    {
        drawerWidth: Screen.width * 0.4, // 展示的宽度
        drawerPosition: 'left', // 抽屉在左边还是右边
         contentComponent: CustomDrawerContentComponent, // 自定义侧滑栏
        // swipeEnabled: false
        initialRouteName:StackNavigator
    }
);

export default DrawerNavigator