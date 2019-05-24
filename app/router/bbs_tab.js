import React from 'react';
import {createMaterialTopTabNavigator} from 'react-navigation';
import Attention from '../view/bbs_attention';
import Video from '../view/home_page_video';
import Section from '../view/bbs_section';
import {Dimensions} from "react-native";

const screenWith = Dimensions.get('window').width;

export const BBSTopNavigator = createMaterialTopTabNavigator(
    {
        Section:{
            screen: Section,
            navigationOptions:{
                tabBarLabel:"板块"
            }
        },
        Attention: {
            screen: Attention,
            navigationOptions:{
                tabBarLabel:"关注"
            }

        },
        Video: {
            screen: Video,
            navigationOptions:{
                tabBarLabel:"视频"
            }
        }
    }, {
        initialRouteName: "Attention",
        tabBarOptions: {
            tabStyle: {
                width: screenWith/3
            },
            lazy:true,
            upperCaseLabel: false,//是否使标签大写，默认为true
            scrollEnabled: true,//是否支持 选项卡滚动，默认false
            // activeTintColor: 'white',//label和icon的前景色 活跃状态下（选中）
            // inactiveTintColor: 'gray',//label和icon的前景色 活跃状态下（未选中）
            style: {
                backgroundColor: 'white',//TabBar 的背景颜色
            },
            indicatorStyle: {
                height: 2,
                width:screenWith/3,
                backgroundColor: '#13B9C7',
            },//标签指示器的样式
            labelStyle: {
                fontSize: 16,
                marginTop: 6,
                marginBottom: 6,
                color:'#13B9C7',
                fontWeight: 'bold'
            },//文字的样式
        },
    }
);
export default BBSTopNavigator