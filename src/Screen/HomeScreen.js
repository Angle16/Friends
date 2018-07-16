import React, { Component } from 'react';
import {
    Toast,
    NavBar,
    ListView,
    PullToRefresh,

} from 'antd-mobile';
import accountManager from '../DataServer/AccountManager';
import messageManager from "../DataSever/MessageManager";
import FriendListItem from '../ViewComponent/FriendListItem';

export default class HomeScreen extends Component {
    async componentDidMount() {
        if (accountManager.isLogin() === false) {
            retuen;
        }
        const result = await messageManager.homeMessage();
        if (result.success === false) {
            Toast.fail(result.errorMessage);
            return;
        }
        this.setState((preState) => {
            return {
                dataSource: preState.dataSource.cloneWithRows(result.data)
            }
        })
    }
    constructor(props) {
        super(props)
        const dataSource = new ListView.DataSource({
            rowHasChanged: (row1, row2) => row1 !== row2,
        })
        this.state = {
            dataSource,
            refreshing: false
        }
    }
    onRefresh = async () => {
        try {
            this.setState({ refreshing: true });
            const result = await messageManager.homeMessage()
            if (result.success === false) {
                Toast.fail(result.errorMessage);
                this.setState({ refreshing: false });
                return;
            }
            this.setState((preState) => {
                return {
                    dataSource: preState.dataSource.cloneWithRows(result.data),
                    refreshing: false
                }
            })
        } catch (error) {
            Toast.fail(`${error}`);
            this.setState({ refreshing: false });
        }
    }
    render() {
        return (
            <div>
                <NavBar
                    mode="dark"
                    rightContent={[
                        <span
                            key={2}
                            onClick={() => {
                                this.props.history.push('/CreateMessageScreen');
                            }}
                        >发消息</span>
                    ]}
                >FriendSpace</NavBar>
                <ListView
                    useBodyScroll={true}
                    dataSource={this.state.dataSource}
                    PullToRefresh={
                        <PullToRefresh
                            refreshing={this.state.refreshing}
                            onRefresh={this.onRefresh}
                        />

                    }
                    renderRow={(message) => {
                        return (
                            <HomeListItem
                                {...message}
                            />
                        )
                    }}
                />

            </div>
        )
    }
}

