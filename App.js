import React from 'react';

import AppContainer from "./app/router";
export default class App extends React.Component {
    static navigationOptions = {
        title: 'Home',
        headerStyle: {
            backgroundColor: '#f4511e',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
            fontWeight: 'bold',
        },
    };
    render() {
        return (
          <AppContainer onNavigationStateChange={this.handleNavigationChange} />
        );
    }
}
