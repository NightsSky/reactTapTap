import React, { Component } from 'react';
import { Text, View } from 'react-native';
class OtherView extends Component {
    render(){
        return (
            <View style={{alignItems: 'center', marginTop: 50}}>
                <Text>Hello {this.props.name}!</Text>
            </View>
        )
    }

}
export default OtherView;
