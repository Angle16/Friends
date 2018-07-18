import React,{component}from'react'
import{
      Button,
      Toast,
      NavBar,
      WingBlank, 
      WhiteSpase,
      List,
      Icon,
      TextareaItem,
      Model,
      ImanagePicker
} from 'antd-mobile';
import messageManager from '../DataServer/MessageManager';
import accountManager from '../DataServer/AccountManager';

export default class CreateMessageScreen extends Comment{
    constructor(props){
       super(props)

       this.state ={
           content:'',
           files:[]
       }
     }
     componentWilMount(){
         if(!accountManager.isLogin()){
           this.props.history.replase('/');
        
         }

     }
     render(){
        return (
            <div>
                <NavBar
                    mode="dark"
                    icon={<Icon type="left" />}
                    onLeftClick={() => {this.props.history.goBack()}}
                >发消息</NavBar>
                <WhiteSpace/>
                <List>
                    <TextareaItem
                    type={'text'}
                    value={this.state.content}
                    onChange={(content)=>{this.setState({content})}}
                    placeholder={'请输入内容'}
                    rows={5}
                    />
                </List>
                <WhiteSpace/>
                <WingBlank>
                    <ImagePicker
                       files={this.state.files}
                       onChange={(files)=>{this.setState({files})}}
                       selectable={this.state.files.lengh <=9}
                    
                    />
                    <WhiteSpace/>
                    <Button
                         type={'primary'}
                         onClick={async()=>{
                             Toast.loading('内容上传中...',0);
                             const result=await messageManager.postMessage(this.state)
                             Toast.hide();
                             console.log(result)
                             if(result.success===false){
                                 Toast.fail(result.errorMessage);
                                 return;
                             }
                             Modal.alert('提交成功','点击确认键返回',[{
                                 text:'确认',
                                onPress:()=>{this.props.history.goBack()}
                             }])
                         }}
                    >
                    提交
                    </Button>
            </WingBlank>

           </div>
        )
     }
}