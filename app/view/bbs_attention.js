import React, { Component } from 'react';
import {Dimensions, FlatList, StyleSheet, Text, Image, View} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';


const URL = "https://api.taptapdada.com/feed/v4/forum-timeline?X-UA=V%3D1%26PN%3DTapTap%26VN_CODE%3D551%26LOC%3DCN%26LANG%3Dzh_CN%26CH%3Dsmsem%26UID%3D5a0b83f8-c1d2-4811-b112-41800bc98c49"

const BannerWidth = Dimensions.get('window').width;
const BannerHeight = BannerWidth*7/16;
class BBSAttentionView extends Component {
    constructor(props){
        super(props);
        this.state = {
            data: [],
            banners:[],
            loaded: false
        };
    }
    // 组件渲染后调用
    componentDidMount() {
         this._fetchData();
    }

    _fetchData() {
        fetch(URL)
            .then(response => response.json())
            .then(responseData =>{
                console.log(responseData)
                let list = responseData.data.list;
                this.setState({
                    data:list,
                    loaded: true
                })
            })
    }

    render(){
        return (
            <View style={styles.container}>
                <FlatList
                    style={{flex:1, marginLeft: 10,marginRight:10}}
                    data={this.state.data}
                    // ListHeaderComponent={this._createHeaderItem()}
                    // ItemSeparatorComponent={this._separator}
                    renderItem={({item})=> this._createItem(item)}

                    keyExtractor={this._extraUniqueKey}
                />
            </View>
        )
    }
    /**
     * 创建布局
     */
    _createItem(item){
            return (
                <View style={{flex:1,flexDirection:'row',marginTop: 10}}>
                    <Image style={{width: 40,height:40,borderRadius:36,marginRight:5}} source={{uri:item.user.medium_avatar}}/>
                    <View style={{flex:1}}>
                        <Text style={{color:'black',fontSize:16,fontWeight:'bold'}}>{item.user.name}</Text>
                        <Text>{item.description}</Text>
                        <View style={{borderRadius:6,borderColor: '#EEEEEE',borderWidth: 1,marginTop: 10}}>
                            <Image style={{flex:1,height:160,borderTopLeftRadius:6,borderTopRightRadius:6}}
                                   source={{uri:item.entities.topic.sharing.image.medium_url}}/>
                            <Text style={{color:'black',fontSize:16,fontWeight: 'bold' ,marginLeft:10,marginRight:10}}>
                                {item.entities.topic.sharing.title}</Text>
                            <Text numberOfLines={2} ellipsizeMode="tail" style={{marginBottom:10,marginLeft:10,marginRight:10}}>
                                {item.entities.topic.sharing.description}</Text>
                        </View>
                        <View style={{flexDirection:'row',marginTop:10}}>
                            <Icon size={14} name={'thumbs-up'}/>
                            <Text style={{marginRight:50}}>{item.entities.topic.ups}</Text>
                            <Icon size={14} name={'comment'}/>
                            <Text>{item.entities.topic.comments}</Text>
                        </View>
                    </View>
                </View>
            );


    }
    _extraUniqueKey(item, index) {
        return "index" + index + item;
    }
    _extraUniqueChildKey(item, index) {
        return "child" + index + item;
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },

    text_item:{
        width:100,
        backgroundColor: "#13B9C7",
        borderRadius: 20,
        color:'white',
        lineHeight:36,
        fontSize:14,
        marginLeft:10,
        marginRight:10,
        textAlign: 'center',
    },
    user_item:{
        borderRadius:6,
        borderColor:"#13B9C7",
        borderWidth:1,
        marginTop:10,
        paddingLeft:20,
        paddingRight:20,
        paddingStart: 10,
        paddingEnd:10,
        color:"#13B9C7",
        fontSize:14
    }
});
export default BBSAttentionView;
