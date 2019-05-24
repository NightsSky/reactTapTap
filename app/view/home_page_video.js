import React, { Component } from 'react';
import { Text, View } from 'react-native';
class HomeVideoView extends Component {
    render(){
        return (
            <View style={{alignItems: 'center', marginTop: 50}}>
                <Text>Hello {this.props.name}!</Text>
            </View>
        )
    }

}
export default HomeVideoView;
