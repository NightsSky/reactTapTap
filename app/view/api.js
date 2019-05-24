import React, { Component } from 'react';
import { Text, View } from 'react-native';
class ApiView extends Component {
    render(){
        return (
            <View style={{alignItems: 'center', marginTop: 50}}>
                <Text>Hello {this.props.name}!</Text>
            </View>
        )
    }

}
export default ApiView