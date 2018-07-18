import React, { Component } from 'react'

import { 
    Button,
    Toast,
    NavBar,
    WingBlank, 
    WhiteSpace ,
    List,
    InputItem,
    Icon,
    Modal
} from 'antd-mobile';

import accountManager from '../DataServer/AccountManager';



export default class ChangePassWordScreen extends Component {


    constructor(props) {
      super(props)
    
      this.state = {
        old_password:'',
        new_password:''
      }
    }
    

  render() {
    return (
      <div>
        <NavBar
            mode="dark"
            icon={<Icon type="left" />}
            onLeftClick={() => {this.props.history.goBack()}}
        >修改密码</NavBar>
        <WhiteSpace/>
        <List>
            <InputItem
                type={'text'}
                value={this.state.old_password}
                onChange={(old_password)=>{this.setState({old_password})}}
                placeholder={'请输入旧密码'}
            >
                旧密码
            </InputItem>
            <InputItem
                type={'text'}
                value={this.state.new_password}
                onChange={(new_password)=>{this.setState({new_password})}}
                placeholder={'请输入新密码'}
            >
                新密码
            </InputItem>
        </List>
        <WhiteSpace/>
        <WingBlank>
            <Button
                type={'primary'}
                onClick={async()=>{
                    const result = await accountManager.changePassword(this.state.old_password,this.state.new_password);
                    console.log(result);
                    if(result.success === false){
                        Toast.fail(result.errorMessage);
                        return;
                    }
                    Modal.alert('修改成功','点击确认键返回',[{
                        text:'确认',
                        onPress:()=>{this.props.history.goBack()}
                    }])
                    
                }}
            >
                提交修改
            </Button>
        </WingBlank>
      </div>
    )
  }
}
