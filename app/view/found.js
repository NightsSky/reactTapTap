import React, { Component } from 'react';
import Carousel from 'react-native-banner-carousel';
import { StyleSheet,Text,FlatList, View,Image,Dimensions,TouchableOpacity ,RefreshControl} from 'react-native';



const BannerWidth = Dimensions.get('window').width;
const BannerHeight = BannerWidth*3/8;


const FOUND_URL = "https://api.taptapdada.com/gate/v2/rec1?X-UA=V%3D1%26PN%3DTapTap%26VN_CODE%3D551%26LOC%3DCN%26LANG%3Dzh_CN%26CH%3Dsmsem%26UID%3D5a0b83f8-c1d2-4811-b112-41800bc98c49";

class FoundView extends Component {
    constructor(props){
        super(props);
        this.page = 1;
        this.state = {
            data: [],
            loaded: false,
            isRefresh:false
        };
        // this._fetchData = this._fetchData.bind(this);
    }
    // 组件渲染后调用
    componentDidMount() {
        this._fetchData();
    }
    _fetchData() {
        fetch(FOUND_URL)
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
                    //下拉刷新相关
                    //onRefresh={() => this._onRefresh()}
                    refreshControl={
                        <RefreshControl
                            title={'Loading'}
                            colors={['red']}
                            refreshing={this.state.isRefresh}
                            onRefresh={() => {
                                this._onRefresh();
                            }}
                        />
                    }
                    refreshing={this.state.isRefresh}
                    // //加载更多
                    // onEndReached={() => this._onLoadMore()}
                    // onEndReachedThreshold={0.1}
                    keyExtractor={this._extraUniqueKey}
                />
            </View>
        )
    }
    /**
     * 下啦刷新
     * @private
     */
    _onRefresh = () => {
        // 不处于 下拉刷新
        if (!this.state.isRefresh) {
            this.page = 1;
            this._fetchData()
        }
    };
    /**
     * banner布局
     */
    renderPage(image, index) {
        return (
            <View key={index}>
                <Image style={{ width: BannerWidth, height: BannerHeight }} source={{ uri: image }} />
            </View>
        );
    }
    _extraUniqueKey(item, index) {
        return "index" + index + item;
    }
    _extraUniqueChildKey(item, index) {
        return "child" + index + item;
    }
    /**
     * 创建布局
     */
    _createItem(item){
        if (item.type === "app_list") {
            return (
                <View>
                    <View style={styles.item_top}>
                        <Text style={{flex: 1,fontWeight: 'bold',color: 'black',fontSize: 16 }}>{item.label}</Text>
                        <Text style={{fontSize:12,color:'#13B9C7' }}>查看更多</Text>
                    </View>
                    <FlatList
                        style={{height:120}}
                        data={item.data}
                        horizontal={true}
                        showsHorizontalScrollIndicator={false}
                        renderItem={({item})=> this._createAppItem(item)}
                        keyExtractor={this._extraUniqueChildKey}
                    />
                </View>
            );
        }else if (item.type === "rec_list") {
            if (item.style === 0) {
                return (
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
                );
            } else {
                return (
                    <View>
                        <View style={styles.item_top}>
                            <Text style={{flex: 1,fontWeight: 'bold',color: 'black',fontSize: 16 }}>{item.label}</Text>
                            <Text style={{fontSize:12,color:'#13B9C7' }}>查看更多</Text>
                        </View>
                        <FlatList
                            style={{height:120}}
                            data={item.data}
                            horizontal={true}
                            showsHorizontalScrollIndicator={false}
                            renderItem={({item})=> this._createRec2Item(item)}
                            keyExtractor={this._extraUniqueChildKey}
                        />
                    </View>
                );
            }

        }else if (item.type === "text_list") {
            return (
                <View>
                    <FlatList
                        style={{height:36,backgroundColor:"#EEEEEE"}}
                        data={item.data}
                        horizontal={true}
                        showsHorizontalScrollIndicator={false}
                        renderItem={({item})=> this._createTextListItem(item)}
                        keyExtractor={this._extraUniqueChildKey}
                    />
                </View>
            );
        }else if (item.type === "user_list"){
            return (
                <View>
                    <View style={{flexDirection :"row", padding:10,backgroundColor:"#EEEEEE"}}>
                        <Text style={{flex: 1,fontWeight: 'bold',color: 'black',fontSize: 16 }}>{item.label}</Text>
                        <Text style={{fontSize:12,color:'#13B9C7' }}>查看更多</Text>
                    </View>
                    <FlatList
                        style={{height:130,backgroundColor:"#EEEEEE"}}
                        data={item.data}
                        horizontal={true}
                        showsHorizontalScrollIndicator={false}
                        renderItem={({item})=> this._createUserItem(item)}
                        keyExtractor={this._extraUniqueChildKey}
                    />
                </View>
            );
        }

    }

    _createAppItem(item) {
            return(
                <View styles={styles.item_child}>
                    <Image style={{width:80,height:80,marginLeft:5,marginRight:5}} source={{ uri:item.icon.medium_url}}/>
                    <Text style={{fontSize:12,width:80,marginLeft:5,marginRight:5}}>{item.title}</Text>
                </View>
            );

    }
    _createRec2Item(item) {
        return(
            <View >
                <Image style={{width:230,height:100,marginLeft:5,marginRight:5}} source={{ uri:item.banner.medium_url}}/>
            </View>
        );

    }
    _createUserItem(item) {
        return(
            <View style={{marginLeft:5,marginRight:5,paddingTop:10,backgroundColor:'white',alignItems: 'center',width:100}} >
                <Image style={{width:45,height:45,borderRadius: 36,borderWidth: 0.5,borderColor: "black",}} source={{ uri:item.avatar}}/>
                <Text style={{fontSize:8,marginTop:5}}>{item.name}</Text>
                <View style={{flexDirection:'row',marginTop:5}}>
                    <Image style={{width:10,height:10}} source={{ uri:item.verified.url}}/>
                    <Text style={{fontSize:8}}>{item.verified.reason}</Text>
                 </View>

                <Text style={styles.user_item}>+ 关注</Text>
            </View>
        );
    }
    /**
     * 分割线
     */
    _separator() {
        return <View style={{height: 10, backgroundColor: '#EEEEEE'}}/>;
    }

    /**
     * text_list
     * @param item
     * @returns {null|*}
     * @private
     */
    _createTextListItem(item) {
        return(
            <Text style={styles.text_item}>{item.label}</Text>
        );

    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    bannerStyle:{
        flex:1,
    },
    item_container: {

    },
    item_top:{
        flexDirection :"row",
        margin:10,
    },
    item_child:{
        width:80,
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
export default FoundView;
