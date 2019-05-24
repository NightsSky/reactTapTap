import React, { Component } from 'react';
import Carousel from "react-native-banner-carousel";
import {Dimensions, FlatList, Image, StyleSheet, Text, View,TextInput} from "react-native";


//板块
const url = "https://api.taptapdada.com/forum-friendship/v1/recommend?X-UA=V%3D1%26PN%3DTapTap%26VN_CODE%3D551%26LOC%3DCN%26LANG%3Dzh_CN%26CH%3Dsmsem%26UID%3D5a0b83f8-c1d2-4811-b112-41800bc98c49";
const BannerWidth = Dimensions.get('window').width;
const BannerHeight = BannerWidth*7/16;

class SectionView extends Component {

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
        fetch(url)
            .then(response => response.json())
            .then(responseData =>{
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
                    style={styles.container}
                    data={this.state.data}
                    // ListHeaderComponent={this._createHeaderItem()}
                    ItemSeparatorComponent={this._separator}
                    renderItem={({item})=> this._createItem(item)}
                    keyExtractor={this._extraUniqueKey}
                />
            </View>
        );
    }
    /**
     * 创建布局
     */
    _createItem(item){
        if (item.style === 4) {
            return (
                <View>
                    <View style={styles.item_top}>
                      <TextInput
                        style={{flex:1,height: 36,paddingLeft: 5,margin: 5,backgroundColor:"#EEEEEE",borderRadius:16,fontSize:12}}
                        placeholder={"搜索论坛 帖子"}
                      />
                    </View>
                    <View style={styles.bannerStyle}>
                        <Carousel
                            autoplay
                            autoplayTimeout={5000}
                            loop
                            index={0}
                            pageSize={BannerWidth}
                        >
                            {item.data.map((image, index) => this.renderPage(image.banner.original_url, index))}
                        </Carousel>
                    </View>
                </View>
            );
        }else if (item.style === 2) {
            if (item.type === "default") {
                return (
                    <View>
                        <View style={styles.item_top}>
                            <Text style={{flex: 1,fontWeight: 'bold',color: 'black',fontSize: 16 }}>{item.label}</Text>
                            <Text style={{fontSize:12,color:'#13B9C7' }}>查看更多</Text>
                        </View>
                        <FlatList
                            data={item.data}
                            horizontal={false}
                            numColumns ={4}
                            showsHorizontalScrollIndicator={false}
                            renderItem={({item})=> this._createAppItem(item)}
                            keyExtractor={this._extraUniqueChildKey}
                        />
                    </View>
                );
            }
        }else if (item.style === 1) {
            return (
                <View>
                    <View style={styles.item_top}>
                        <Text style={{flex: 1,fontWeight: 'bold',color: 'black',fontSize: 16 }}>{item.label}</Text>
                        <Text style={{fontSize:12,color:'#13B9C7' }}>查看更多</Text>
                    </View>
                    <FlatList
                        data={item.data}
                        horizontal={false}
                        numColumns ={2}
                        showsHorizontalScrollIndicator={false}
                        renderItem={({item})=> this._createBBSItem(item)}
                        keyExtractor={this._extraUniqueChildKey}
                    />
                </View>
            );
        }
    }
    /**
     * banner布局
     */
    renderPage(image, index) {
        return (
            <View key={index}>
                <Image style={{ width: BannerWidth-20, height: BannerHeight }} source={{ uri: image }} />
            </View>
        );
    }
    _createAppItem(item) {

        return(
            <View styles={styles.item_child}>
                <Image style={{width:(BannerWidth/4)-20,height:80,marginLeft:10,marginRight:10}} source={{ uri:item.icon.medium_url}}/>
                <Text style={{fontSize:12,width:(BannerWidth/4)-20,marginLeft:10,marginRight:10}}>{item.title}</Text>
            </View>
        );

    }
    _createBBSItem(item) {

        return(
            <View style={{flex: 1, flexDirection: 'row',marginBottom:10}}>
                <Image style={{width:40,height:40,marginLeft:10,marginRight:10}} source={{ uri:item.icon.medium_url}}/>
                <View>
                    <Text style={{fontSize:12,flex:1,marginRight:10}}>{item.title}</Text>
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
    bannerStyle:{
        flex:1,
        marginLeft:10,
        marginRight:10
    },
    item_container: {

    },
    item_top:{
        flexDirection :"row",
        margin:10,
    },
    item_child:{
        width:BannerWidth/4,
        marginLeft:10,
        marginRight:10,
        alignItems:'center'
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
export default SectionView;
