import React from "react"
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {View, Text, Image} from 'react-native';

class TapTitle extends React.Component {
    render() {
        return (
            <View style={{flex:1,padding:10, height: 50,flexDirection: 'row',alignItems:'center',backgroundColor:"#13B9C7"}}>
                <Image  source={require("../../Images/myheader.jpg")} style={{width: 36, height: 36,borderRadius:60}}/>
                <Text style={{flex:1,textAlign: 'center',color:'white',fontWeight: 'bold'}}>Tap Tap</Text>
                <FontAwesome name={'bell-o'} size={20} color="white"/>
                <FontAwesome name={'search'} size={20} color="white" style={{marginLeft:10,marginRight:10}}/>
            </View>
        );
    }
}

export default TapTitle