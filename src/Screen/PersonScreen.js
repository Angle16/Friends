import React,{ component } from 'react'

import {
    Button,
    Toast,
    NavBar,
    WingBlank,
    WhiteSpace,
    InputItem,
    Flex
} from 'antd-mobile';

import {
    imageBaseURL
} from '../DataServe/URLConfig';

import accountManager from '../DataServer/AccountManager';
import userManager from '../DataServer/UserManager';
///个人信息页面
export default class PersonScreen extends component {
    async componentDidMount(){
        if (accountManager.isLogin()===false) {
            return;
        }
        const result=await userManager.getUserInfo();
        if (result.success===false) {
            Toast.fail(result.errorMessage,1);
            return;
        }

        this.setState({user:result.data});
    }


    constructor(props) {
      super(props)
    
      this.state = {
         user:{
             nickname:'',
             sign:'',
             image:'',
         },
      }
    }


    render() {
        return (
            <div>
                <NavBar
                mode="dark"
                >个人信息</NavBar>
                <Flex
                justify={'center'}
                style={{backgroundColor:'#ffffff'}}
                >
                <img
                alt={''}
                src={imageBaseURL+this.state.user.image}
                style={{width:'100px',height:'100px',margin:'5px'}}
                />
                </Flex>
                <List>
                    <InputItem
                        type={'text'}
                        editable={false}
                        value={this.state.user.nickname}
                        onChange={(nickname)=>{this.setState({user:{nickname}})}}
                        placeholder={'请输入昵称'}
                        >
                        昵称
                    </InputItem>
                    <InputItem
                    type={'text'}
                    editable={false}
                    value={this.setState.user.sign}
                    onChange={(sign)=>{this.setState({user:{sign}})}}
                    >
                    签名
                    </InputItem>
                </List>
                <WhiteSpace/>
                <WingBlank>
                    <Button
                        onClick={async()=>{
                            this.props.history.push('/ChangePersonInfoScreen',this.state.user);
                        }}
                        >
                            修改个人资料
                    </Button>
                    <WhiteSpace/>
                    <Button
                        onClick={async()=>{
                            this.props.history.push('/ChangePasswordScreen');
                        }}
                    >
                        修改密码
                    </Button>
                    <WhiteSpace/>
                    <WhiteSpace/>
                    <Button
                        type={'warning'}
                        onClick={async()=>{
                            accountManager.logout();
                            this.props.history.replace('/');
                        }}
                    >
                        退出登录
                    </Button>
                </WingBlank>
            </div>
        )
    }
    
}