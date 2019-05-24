import React, { Component } from 'react';
import { Text, View } from 'react-native';

const URL = "https://api.taptapdada.com/landing/v3/refresh-with-device?X-UA=V%3D1%26PN%3DTapTap%26VN_CODE%3D551%26LOC%3DCN%26LANG%3Dzh_CN%26CH%3Dsmsem%26UID%3D5a0b83f8-c1d2-4811-b112-41800bc98c49"
const FOUND_URL = "https://api.taptapdada.com/gate/v2/rec1?X-UA=V%3D1%26PN%3DTapTap%26VN_CODE%3D551%26LOC%3DCN%26LANG%3Dzh_CN%26CH%3Dsmsem%26UID%3D5a0b83f8-c1d2-4811-b112-41800bc98c49";

class HomeGameView extends Component {
    constructor(props){
        super(props);
        this.state = {
            data: [],
            banners:[],
            loaded: false
        };
        this._fetchData = this._fetchData.bind(this);
    }
    // 组件渲染后调用
    componentDidMount() {
        // this._fetchData();
    }
    getNowTime(){
       return (new Date()).getTime()
    }
    _fetchData() {
        fetch(URL,{
            method:"get",
            headers:{
               "Authorization":"MAC id=7a56412efe4ec646823f727b66d64441fe449708,ts="+this.getNowTime()+",nonce=g53tj,mac=Kr9D2v8l0xhftgM2CJdzdsPWkAI=",
                "If-Modified-Since":"Thu, 23 May 2019 09:30:10 GMT",
            },
        })
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
            <View style={{alignItems: 'center', marginTop: 50}}>
                <Text>Hello {this.props.name}!</Text>
            </View>
        )
    }

}
export default HomeGameView;
