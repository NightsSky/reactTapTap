import React from "react"
import Tab from './bottom_tab';
import { packageList } from '../package/index';
import TapTitle from "../widget/TapTitle";
import HomeTopNavigator from "../router/home_tab";
import Game from "../view/home_page_game";
import Video from "../view/home_page_video";

const navigationOption = (name,options = {}) =>{
    return{
        screen:packageList[name],
        navigationOptions:{
            title:name,
            headerStyle:Object.assign(
                {height:50},
                options.headerStyle
            ),
            headerTitleStyle:Object.assign(
                {fontSize:14},
                options.headerTitleStyle
            )
        }
    }
};


export const routerList = {
    Tab: {
        screen: Tab,
        navigationOptions: () => ({
            headerTitle: <TapTitle/>,
            headerStyle:Object.assign(
                {height:50},

            ),
            headerTitleStyle:Object.assign(
                {fontSize:26},
            )
        })},
    Set: navigationOption('Set'),

};