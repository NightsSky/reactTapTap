import React, { Component } from 'react';
import { Text, View } from 'react-native';
class SetView extends Component {
    static navigationOptions = {
        headerTitle: 'Home',
        headerTintColor: '#ff2a2f',
        backgroundColor:"#f4511e",
        headerTitleStyle: {
            fontWeight: 'bold',
        },
    };
    render(){
        return (
            <View style={{alignItems: 'center', marginTop: 50}}>
                <Text>Hello {this.props.name}!</Text>
            </View>
        )
    }

}
export default SetView